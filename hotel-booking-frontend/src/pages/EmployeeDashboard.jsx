import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 3 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 16) return 'Good Afternoon';
    if (hour >= 16 && hour < 19) return 'Good Evening';
    return 'Good Night';
  };

  const roleTitle = user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1);

  return (
    <div className="dashboard-page">
      <div className="employee-greeting-container">
        <div className="employee-greeting-card">
          <h1 className="greeting-text">{getGreeting()}, {user?.name}</h1>
          <p className="greeting-role">{roleTitle}</p>
          <div className="greeting-time">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
