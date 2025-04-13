import express from "express";
import mongoose from "mongoose";
import todoModel from "./models/todoSchema.js";
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 2020
const URI = `mongodb+srv://admin:admin123@class08.7oayb.mongodb.net/?retryWrites=true&w=majority&appName=class08`

mongoose.connect(URI)
    .then(res => console.log("MongoDb Succesfully connected!"))
    .catch(error => console.log("MonogDb error", error))


app.post("/createTodo", async (req, res) => {
    try {
        const body = req.body
        const data = await todoModel.create(body)
        res.json({
            message: "Todo Created Successfully!",
            data: data,
            status: true
        })
    } catch (error) {
        res.json({
            message: error.message || "Something went Wrong!",
            status: false
        })
    }
})


app.get("/getTodo", async (req, res) => {
    try {
        const tododata = await todoModel.find().sort({ "createAt": -1 })
        res.json({
            message: "Todo get successfully!",
            data: tododata,
            status: true
        })
    } catch (error) {
        res.json({
            message: error.message || "Something went Wrong!",
            status: false
        })
    }
})

app.put("/editTodo/:id", async (req, res) => {
    try {
        const todId = req.params.id
        const body = req.body
        const editData =await todoModel.findByIdAndUpdate(todId , body, {new: true})
        res.json({
            message:"Todo Updated Sucessfully!",
            data: editData,
            status: true
        })
    } catch (error) {
        res.json({
            message: error.message || "Something went Wrong!",
            status: false
        })
    }
})





app.delete("/deleteTodo" ,async (req , res)=>{
    try {
        const todoId = req.query.id
        console.log(req.query , "query")
        await todoModel.findByIdAndDelete(todoId)
        res.json({
            message: "Todo Delete Successfully!",
            status :true,
            data: null
        })
    } catch (error) {
        res.json({
            message: error.message || "Something went wrong!",
            status :false,
            data: null
        })
    }
})


app.listen(PORT, () => console.log(`Server is running on ${PORT}`))