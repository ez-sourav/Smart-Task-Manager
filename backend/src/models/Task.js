import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Task title is required"],
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",   
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

taskSchema.index({ user: 1 });

const Task = mongoose.model("Task", taskSchema);

export default Task;