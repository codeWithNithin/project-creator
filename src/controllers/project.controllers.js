import asyncHandler from "../utils/async-handler";

const getProjects = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const getProject = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const createProject = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const updateProject = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const deleteProject = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const addMemberToProject = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const removeMemberFromProject = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const getProjectMembers = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
});

const updateProjectMembers = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
})

const updateMemberRole = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
})

const deleteMember = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body
})


export { getProjects, getProject, createProject, updateProject, deleteProject };