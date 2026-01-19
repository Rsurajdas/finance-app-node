import express from 'express';

import {
  addTransaction,
  getAllTransactionsByBudgets,
} from '../controllers/transactionController.js';
import protectedRoute from '../middlewares/protectedRoute.js';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(protectedRoute, addTransaction)
  .get(protectedRoute, getAllTransactionsByBudgets);

export { router };
