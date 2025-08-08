import React, { useEffect, useState } from 'react';
import { userApi } from '../services/api';

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userApi.getProfile();
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}>
          Logout
        </button>
      </header>
      
      <main className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome back, {user?.name || 'User'}!</h2>
          <p>Here's your personalized dashboard</p>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>Manage your account settings</p>
          </div>
          <div className="dashboard-card">
            <h3>Analytics</h3>
            <p>View your usage statistics</p>
          </div>
          <div className="dashboard-card">
            <h3>Settings</h3>
            <p>Configure your preferences</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
