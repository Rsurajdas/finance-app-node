import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name should be at least 3 characters'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = model('Category', categorySchema);
export default Category;
