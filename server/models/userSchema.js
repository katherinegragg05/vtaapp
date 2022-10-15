import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: String,
  addressLine1: String,
  addressLine2: String,
  userType: {
    type: String,
    required: true,
  },
  avatarUrl: String,
  verified: {
    type: Boolean,
    required: true,
  },
  verificationEmailSent: {
    type: Boolean,
    required: true,
  },
  acceptedDataPrivacy: {
    type: Boolean,
    required: true,
  },
  token: String,
  keepLogin: Boolean,
  active: Boolean,
});

const Users = model("Users", userSchema, "users");

export default Users;
