import { Schema, model } from 'mongoose';
import slugify from 'slugify';

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    minlength: [3, 'Name should be at least 3 characters'],
    unique: true,
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    index: true,
  },
  description: {
    type: String,
    trim: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
});

categorySchema.pre('save', function () {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
});

const Category = model('Category', categorySchema);
export default Category;
