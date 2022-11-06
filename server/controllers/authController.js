require("dotenv").config();

const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { idGeneratorHelper } = require("../config/utils");
const getRoles = require("../config/roles");

/**
 *
 * Login and authenticate session
 * POST /api/auth/login
 *
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  try {
    const { accountId, password } = req.body;
    console.log("login: started", { accountId });

    if (!accountId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const foundUser = await Users.findOne({ accountId }).exec();

    if (!foundUser || !foundUser?.active) {
      return res.status(401).json({
        message: "Unable to find the active user with the provided account id",
      });
    }

    const match = await bcrypt.compare(password, foundUser?.password);

    if (!match) return res.status(401).json({ message: "Incorrect Password" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          accountId: foundUser?.accountId,
          firstName: foundUser?.firstName,
          email: foundUser?.email,
          roles: foundUser?.roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5h" }
    );

    const refreshToken = jwt.sign(
      { accountId: foundUser?.accountId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "None", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
    console.log("login: authenticated", { accountId, accessToken });
    // Send accessToken containing accountId and roles
    res.json({ accessToken });
  } catch (error) {
    console.error("login: exception occurred", {
      errorMsg: error?.message,
    });
    res.status(500).json({
      success: false,
      message: `Error Occurred: ${error?.message || "Internal Server Error"}`,
    });
  }
};

/**
 *
 * Sign up as Student or Alumni
 * POST /api/auth/register
 *
 * @param {*} req
 * @param {*} res
 */
const register = async (req, res) => {
  try {
    const {
      accountId,
      isAcceptedDataPrivacy,
      firstName,
      lastName,
      middleInitial,
      // dateOfBirth,
      type,
      email,
      password,
      confirmPassword,
    } = req.body;
    console.log("register: started", {
      accountId,
      isAcceptedDataPrivacy,
      firstName,
      lastName,
      middleInitial,
      type,
      email,
      password,
      confirmPassword,
    });

    // const roles = getRoles( type === "stdnt" ? "STUDENT" : "ALUMNI")
    const roles = getRoles(type);

    // Confirm data
    if (
      !accountId ||
      !firstName ||
      !lastName ||
      !type ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res
        .status(400)
        .json({ message: "Please supply required fields." });
    }

    if (!isAcceptedDataPrivacy) {
      return res
        .status(400)
        .json({ message: "Please read and accept the data privacy." });
    }

    if (password.trim() !== confirmPassword.trim()) {
      return res
        .status(400)
        .json({ message: "Password and Confirm password do not match." });
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
      dateOfBirth: "",
      email,
      password: hashedPwd,
      roles,
    };

    // Create and store new user
    const user = await Users.create(userObject);
    console.log("register: user created", { accountId, email });
    if (user) {
      //created
      res.status(201).json({
        success: true,
        message: `New user ${accountId} created`,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid user data received" });
    }
  } catch (error) {
    console.error("register: exception occurred", {
      errorMsg: error?.message,
    });
    res.status(500).json({
      success: false,
      message: `Error Occurred: ${error?.message || "Internal Server Error"}`,
    });
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      const foundUser = await Users.findOne({
        accountId: decoded.accountId,
      }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            accountId: foundUser.accountId,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    }
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  register,
  refresh,
  logout,
};
