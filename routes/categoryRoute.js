import express from 'express';
import {requireSignIn, isAdmin} from '../middlewares/authMiddleware.js'
import {allCategoryController, createCategoryController, deleteCategoryController, updateCategoryController} from '../controllers/categoryController.js'

const router = express.Router();

// Create Category
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

// Update Category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

// Get All Category
router.get("/allcategory", allCategoryController);

// Delete Category
router.delete(
    "/deletecategory/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
);
 
export default router;