import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const authRouter = express.Router();
import bcrypt from "bcrypt";

import { User } from "../models/user.js";
import { validateAuthInput } from "../helper/validations.js";

authRouter.post("/", async (req, res) => {
  try {
    console.log("login: started", { data: req.body });
    const { error } = validateAuthInput(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({
      email: req.body.email,
      accountId: req.body.accountId,
    });
    if (!user) return res.status(401).send({ message: "User not found" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    const ended = {
      data: token,
      success: true,
      message: "Logged in successfully",
    };
    console.log("login: ended", ended);
    res.status(200).send(ended);
  } catch (error) {
    const ended = {
      success: false,
      message: `Internal Server Error: Message[${
        error?.message || error?.reason
      }]`,
    };
    console.error("registration: failed", ended);
    res.status(500).send(ended);
  }
});

export default authRouter;
