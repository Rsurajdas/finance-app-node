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
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Please select a category'],
      cast: [
        null,
        (value, path, model, kind) => {
          if (!value) {
            return 'Category Id should not be empty';
          }
          return `${value} is not a valid category Id`;
        },
      ],
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
