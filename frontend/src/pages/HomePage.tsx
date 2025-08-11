import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: 'pending' | 'completed';
}

const HomePage: React.FC = () => {
  const [taskStats, setTaskStats] = useState<TaskStats>({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [statsResponse, tasksResponse] = await Promise.all([
          axios.get('/api/tasks/stats', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/tasks?limit=5&sort=dueDate', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setTaskStats(statsResponse.data);
        setRecentTasks(tasksResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your task management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Tasks</h3>
          <p className="text-3xl font-bold text-gray-800">{taskStats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{taskStats.completed}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{taskStats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Overdue</h3>
          <p className="text-3xl font-bold text-red-600">{taskStats.overdue}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Recent Tasks</h2>
            <button 
              onClick={() => navigate('/tasks')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              View All
            </button>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentTasks.map((task) => (
              <div key={task.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="ml-4 text-sm text-gray-500">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;