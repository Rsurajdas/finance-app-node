import express from 'express';

import {
  createBudget,
  createBulkBudgets,
  deleteBudget,
  getBudgetById,
  getBudgets,
  updateBudget,
} from '../controllers/budgetController.js';
import protectedRoute from '../middlewares/protectedRoute.js';
import { router as transactionRouter } from './transactionRoute.js';

const router = express.Router();

router.use('/:id/transactions', transactionRouter);

router
  .route('/')
  .post(protectedRoute, createBudget)
  .get(protectedRoute, getBudgets);
router.route('/bulk').post(protectedRoute, createBulkBudgets);
router
  .route('/:id')
  .get(protectedRoute, getBudgetById)
  .patch(protectedRoute, updateBudget)
  .delete(protectedRoute, deleteBudget);

export { router };
