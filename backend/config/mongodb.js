import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log(`MongoDB connected at ${process.env.MONGODB_URI}`);
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}
export default connectDB;



