import mongoose from 'mongoose';

export async function connectDatabase(): Promise<void> {
  try {
    const connectionString = process.env.DATABASE_URL || 'mongodb://localhost:27017/app';
    
    await mongoose.connect(connectionString, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Connected to MongoDB');
    
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('🔌 MongoDB disconnected');
    });
    
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
}

export function closeDatabaseConnection(): Promise<void> {
  return mongoose.connection.close();
}
