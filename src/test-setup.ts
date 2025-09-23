import mongoose from 'mongoose';
import { config } from './config';

// Test database connection
async function testConnection() {
  try {
    await mongoose.connect(config.database.uri);
    console.log('✅ Database connection successful');
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

testConnection();