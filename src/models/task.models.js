import mongoose, { Schema } from "mongoose";
import { TaskStatusEnum } from "../utils/constants";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  assignedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: AvailableTodoStatus,
    default: TaskStatusEnum.TODO
  },
  attachments: {
    type: [
      {
        type: String,
        mime: String,
        size: Number
      }
    ],
    default: []
  }
}, { timestamps: true })

export default mongoose.model("Task", taskSchema)