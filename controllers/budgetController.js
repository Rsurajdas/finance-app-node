import Budget from '../models/budgetModel.js';
import Category from '../models/categoryModel.js';
import AppError from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createCategory = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const newCategory = await Category.create({
    ...req.body,
    userId,
  });

  res.status(201).json({
    status: 'success',
    message: 'Category created successfully',
    data: {
      category: newCategory,
    },
  });
});

export const getCategories = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const categories = await Category.find({ userId }).select('-__v');

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

export const updateCategory = catchAsync(async (req, res, next) => {
  const { id: categoryId } = req.params;
  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedCategory) {
    return next(new AppError('No category found by this id', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Category updated successfully',
    data: {
      category: updatedCategory,
    },
  });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
  const { id: categoryId } = req.params;
  const category = await Category.findByIdAndDelete(categoryId);

  if (!category) {
    return next(new AppError('No category found by this id', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Category deleted successfully',
  });
});

export const createBudget = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const newBudget = await Budget.create({
    userId,
    ...req.body,
  });

  res.status(201).json({
    status: 'success',
    message: 'Budget created successfully',
    data: {
      budget: newBudget,
    },
  });
});

export const getBudgets = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const budgets = await Budget.find({ userId, isActive: true })
    .populate('category')
    .select('-__v');

  res.status(200).json({
    status: 'success',
    results: budgets.length,
    data: {
      budgets,
    },
  });
});

export const getBudgetById = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { id: budgetId } = req.params;

  const budget = await Budget.findOne({
    userId,
    _id: budgetId,
  });

  if (!budget) {
    return next(new AppError('No budget with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { budget },
  });
});

export const updateBudget = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { id: budgetId } = req.params;
  const updatedBudget = await Budget.findOneAndUpdate(
    { userId, _id: budgetId, isActive: true },
    { ...req.body },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate('category')
    .select('-__v');

  if (!updatedBudget) {
    return next(new AppError('No budget with this id', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Budget updated successfully',
    data: {
      budget: updatedBudget,
    },
  });
});

export const deleteBudget = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const { id: budgetId } = req.params;

  await Budget.findOneAndDelete({ userId, _id: budgetId, isActive: true });

  res.status(200).json({
    status: 'success',
    message: 'Budget deleted successfully',
  });
});
