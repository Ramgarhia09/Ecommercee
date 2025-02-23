import mongoose from "mongoose";

const connectDB = async ()=>{
   
    mongoose.connection.on('connected',()=>{

   console.log("DB Connectd")

    })
    await mongoose.connect(`${process.env.MONGODB_URI}/ECOMMM`)





}

export default connectDB