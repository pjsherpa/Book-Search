const { gql } = require("apollo-server-express");

//Line 20 authors:[Book]! not sure on this one is it suppose to be authors:String
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    bookCount: Integer
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
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
    saveBook(
      description: String!
      bookId: String!
      image: String!
      link: String!
      title: String!
      authors: String!
    ): User
    removeBook(bookId: ID!): User
  }
`;
module.exports = typeDefs;
//confused with using bookId as I feel there are two bookId's present currently in User and in Book. One for the search one for the store-concept?
