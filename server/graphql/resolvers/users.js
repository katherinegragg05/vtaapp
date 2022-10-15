import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { Users } from "../../models";

const userResolvers = {
  Query: {
    async getUsers() {
      try {
        const users = await Users.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getUser(_, { id }) {
      try {
        const user = await Users.findById(id);
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { email, password }) {
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign(
        { id: user._id, email: user.email, username: user.username },
        "secretKey"
      );
      return {
        email: user.email,
        token,
      };
    },

    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      //validate user data
      const checkUser = await Users.findOne({ email });

      if (checkUser === null) {
        let errs = {};

        if (!username) {
          errs.username = "Username is required";
        }

        if (validateEmail(email) === false) {
          errs.email = "Invalid email";
        }

        if (password !== confirmPassword) {
          errs.password = "Passwords do not match";
        }

        if (Object.keys(errs).length > 0) {
          console.log(Object.keys(errs));
          throw new Error(Object.values(errs));
        }

        password = await bcrypt.hash(password, process.env.SALT);

        const newUser = await Users.create({
          username,
          password,
          email,
          createdAt: new Date().toISOString(),
        });

        const token = jwt.sign(
          {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
          },
          process.env.APP_SECRET_KEY || "secretKey"
        ); //placeholder key

        return {
          ...newUser._doc,
          id: newUser._id,
          token,
        };
      } else {
        throw new Error("User already exists");
      }
    },
  },
};

export default userResolvers;
