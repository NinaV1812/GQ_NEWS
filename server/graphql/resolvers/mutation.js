const { User } = require("../../models/user");
const {
  UserInputError,
  AuthenticationError,
  ApolloError,
} = require("apollo-server-express");

module.exports = {
  Mutation: {
    signUp: async (parent, args, context, info) => {
      console.log('THE SHIT IS CALLED' )
      try {
        const user = new User({
          email: args.fields.email,
          password: args.fields.password,
        });

        const getToken = await user.generateToken();
        if (!getToken) {
          throw new AuthenticationError("Something is wrong");
        }
        return { ...getToken._doc}
      } catch (err) {
        if (err.code === 11000) {
          throw new AuthenticationError("Duplicated email");
        }
        throw err;
      }
    },
    authUser: async (parent, args, context, info) => {
      try {
        const user = await User.findOne({
          email: args.fields.email,
        });
        if (!user) {
          throw new AuthenticationError("Bad email");
        }
        const checkPass = user.comparePassword(args.fields.password);
        console.log("checkPass", checkPass);
        if (!checkPass) {
          throw new AuthenticationError("Wrong password");
        }
        const getToken = await user.generateToken();
        if (!getToken) {
          throw new AuthenticationError("Something is wrong");
        }

        return { _id: user._id, email: user.email, token: getToken.token };
      } catch (e) {
        if (e.code === 11000) {
          throw new AuthenticationError("Duplicated email");
        }
        throw e;
      }
    },
  },
};
