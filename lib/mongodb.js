import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("Connected to mmongoDB successfully")
    } catch (error) {
        console.log("Some error occured while connecting MONGODB database", error)
    }
}

export default connectToMongoDB