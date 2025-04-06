import mongoose from "mongoose";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants";

const projectMemberSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role: {
    type: String,
    enum: AvailableUserRoles,
    default: UserRolesEnum.MEMBER
  }
}, { timestamps: true })

export default mongoose.model("ProjectMember", projectMemberSchema)