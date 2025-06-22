import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

let cachedMongoose = global.mongoose;

if (!cachedMongoose) {
  cachedMongoose = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cachedMongoose.conn) {
    return cachedMongoose.conn;
  }

  if (!cachedMongoose.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection);
  }

  try {
    cachedMongoose.conn = await cachedMongoose.promise;
  } catch (error) {
    cachedMongoose.promise = null;
    throw error;
  }

  return cachedMongoose.conn;
}
