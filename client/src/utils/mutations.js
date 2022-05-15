import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser ($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookId: String!, $authors: [String]!, $title: String!, $description: String! $image: String!, $link: String){
    saveBook(bookId: $bookId, authors: $authors, title: $title, description: $description, image: $image, link: $link) {
        _id
        username
        email
    }
}
`

export const REMOVE_BOOK = gql`
mutation removeBook($BookId: ID!){
    removeBook(BookId: $BookId) {
        _id
        authors
        title
        decription
        image
        link
    }
}
`