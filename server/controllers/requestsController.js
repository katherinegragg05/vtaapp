const bcrypt = require("bcrypt");

const Users = require("../models/Users");
const Note = require("../models/Note");

const getRoles = require("../config/roles");
const { idGeneratorHelper } = require("../config/utils");

const Requests = require("../models/Requests");
const isAdmin = require("../middleware/isAdmin");

/**
 *
 * Get all requests
 * GET /api/requests/get-all
 *
 * @param {*} req
 * @param {*} res
 *
 */

const getAllRequests = async (req, res) => {
  console.log("getAllRequests: started", { accountId: req.accountId });
  // Get all Requests from MongoDB
  const admin = await isAdmin(req?.roles);

  const foundRequests = admin
    ? await Requests.find({}).exec()
    : await Requests.find({
        accountId: req?.accountId,
      }).exec();
  // If no Requests
  if (!foundRequests?.length) {
    return res.status(400).json({ message: "No Requests found" });
  }

  res.json(foundRequests);
};

/**
 *
 * Create a new request
 * POST /api/requests/create
 *
 * @param {*} req
 * @param {*} res
 *
 */

const createNewRequest = async (req, res) => {
  try {
    const { purpose, documentRequested } = req.body;
    const accountId = req?.accountId;
    console.log("createNewRequest: started", { accountId, ...req?.body });
    // Confirm data
    if (!purpose || !documentRequested) {
      return res.status(400).json({ message: "Required fields are missing." });
    }
    const checkUser = await Users.findOne({ accountId }).exec();
    if (!checkUser) {
      return res.status(400).json({ message: "User not found." });
    }
    // Create and store new Request
    const id = idGeneratorHelper("req");
    const createdRequest = await Requests.create({
      _id: id,
      createdAt: new Date(),
      accountId,
      userId: checkUser?._id,
      purpose,
      documentRequested,
      status: "Pending Verification",
      fullName:
        checkUser?.lastName +
        ", " +
        checkUser?.firstName +
        " " +
        checkUser?.middleInitial,
      course: checkUser?.course,
    });
    console.log("createNewRequest: created", { success: !!createdRequest });

    // Created
    return createdRequest
      ? res.status(201).json({
          requestId: id,
          success: true,
          message: "New request created",
        })
      : res.status(400).json({
          requestdId: null,
          success: false,
          message: "Failed to send request",
        });
  } catch (error) {
    console.error("createNewRequest: exception occurred", {
      errorMsg: error?.message,
    });
    return res.status(500).json({
      success: false,
      message: `Error Occurred: ${error?.message || "Internal Server Error"}`,
    });
  }
};

/**
 *
 * Update a request through id by Admin only (confirm request)
 * PATCH /api/requests/confirm-request
 *
 * @param {*} req
 * @param {*} res
 *
 */

const confirmRequest = async (req, res) => {
  try {
    const { id, confirmed } = req.body;
    console.log("confirmRequest: started", { id, confirmed });
    // Confirm data
    if (!confirmed || !id) {
      return res.status(400).json({
        message: "Please provide required information to confirm the request.",
      });
    }

    const request = await Requests.findOne({ _id: id }).exec();

    if (!request) {
      return res.status(400).json({ message: "Request not found" });
    }
    const admin = isAdmin(req?.roles);
    if (!admin) return res.status(500).json({ message: "Not authorized" });
    request.status = "Pending Payment";
    request.isVerified = confirmed === "confirmed";

    const updatedRequest = await request.save();
    console.log("confirmRequest: updated", { updatedRequest });
    return res.status(200).json({ success: true, message: "Request updated" });
  } catch (error) {
    console.error("confirmRequest: exception occurred", {
      errorMsg: error?.message,
    });
    return res.status(500).json({
      success: false,
      message: `Error Occurred: ${error?.message || "Internal Server Error"}`,
    });
  }
};

// /**
//  *
//  * Remove a user record
//  * DELETE /api/users/remove
//  *
//  * @param {*} req
//  * @param {*} res
//  *
//  */
// const deleteRequest = async (req, res) => {
//   const { id } = req.body;

//   // Confirm data
//   if (!id) {
//     return res.status(400).json({ message: "User ID Required" });
//   }

//   // Does the user still have assigned notes?
//   const note = await Note.findOne({ user: id }).lean().exec();
//   if (note) {
//     return res.status(400).json({ message: "User has assigned notes" });
//   }

//   // Does the user exist to delete?
//   const user = await Users.findById(id).exec();

//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   const result = await user.deleteOne();

//   const reply = `accountId ${result.accountId} with ID ${result._id} deleted`;

//   res.json(reply);
// };

/**
 *
 * Create a new request
 * POST /api/requests/create
 *
 * @param {*} req
 * @param {*} res
 *
 */

const uploadReceipt = async (req, res) => {
  try {
    const { files } = req;
    console.log("uploadReceipt: started ", {});
    res.send({
      data: files,
      msg: "Successfully uploaded " + files + " files!",
    });
  } catch (error) {
    console.error("uploadReceipt: exception occurred", {
      errorMsg: error?.message,
    });
    return res.status(500).json({
      success: false,
      message: `Error Occurred: ${error?.message || "Internal Server Error"}`,
    });
  }
};

module.exports = {
  getAllRequests,
  createNewRequest,
  uploadReceipt,
  confirmRequest,
  // updateRequest,
  // deleteRequest,
};
