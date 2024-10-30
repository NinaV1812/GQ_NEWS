const { User } = require("../../models/user");

module.exports = {
  Mutation: {
    signUp: async (parent, args, context, info) => {
      try {
        const user = new User({
          email: args.fields.email,
          password: args.fields.password,
        });
        const getToken = await user.generateToken();
        if (!getToken) {
        }
        const result = await user.save();
        return { ...result._doc };
      } catch (e) {
        throw e;
      }
    },
    authUser: async (parent, args, context, info) => {
      return "hello back";
    },
  },
};
