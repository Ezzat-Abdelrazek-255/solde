// import {connect}
import mongoose from "mongoose";

let isConnected = false;
const connectionString = process.env.MONGODB_URL as string;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) return console.log("Already is connected");
  if (!connectionString) throw new Error("No connection string");

  try {
    await mongoose.connect(connectionString);
    console.log("Connection was established");
  } catch (error) {
    console.log("There was an error connecting to the database");
    console.log(error);
  }
};
