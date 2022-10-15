import * as dotenv from "dotenv";
dotenv.config();

// config
import connectToMongoDB from "./config/database";
import startApolloServer from "./config/startApolloServer";

// connect to database first
connectToMongoDB();

// start apollo server
startApolloServer();
