import { Router } from "express";
import { changeCurrentPassword, forgotPassword, getCurrentUser, loginUser, logOut, refreshAccessToken, registerUser, resetPassword, verifyEmail } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validators.middleware.js";
import { userRegisterValidator } from "../validators/index.js";
import { upload } from "../middlewares/multer.middleware.js";
import protect from "../middlewares/protect.middleware.js";

const router = Router();

router.post('/register', upload.single('avatar'), userRegisterValidator(), validate, registerUser);
router.get('/verify-email/:token', verifyEmail);
router.get('/logout', logOut);
router.post('/refresh-token', protect, refreshAccessToken);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', protect, changeCurrentPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/current-user', protect, getCurrentUser);
router.post('/login', loginUser);

export default router