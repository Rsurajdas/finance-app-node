import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import validator from 'validator';

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Please enter your username.'],
    minLength: [3, 'Username must be at least 3 characters long.'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email.'],
    validate: [validator.isEmail, 'Please provide a valid email address.'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password.'],
    minLength: [8, 'Password must be at least 8 characters long.'],
    validate: [
      validator.isStrongPassword,
      'Password must contain at least 8 characters, including uppercase, lowercase, number, and symbol',
    ],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match',
    },
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  tokenVersion: {
    type: Number,
    default: 0,
  },
});

userSchema.pre('save', async function () {
  // Only hash password, when password is modified or created new
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
  }

  if (this.isModified('password') && !this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
});

// userSchema.pre('save', function () {
//   if (!this.isModified('password') || this.isNew) return;
//   this.passwordChangedAt = Date.now() - 1000;
// });

userSchema.methods.correctPassword = async function (
  receivedPassword,
  storedPassword
) {
  return await bcrypt.compare(receivedPassword, storedPassword);
};

userSchema.methods.changePasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimestamp < changeTimeStamp;
  }
  // False means password not changed
  return false;
};

const User = model('Users', userSchema);

export default User;
