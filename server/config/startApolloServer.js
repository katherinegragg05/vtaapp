import * as dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "../graphql/typedefs";
import resolvers from "../graphql/resolvers/index.js";
/**
 * Initialization of the Apollo Server
 *
 * @return {Promise<*>}
 */

const startApolloServer = async () => {
  try {
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: Number(process.env.PORT || 3000) },
    });

    console.log(`🚀  Server ready at ${url}`);
  } catch (error) {
    throw new Error("Failed to start server.");
  }
};

export default startApolloServer;
