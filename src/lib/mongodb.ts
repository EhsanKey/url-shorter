import mongoose from "mongoose";

declare const process: {
  env: {
    MONGODB_URL: string;
  };
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
