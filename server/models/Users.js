const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Account Constant
  _id: {
    type: String,
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  isAcceptedDataPrivacy: Boolean,

  // Personal Info
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleInitial: String,
  dateOfBirth: String,
  schoolDeets: {
    type: String,
    required: true,
    default: "UCC-Congress",
  },
  course: String,

  //Accouint info
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Users", userSchema, "users");

/**
 * 
 * 
 * 
First Name:
Middle Initial:
Last Name:
date of Birth:
Select Option:
Student ( Student Number )
Alumni ( Student Number )
E-mail Address:
Create Password:
Confirm Password:
DataPrivacy
 */
