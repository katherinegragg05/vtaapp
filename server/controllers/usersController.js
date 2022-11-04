const bcrypt = require("bcrypt");

const Users = require("../models/Users");
const Note = require("../models/Note");

const getRoles = require("../config/roles");
const { idGeneratorHelper } = require("../config/utils");

/**
 *
 * Get all users
 * GET /api/users/get-all
 *
 * @param {*} req
 * @param {*} res
 *
 */

const getAllUsers = async (req, res) => {
  // Get all users from MongoDB
  const users = await Users.find().select("-password").lean();

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
};

/**
 *
 * Create a new user
 * POST /api/users/create
 *
 * @param {*} req
 * @param {*} res
 *
 */

const createNewUser = async (req, res) => {
  try {
    const {
      accountId,
      isAcceptedDataPrivacy,
      firstName,
      lastName,
      middleInitial,
      dateOfBirth,
      type,
      email,
      password,
    } = req.body;
    console.log("createNewUser: started", { accountId, email });

    // const roles = getRoles( type === "stdnt" ? "STUDENT" : "ALUMNI")
    const roles = getRoles(type);

    // Confirm data
    if (!accountId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate accountId
    const duplicate = await Users.findOne({ accountId })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (duplicate) {
      return res.status(409).json({ message: "Duplicate accountId" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    const userObject = {
      _id: idGeneratorHelper("usr"),
      accountId,
      isAcceptedDataPrivacy,
      firstName,
      lastName,
      middleInitial,
      dateOfBirth,
      email,
      password: hashedPwd,
      roles,
    };

    // Create and store new user
    const user = await Users.create(userObject);
    console.log("createNewUser: user created", { accountId, email });
    if (user) {
      //created
      res.status(201).json({ message: `New user ${accountId} created` });
    } else {
      res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (error) {
    console.error("createNewUser: exception occurred", {
      errorMsg: error?.message,
    });
    res.status(500).json({
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

const updateUser = async (req, res) => {
  const { id, accountId, roles, active, password } = req.body;

  // Confirm data
  if (
    !id ||
    !accountId ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await Users.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await Users.findOne({ accountId })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate accountId" });
  }

  user.accountId = accountId;
  user.roles = roles;
  user.active = active;

  if (password) {
    // Hash password
    user.password = await bcrypt.hash(password, 10); // salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.accountId} updated` });
};

/**
 *
 * Remove a user record
 * DELETE /api/users/remove
 *
 * @param {*} req
 * @param {*} res
 *
 */
const deleteUser = async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user still have assigned notes?
  const note = await Note.findOne({ user: id }).lean().exec();
  if (note) {
    return res.status(400).json({ message: "User has assigned notes" });
  }

  // Does the user exist to delete?
  const user = await Users.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `accountId ${result.accountId} with ID ${result._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
