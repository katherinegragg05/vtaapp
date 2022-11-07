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
    allowedValues: [
      "Draft",
      "Submitted",
      "Received",
      "Confirmation",
      "Scheduled",
      "Done",
      "Archived",
      "Rescheduled",
    ],
  },
  schedule: String,
  isServed: Boolean,
  isRescheduled: Boolean,
});

module.exports = mongoose.model("Requests", requestSchema, "requests");
