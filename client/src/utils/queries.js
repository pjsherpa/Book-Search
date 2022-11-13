import { gql } from "@apollo/client";

export const GET_ME = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      savedBooks {
        _id
        description
        bookId
        image
        link
        title
        authors
      }
    }
  }
`;

export const QUERY_BOOK = gql`
query getBook {
Book {
_id: ID
description: String
bookId: String
image: String
link: String
title: String
authors: [String]!
}
}`;
