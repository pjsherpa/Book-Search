const { AuthenticationError } = require("apollo-server-express");

const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("books");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("books");
    },
    books: async (parent, { username }) => {
      const params = username ? { username } : {};
      //putting books under ascending order
      return Book.find(params).sort(1);
    },
    book: async (parent, { bookId }) => {
      return Book.findOne({ _id: bookId });
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
    saveBook: async (
      parent,
      { description, bookId, image, link, title, authors }
    ) => {
      const book = await Book.findOne({
        description,
        bookId,
        image,
        link,
        title,
        authors,
      });

      await Book.findOneAndUpdate({ $addToSet: { books: book._id } });
      return book;
    },
    removeBook: async (parent, { bookId }) => {
      return Book.findOneAndDelete({ _id: bookId });
    },
  },
};
module.exports = resolvers;
