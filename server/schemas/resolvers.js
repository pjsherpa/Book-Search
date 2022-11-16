const { AuthenticationError } = require("apollo-server-express");
const { default: SavedBooks } = require("../../client/src/pages/SavedBooks");

const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with email address");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }
      const token = signToken(user);

      return { token, user };
    },
    //chekc this part
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const savedBook = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              savedBooks: bookData,
            },
          },
          { new: true }
        );
        return savedBook;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              savedBooks: {
                bookId: bookId,
                book: context.user.username,
              },
            },
          },
          { new: true }
        );
        if (!updatedUser) {
          throw new AuthenticationError("You need to be logged in!");
        }
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
