import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})


const todoModel = mongoose.model("todo" ,todoSchema)

export default todoModel