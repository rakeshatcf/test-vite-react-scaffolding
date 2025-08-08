import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { connectDatabase } from './services/database';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({{
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}}));

// Rate limiting
const limiter = rateLimit({{
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}});
app.use(limiter);

// Body parsing middleware
app.use(express.json({{ limit: '10mb' }}));
app.use(express.urlencoded({{ extended: true }}));

// Request logging
app.use(requestLogger);

// Health check
app.get('/health', (req, res) => {{
  res.json({{ status: 'OK', timestamp: new Date().toISOString() }});
}});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// API documentation
app.get('/api/docs', (req, res) => {{
  res.json({{
    name: 'test-vite-react-scaffolding API',
    version: '1.0.0',
    endpoints: {{
      'POST /api/auth/login': 'User login',
      'POST /api/auth/register': 'User registration',
      'POST /api/auth/logout': 'User logout',
      'GET /api/user/profile': 'Get user profile',
      'PUT /api/user/profile': 'Update user profile'
    }}
  }});
}});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {{
  res.status(404).json({{ message: 'Route not found' }});
}});

async function startServer() {{
  try {{
    await connectDatabase();
    app.listen(PORT, () => {{
      console.log(`🚀 Server running on port ${{PORT}}`);
      console.log(`📖 API docs available at http://localhost:${{PORT}}/api/docs`);
    }});
  }} catch (error) {{
    console.error('Failed to start server:', error);
    process.exit(1);
  }}
}}

startServer();
