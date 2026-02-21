import { Schema, model } from 'mongoose';

// Todo -> compounding index

const transactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
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
      min: [1, 'Amount must be greater than zero'],
    },
    note: {
      type: String,
      trim: true,
    },
    paymentMode: {
      type: String,
      enum: ['cash', 'upi', 'card', 'bank'],
      required: [true, 'Payment Mode is required'],
    },
  },
  { timestamps: true }
);

transactionSchema.index({ userId: 1, budgetId: 1, createdAt: -1 });

const Transaction = model('Transaction', transactionSchema);

export default Transaction;
