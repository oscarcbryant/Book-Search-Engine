const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Book {
    _id: ID
    authors: [String]
    description: String
    title: String
    link: String
}

input saveBook {
    authors: [String]
    title: String
    BookID: ID
    image: String
    link: String
}

type Query {
    users: [User]
    user(username: String!): User
    me: User
}

type Auth {
    token: ID!
    user: User
}

type Mutation {
login(email: String!, password: String!): Auth
addUser(username: String!, email: String!, password: String!): Auth
storeBook(authors: [String], title: String!, bookId: ID!, image: String, link: String): Book
removeBook(BookId: ID!): Book
}
`

module.exports = typeDefs;