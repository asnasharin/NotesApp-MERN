import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://asnasherin1233:asna2926@cluster0.wdyqeu9.mongodb.net/notesappp?retryWrites=true&w=majority&appName=Cluster0")
        console.log("connected to db")
    } catch (error) {
        console.log("error in connecting", error.message)
    }
}

export default connectToMongoDB