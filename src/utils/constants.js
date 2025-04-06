export const UserRolesEnum = {
  ADMIN: "admin",
  MEMBER: "member",
  PROJECT_ADMIN: "project_admin"
}

export const AvailableUserRoles = Object.values(UserRolesEnum);

export const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done"
}

export const AvailableTodoStatus = Object.values(TaskStatusEnum);