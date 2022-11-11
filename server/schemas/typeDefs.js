const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Author {
    type: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(
      description: String!
      bookId: String!
      image: String!
      link: String!
      title: String!
    ): Book
    addAuthor(bookId: ID!, author: String!): Book
    removeBook(bookId: ID!): Book
    removeAuthor(bookId: ID!, author: String!): book
  }
`;
//confused with using bookId as I feel there are two bookId's present currently in User and in Book. One for the search one for the store-concept?
