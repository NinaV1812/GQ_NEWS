const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { mongoose } = require("mongoose");

const typeDefs = require("./graphql/schema");
const { Query } = require("./graphql/resolvers/query");
const { Mutation } = require("./graphql/resolvers/mutation");

const app = express();
mongoose
  .connect(
    `mongodb+srv://graphqluser:Testing123@cluster0.8krh8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });
const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
    },
  });

  // Await the start of the Apollo server
  await server.start();

  // Then apply the middleware after the server has started
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
};

// Call the async function to start the server
startServer();
