// const { Query } = require("mongoose");
const { User } = require("../../models/user");
const authorize = require("../../utils/isAuth");
const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server-express");

module.exports = {
  Query: {
    user: async (parent, args, context, info) => {
      try {
        const req = authorize(context.req);
        const user = await User.findOne({ _id: args.id });

        if (req._id.toString() !== user._id.toString()) {
          throw new AuthenticationError("You are not the user");
        }
        return user;
      } catch (error) {
        throw error;
      }
    },
  },
};
