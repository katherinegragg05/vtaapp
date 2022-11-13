const mongoose = require("mongoose");
const requirementsSchema = new mongoose.Schema({
  type: String,
  fileURL: String,
  // isRequired: Boolean,
});
const requestSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedAt: Date,
  accountId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  purpose: String,
  proofOfPaymentFileURL: String,
  requirements: [requirementsSchema],
  documentRequested: String,
  status: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  orderOfPaymentReferenceId: String,
  schedule: String,
  isVerified: Boolean,
  isServed: Boolean,
  isRescheduled: Boolean,
});

module.exports = mongoose.model("Requests", requestSchema, "requests");
