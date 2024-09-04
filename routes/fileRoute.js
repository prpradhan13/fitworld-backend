import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import formidable from 'express-formidable';
import { createFileController, deleteproductController, getFileController, getFileInfo, searchFileController, updateFileController } from '../controllers/fileController.js';
import caching from '../middlewares/cachingMiddleware.js';

const router = express.Router();

// create file
router.post('/create-file', requireSignIn, isAdmin, formidable(), createFileController)

// Update file
router.put('/update-file/:fid', requireSignIn, isAdmin, formidable(), updateFileController)

// Get fileInfo
router.get('/get-fileinfo', caching, getFileInfo)

// Get file
router.get('/get-file/:fid', caching, getFileController)

// Delete Product
router.delete("/delete-file/:pid", requireSignIn, isAdmin, deleteproductController);

// search products
router.get("/search/:keyword", searchFileController);

export default router;