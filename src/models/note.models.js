import mongoose, { Schema } from "mongoose";

const projectNoteSchema = new mongoose.Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  }
},
  {
    timestamps: true
  })

export default mongoose.model("ProjectNote", projectNoteSchema)