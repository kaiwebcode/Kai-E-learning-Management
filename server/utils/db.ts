import mongoose from "mongoose";
require("dotenv").config();

// const dbUrl:string = process.env.DATABASE_URL || '';
const mongoURL =
  "mongodb+srv://kaifqureshipr:YlFidRc9J05ci7ry@lms.ngkbm.mongodb.net/Lms";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL).then((data: any) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
