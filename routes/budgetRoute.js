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
import cache from '../middlewares/cache.js';
import { budgetkey } from '../utils/redisKey.js';

const router = express.Router();

router.use('/:id/transactions', transactionRouter);

router
  .route('/')
  .post(protectedRoute, createBudget)
  .get(protectedRoute, cache(() => budgetkey("all"), 60 * 60), getBudgets);
router.route('/bulk').post(protectedRoute, createBulkBudgets);
router
  .route('/:id')
  .get(protectedRoute, cache((req) => budgetkey(req.params.id), 60 * 60), getBudgetById)
  .patch(protectedRoute, updateBudget)
  .delete(protectedRoute, deleteBudget);

export { router };
