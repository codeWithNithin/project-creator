import asyncHandler from "../utils/async-handler";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body

  // validation
  if (!email || !password) {

  }

  if (password < 8) {

  }
});

export { registerUser }
