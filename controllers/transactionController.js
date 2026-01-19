import Budget from '../models/budgetModel.js';
import Transaction from '../models/transactionModel.js';
import AppError from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const addTransaction = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { id: budgetId } = req.params;

  const budget = await Budget.findOne({ userId, _id: budgetId });

  if (!budget) {
    return next(new AppError('No budget with this id', 404));
  }

  const newTransaction = await Transaction.create({
    userId,
    budgetId,
    ...req.body,
  });

  budget.transactions.push(newTransaction._id);

  await budget.save();

  res.status(201).json({
    status: 'success',
    message: 'Transaction successfully added',
    data: {
      transaction: newTransaction,
    },
  });
});

export const getAllTransactionsByBudgets = catchAsync(
  async (req, res, next) => {
    const userId = req.user._id;
    const { id: budgetId } = req.params;

    const budget = await Budget.findOne({ userId, _id: budgetId });

    if (!budget) {
      return next(new AppError('No budget with this id', 404));
    }

    const transactions = await Transaction.find({ userId, budgetId });

    res.status(200).json({
      status: 'success',
      results: transactions.length,
      data: {
        transactions,
      },
    });
  }
);
