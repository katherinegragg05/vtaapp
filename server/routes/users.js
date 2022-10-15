import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
const userRouter = express.Router();
import bcrypt from "bcrypt";

import { User, validateUser } from "../models/user.js";

userRouter.post("/", async (req, res) => {
  try {
    console.log("registration: started", { data: req.body });
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({
      email: req.body.email,
      accountId: req.body.accountId,
    });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT || 10));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({
      ...req.body,
      password: hashPassword,
    }).save();
    const ended = {
      data: req?.body,
      success: true,
      message: "User created successfully",
    };
    console.log("registration: ended", ended);
    res.status(201).send(ended);
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

export default userRouter;
