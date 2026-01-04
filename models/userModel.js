import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema({
  fullname: {
    type: String,
    require: [true, "Please enter your username."],
    minLength: [3, "Username must be at least 3 characters long."],
  },
  email: {
    type: String,
    require: [true, "Please enter your email."],
    validate: [validator.isEmail, "Please provide a valid email address."],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: [true, "Please enter your password."],
    minLength: [8, "Password must be at least 8 characters long."],
    validate: [
      validator.isStrongPassword,
      "Password must contain at least 8 characters, including uppercase, lowercase, number, and symbol",
    ],
    select: false,
  },
  confirmPassword: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
    select: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChnageAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

const User = model("Users", userSchema);

export default User;
