import Hotel from '../models/Hotel.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
export const getHotels = asyncHandler(async (req, res) => {
  const { search, city, minPrice, maxPrice, category, sort, page = 1, limit = 10 } = req.query;

  // Build query
  const query = { isActive: true };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { 'location.city': { $regex: search, $options: 'i' } }
    ];
  }

  if (city) {
    query['location.city'] = { $regex: city, $options: 'i' };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (category) {
    query.category = category;
  }

  // Sorting
  let sortOption = {};
  if (sort === 'price-asc') sortOption.price = 1;
  else if (sort === 'price-desc') sortOption.price = -1;
  else if (sort === 'rating') sortOption.rating = -1;
  else sortOption.createdAt = -1;

  // Pagination
  const skip = (page - 1) * limit;

  const hotels = await Hotel.find(query)
    .sort(sortOption)
    .limit(Number(limit))
    .skip(skip)
    .select('-__v');

  const total = await Hotel.countDocuments(query);

  res.json({
    success: true,
    count: hotels.length,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
    data: hotels
  });
});

// @desc    Get single hotel
// @route   GET /api/hotels/:id
// @access  Public
export const getHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  res.json({
    success: true,
    data: hotel
  });
});

// @desc    Create hotel
// @route   POST /api/hotels
// @access  Private/Admin
export const createHotel = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user.id;
  
  // Set available rooms equal to total initially
  if (req.body.rooms && req.body.rooms.total) {
    req.body.rooms.available = req.body.rooms.total;
  }

  const hotel = await Hotel.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Hotel created successfully',
    data: hotel
  });
});

// @desc    Update hotel
// @route   PUT /api/hotels/:id
// @access  Private/Admin
export const updateHotel = asyncHandler(async (req, res) => {
  let hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json({
    success: true,
    message: 'Hotel updated successfully',
    data: hotel
  });
});

// @desc    Delete hotel
// @route   DELETE /api/hotels/:id
// @access  Private/Admin
export const deleteHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    res.status(404);
    throw new Error('Hotel not found');
  }

  // Soft delete - just deactivate
  hotel.isActive = false;
  await hotel.save();

  res.json({
    success: true,
    message: 'Hotel deleted successfully'
  });
});

// @desc    Get featured hotels
// @route   GET /api/hotels/featured
// @access  Public
export const getFeaturedHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({ isActive: true })
    .sort({ rating: -1 })
    .limit(6)
    .select('-__v');

  res.json({
    success: true,
    count: hotels.length,
    data: hotels
  });
});

// @desc    Get hotel statistics
// @route   GET /api/hotels/stats
// @access  Private/Admin
export const getHotelStats = asyncHandler(async (req, res) => {
  const totalHotels = await Hotel.countDocuments({ isActive: true });
  const totalRooms = await Hotel.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: null, total: { $sum: '$rooms.total' } } }
  ]);

  const hotelsByCategory = await Hotel.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);

  const averagePrice = await Hotel.aggregate([
    { $match: { isActive: true } },
    { $group: { _id: null, avgPrice: { $avg: '$price' } } }
  ]);

  res.json({
    success: true,
    data: {
      totalHotels,
      totalRooms: totalRooms[0]?.total || 0,
      averagePrice: Math.round(averagePrice[0]?.avgPrice || 0),
      hotelsByCategory
    }
  });
});
