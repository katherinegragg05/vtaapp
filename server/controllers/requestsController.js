const bcrypt = require("bcrypt");

const Users = require("../models/Users");
const Note = require("../models/Note");

const getRoles = require("../config/roles");
const { idGeneratorHelper } = require("../config/utils");

const Requests = require("../models/Requests");

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
  const foundRequests = await Requests.find({
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
    const { purpose, proofOfPaymentFile, requirements, documentRequested } =
      req.body;
    const accountId = req?.accountId;
    console.log("createNewRequest: started", { accountId, ...req?.body });
    // Confirm data
    if (
      !purpose ||
      // !proofOfPaymentFile ||
      // !requirements ||
      !documentRequested
    ) {
      return res.status(400).json({ message: "Required fields are missing." });
    }
    const checkUser = await Users.findOne({ accountId }).exec();
    if (!checkUser) {
      return res.status(400).json({ message: "User not found." });
    }
    // Create and store new Request
    const createdRequest = await Requests.create({
      _id: idGeneratorHelper("req"),
      createdAt: new Date(),
      accountId,
      userId: checkUser?._id,
      purpose,
      // proofOfPaymentFile,
      // requirements,
      documentRequested,
      status: "Draft",
    });
    console.log("createNewRequest: created", { success: !!createdRequest });

    // Created
    return createdRequest
      ? res.status(201).json({ message: "New request created" })
      : res.status(400).json({ message: "Invalid request data received" });
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
 * Update a user through id
 * PATCH /api/users/update
 *
 * @param {*} req
 * @param {*} res
 *
 */

// const updateRequest = async (req, res) => {
//   const { id, accountId, roles, active, password } = req.body;

//   // Confirm data
//   if (
//     !id ||
//     !accountId ||
//     !Array.isArray(roles) ||
//     !roles.length ||
//     typeof active !== "boolean"
//   ) {
//     return res
//       .status(400)
//       .json({ message: "All fields except password are required" });
//   }

//   // Does the user exist to update?
//   const user = await Users.findById(id).exec();

//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   // Check for duplicate
//   const duplicate = await Users.findOne({ accountId })
//     .collation({ locale: "en", strength: 2 })
//     .lean()
//     .exec();

//   // Allow updates to the original user
//   if (duplicate && duplicate?._id.toString() !== id) {
//     return res.status(409).json({ message: "Duplicate accountId" });
//   }

//   user.accountId = accountId;
//   user.roles = roles;
//   user.active = active;

//   if (password) {
//     // Hash password
//     user.password = await bcrypt.hash(password, 10); // salt rounds
//   }

//   const updatedUser = await user.save();

//   res.json({ message: `${updatedUser.accountId} updated` });
// };

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
  // updateRequest,
  // deleteRequest,
};
