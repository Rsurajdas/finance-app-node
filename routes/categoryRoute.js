import express from 'express';

import {
  createBulkCategories,
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/budgetController.js';
import protectedRoute from '../middlewares/protectedRoute.js';

const router = express.Router();
router
  .route('/')
  .get(protectedRoute, getCategories)
  .post(protectedRoute, createCategory);
router.route('/bulk').post(protectedRoute, createBulkCategories);
router
  .route('/:id')
  .patch(protectedRoute, updateCategory)
  .delete(protectedRoute, deleteCategory);

export { router };
