import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const url = process.env.DB_URL

export const connection = async ()=>{
    await mongoose.connect(url);
    console.log("Mongodb DB is connected")
}
