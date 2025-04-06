import { Router } from "express";
import { loginUser, registerUser, verifyEmail } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validators.middleware.js";
import { userRegisterValidator } from "../validators/index.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/register', upload.single('avatar'), userRegisterValidator(), validate, registerUser);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', loginUser);

export default router