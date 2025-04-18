import { Router } from "express";
import { addMemberToProject, createProject, deleteProject, getProject, getProjectMembers, getProjects, updateProject } from "../controllers/project.controllers";

const router = Router();

// for project
router
  .route('/')
  .get(getProjects)
  .post(createProject);

router
  .route('/:id')
  .get(getProject)
  .patch(updateProject)
  .delete(deleteProject);

// for project members
router
  .route('/:projectid/members/:memberid')
  .post(addMemberToProject)
  .get(getProjectMembers);


export default router