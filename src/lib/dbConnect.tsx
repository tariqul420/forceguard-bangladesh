import mongoose from "mongoose";


const dbConnect = async () => {
    if(mongoose.connection.readyState >= 1) return;

    try{
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri as string);
        console.log("Successfully connected to MongoDB.");
    }catch(err){
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
};

export default dbConnect;