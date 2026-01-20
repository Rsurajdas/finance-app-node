import { Schema, model } from 'mongoose';
import slugify from 'slugify';

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    minlength: [3, 'Name should be at least 3 characters'],
    trim: true,
  },
  slug: {
    type: String,
    index: true,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ['system', 'custom'],
    required: [true, 'Category type is required'],
    default: 'custom',
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: function () {
      return this.type === 'custom';
    },
    index: true,
  },
});

categorySchema.index(
  { name: 1, userId: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } }
);

categorySchema.pre('save', function () {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
});

const Category = model('Category', categorySchema);
export default Category;
