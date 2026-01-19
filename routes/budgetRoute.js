import express from 'express';

import {
  createBudget,
  deleteBudget,
  getBudgetById,
  getBudgets,
  updateBudget,
} from '../controllers/budgetController.js';
import protectedRoute from '../middlewares/protectedRoute.js';

const router = express.Router();

router
  .route('/')
  .post(protectedRoute, createBudget)
  .get(protectedRoute, getBudgets);
router
  .route('/:id')
  .get(protectedRoute, getBudgetById)
  .patch(protectedRoute, updateBudget)
  .delete(protectedRoute, deleteBudget);

export { router };
