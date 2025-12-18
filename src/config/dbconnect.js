import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const dbConnect = async () => {

    const uri = process.env.MONGO_URL;
    // console.log(uri);
    
    if (!uri) {
        console.log("URI String not found");
        process.exit(1)
    }

    try {

        const connection = await mongoose.connect(uri)
        if (connection) {
            console.log("Database Connected Successfully");
        }
    } catch (error) {
        console.error('DB Error:' + error);
        process.exit(1)
    }
}



export default dbConnect