import { Schema, model } from 'mongoose';

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    budgetId: {
      type: Schema.Types.ObjectId,
      ref: 'Budget',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    note: {
      type: String,
      trim: true,
    },
    paymentMode: {
      type: String,
      enum: ['cash', 'upi', 'card', 'bank'],
    },
  },
  { timestamps: true }
);

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
