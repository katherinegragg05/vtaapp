import * as dotenv from "dotenv";
dotenv.config();

import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new Schema({
  accountId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.APP_SECRET_KEY
  );
  return token;
};

const User = model("Users", userSchema, "users");

const validateUser = (data) => {
  const schema = Joi.object({
    accountId: Joi.string().required().label("Student ID"),
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

export { User, validateUser };
