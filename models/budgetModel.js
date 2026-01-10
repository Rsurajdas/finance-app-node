import { Schema, model } from 'mongoose';

const BudgetSchema = new Schema(
  {
    maxSpend: {
      type: Number,
      required: [true, 'Please enter maximum spend'],
    },
    theme: {
      type: String,
      enum: [
        'green',
        'yellow',
        'cyan',
        'navy',
        'red',
        'blue',
        'purple',
        'turquoise',
        'brown',
        'magenta',
        'navy grey',
        'army green',
        'gold',
        'orange',
      ],
      required: [true, 'Please select a theme'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Budget = model('Budget', BudgetSchema);

export default Budget;
