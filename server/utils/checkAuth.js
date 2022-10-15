import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader)
    return {
      error: "No token provided",
    };

  try {
    const token = authHeader.split("Bearer ")[1];
    console.log(typeof token);

    const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);
    return decoded; //returns userId(id) and email, where userId will be placed in the post.userId field
  } catch (err) {
    throw new GraphQLError("Invalid Token", {
      extensions: {
        code: "UNAUTHENTICATED",
      },
    });
  }
};

export default checkAuth;
