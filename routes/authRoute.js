import express from 'express';
import { deleteUserController, forgotPasswordController, getAllUsersController, loginController, signUpController, testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// SignUP route
router.post('/signup', signUpController)

// Login route
router.post('/login', loginController)

// Forgot password route
router.post('/forgot-password', forgotPasswordController)

router.get("/test", requireSignIn, isAdmin, testController);

// Protected user route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// get user
router.get("/get-allusers", requireSignIn, isAdmin, getAllUsersController);

// Delete user
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteUserController);

// Admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;