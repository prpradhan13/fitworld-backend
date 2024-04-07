import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createDietController, deleteDietPlan, getDietPlanController, getSingleDietPlanController } from '../controllers/dietController.js';

const router = express.Router();

// Create dietplan
router.post('/create-dietplan', requireSignIn, isAdmin, createDietController)

// get dietplan
router.get('/get-dietplan', getDietPlanController)

// get dietplan
router.get('/get-dietplan/:id', getSingleDietPlanController)

// get dietplan
router.delete('/delete-dietplan/:id', requireSignIn, isAdmin, deleteDietPlan)

export default router;