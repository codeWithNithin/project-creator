import asyncHandler from "../utils/async-handler";
import Project from "../models/project.models.js";
import projectmemberModels from "../models/projectmember.models.js";
import ApiResponse from "../utils/api-response.js";

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate("createdBy");
  res.status(200).json(new ApiResponse(200, { message: "Projects found successfully" }, { projects: projects }));
});

const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate("createdBy");

  if (!project) {
    throw new ApiError(400, "Project not found");
  }

  res.status(200).json(new ApiResponse(200, { message: "Project found successfully" }, { project: project }));
});

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({ name, description, createdBy: req.user.id });

  res.status(200).json(new ApiResponse(200, { message: "Project created successfully" }, { project: project }));
});

const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!project) {
    throw new ApiError(400, "Project not found");
  }

  res.status(200).json(new ApiResponse(200, { message: "Project updated successfully" }, { project: project }));
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    throw new ApiError(400, "Project not found");
  }

  res.status(200).json(new ApiResponse(200, { message: "Project deleted successfully" }, { project: null }));
});

const addMemberToProject = asyncHandler(async (req, res) => {
  const memberCreated = await projectmemberModels.create({
    project: req.params.id,
    member: req.user.id,
    role: req.body.role
  });

  res.status(200).json(new ApiResponse(200, { message: "Member added to project successfully" }, { member: memberCreated }));

});

const removeMemberFromProject = asyncHandler(async (req, res) => {

});

const getProjectMembers = asyncHandler(async (req, res) => {
  const members = await projectmemberModels.find().populate("project").populate("user");

  res.status(200).json(new ApiResponse(200, { message: "Members found successfully" }, { members: members }));

});

const updateProjectMembers = asyncHandler(async (req, res) => {
  const members = await projectmemberModels.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!members) {
    throw new ApiError(400, "Members not found");
  }

  res.status(200).json(new ApiResponse(200, { message: "Members updated successfully" }, { members: members }));
})

const updateMemberRole = asyncHandler(async (req, res) => {
  const member = await projectmemberModels.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!member) {
    throw new ApiError(400, "Member not found");
  }

  res.status(200).json(new ApiResponse(200, { message: "Member updated successfully" }, { member: member }));

})

const deleteMember = asyncHandler(async (req, res) => {
  const member = await projectmemberModels.findByIdAndDelete(req.params.id);

  if (!member) {
    throw new ApiError(400, "Member not found");
  }

  res.status(200).json(new ApiResponse(200, { message: "Member deleted successfully" }, { member: null }));

})


export { getProjects, getProject, createProject, updateProject, deleteProject, addMemberToProject, removeMemberFromProject, getProjectMembers, updateProjectMembers, updateMemberRole, deleteMember };