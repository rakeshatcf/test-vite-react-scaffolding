import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import DashboardPage from './DashboardPage';
import API_BASE_URL from './api';
import PORT from './index';
import Navbar from './Navbar';
import DataGrid from './DataGrid';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="App-nav">
          <Link to="/">Login</Link>
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <main className="App-main">
          <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
