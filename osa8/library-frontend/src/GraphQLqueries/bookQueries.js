import {gql}  from '@apollo/client'

export const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $genres: [String!]!, $published: Int!){
  addBook (
    title: $title,
    author: $author,
    genres: $genres,
    published: $published
  ) {
    title,
    author{
      name
    },
    genres,
    published,
  }
}
`


export const ALL_BOOKS = gql`
query {
  allBooks  {
    title,
    author{
      name
    },
    published
    genres
  }
}
`

export const ALL_BOOKS_WITH_GENRE = gql`
query AllBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    genres
    published
    author {
      name
    }
  }
}
`

