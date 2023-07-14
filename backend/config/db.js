import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect
      (
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongotesting.1lqon.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
        // process.env.MONGO_URI
      );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
