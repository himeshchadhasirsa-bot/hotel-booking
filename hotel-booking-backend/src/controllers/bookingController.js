import Booking from '../models/Booking.js';
import Hotel from '../models/Hotel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = asyncHandler(async (req, res) => {
  const { hotel, checkInDate, checkOutDate, guests, rooms, specialRequests } = req.body;

  // Check if hotel exists
  const hotelData = await Hotel.findById(hotel);

  if (!hotelData) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  if (!hotelData.isActive) {
    res.status(400);
    throw new Error('Hotel is not currently available for booking');
  }

  // Check room availability
  if (hotelData.rooms.available < (rooms || 1)) {
    res.status(400);
    throw new Error('Not enough rooms available');
  }

  // Validate dates
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkIn < today) {
    res.status(400);
    throw new Error('Check-in date cannot be in the past');
  }

  if (checkOut <= checkIn) {
    res.status(400);
    throw new Error('Check-out date must be after check-in date');
  }

  // Calculate pricing
  const diffTime = Math.abs(checkOut - checkIn);
  const numberOfNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const roomCount = rooms || 1;
  const pricePerNight = hotelData.price;
  const totalPrice = numberOfNights * roomCount * pricePerNight;

  // Create booking
  const booking = await Booking.create({
    user: req.user.id,
    hotel,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    guests,
    rooms: roomCount,
    pricePerNight,
    numberOfNights,
    totalPrice,
    specialRequests
  });

  // Update hotel room availability
  hotelData.rooms.available -= roomCount;
  await hotelData.save();

  // Populate hotel and user data
  await booking.populate('hotel', 'name location images');
  await booking.populate('user', 'name email phone');

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: booking
  });
});

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const query = {};
  if (status) query.status = status;

  const skip = (page - 1) * limit;

  const bookings = await Booking.find(query)
    .populate('user', 'name email phone')
    .populate('hotel', 'name location')
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip(skip);

  const total = await Booking.countDocuments(query);

  res.json({
    success: true,
    count: bookings.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: bookings
  });
});

// @desc    Get user bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate('hotel', 'name location images price')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email phone')
    .populate('hotel', 'name location images amenities contactInfo');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check if user owns booking or is admin
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to access this booking');
  }

  res.json({
    success: true,
    data: booking
  });
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
export const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  booking.status = status;

  if (status === 'Confirmed') {
    booking.confirmedAt = Date.now();
  } else if (status === 'Completed') {
    booking.completedAt = Date.now();
  }

  await booking.save();

  res.json({
    success: true,
    message: `Booking ${status.toLowerCase()} successfully`,
    data: booking
  });
});

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
export const cancelBooking = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const booking = await Booking.findById(req.params.id).populate('hotel');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  // Check if user owns booking or is admin
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to cancel this booking');
  }

  if (booking.status === 'Cancelled') {
    res.status(400);
    throw new Error('Booking is already cancelled');
  }

  if (booking.status === 'Completed') {
    res.status(400);
    throw new Error('Cannot cancel completed booking');
  }

  // Update booking
  booking.status = 'Cancelled';
  booking.cancellationReason = reason;
  booking.cancelledAt = Date.now();
  booking.cancelledBy = req.user.id;
  await booking.save();

  // Restore hotel room availability
  const hotel = await Hotel.findById(booking.hotel._id);
  hotel.rooms.available += booking.rooms;
  await hotel.save();

  res.json({
    success: true,
    message: 'Booking cancelled successfully',
    data: booking
  });
});

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  await booking.deleteOne();

  res.json({
    success: true,
    message: 'Booking deleted successfully'
  });
});

// @desc    Get booking statistics
// @route   GET /api/bookings/stats
// @access  Private/Admin
export const getBookingStats = asyncHandler(async (req, res) => {
  const totalBookings = await Booking.countDocuments();
  
  const bookingsByStatus = await Booking.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalRevenue: { $sum: '$totalPrice' }
      }
    }
  ]);

  const revenueStats = await Booking.aggregate([
    {
      $match: { status: { $in: ['Booked', 'Confirmed', 'Completed'] } }
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
        averageBookingValue: { $avg: '$totalPrice' }
      }
    }
  ]);

  res.json({
    success: true,
    data: {
      totalBookings,
      bookingsByStatus,
      revenue: revenueStats[0] || { totalRevenue: 0, averageBookingValue: 0 }
    }
  });
});
