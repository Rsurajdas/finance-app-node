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
  const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {
    new: true,
    runValidators: true,
  });
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
