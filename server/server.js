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
      serverSelectionTimeoutMS: 5000,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Error connecting", err);
  });
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
    },
    context: ({ req }) => {
      // req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjRkOThhYjIxYjk3ZjYyMDIzYzg4MzYiLCJlbWFpbCI6ImZyYW5jaXNAZ21haWwuY29tIiwiaWF0IjoxNTk4OTIwODc1LCJleHAiOjE1OTk1MjU2NzV9.3U-sq83wVHM_AJyWid7TsVT58aNwVxr0dtdFnhzz7XE';
      return { req };
    }
  });


  
  await server.start();
  console.log("Apollo Server started");

  server.applyMiddleware({ app });
  console.log("Middleware applied");

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
};

// Call the async function to start the server
startServer();
