require("dotenv").config()
const { ApolloServer, gql } = require('apollo-server')
const { UniqueDirectiveNamesRule } = require('graphql');
const { mongoose } = require('mongoose');
const { v4: uuid } = require('uuid');

const Author = require('./models/author')
const Book = require('./models/book')

let url = process.env.MONGODB_URI
mongoose.connect(url)



let authorsDepricated = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]



/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 *
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
*/

let booksDepricated = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]





const typeDefs = gql`

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
 }

 type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}

  type Mutation{
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ):Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }



`


const resolvers = {
 
  Query: {
    authorCount: async() => {
      const authors = await Author.find({})
      return authors.length
    },
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    allBooks: async (root, args) => {
        const books = await Book.find({}).populate('author')
        const booksByAuthor = args.author !== undefined ? books.filter((book) => book.author.name === args.author) : books
        const booksByGenre = args.genre !== undefined ? booksByAuthor.filter((book) => book.genres.filter((genre) => genre === args.genre).length > 0) : booksByAuthor
        return booksByGenre
    },
    allAuthors: async() => {
      const authors = Author.find({})
      return authors
    },

  },
  Mutation: {
    addBook: async (root, args) => {
      const book = {...args}
      
      let author = await Author.findOne({name: book.author})//authors.filter((author) => author.name === book.author)
    
      if(author === null){
        const newAuthor = {
          name: book.author,
          born: null,
        
        }
       
        const authorObj = Author(newAuthor)
        const savedAuthor = await authorObj.save()
        
        author = {...savedAuthor}
      }
      
      const bookToSave = {...book, author: author}
     
      const bookObj = Book(bookToSave)
    
      let returnedBook = await bookObj.save()
      
    
      return returnedBook
      

      
    },
    editAuthor: (root, args) => {
      const editInfo = {...args}

      const knownAuthor = authors.filter((author) => author.name === editInfo.name)



      if(knownAuthor[0] === undefined){
        return null
      }

      const updatedList = authors.map((author) => author.name === editInfo.name ? {...author, born: editInfo.setBornTo} : author)

      authors = updatedList

      const editedAuthor = {...knownAuthor[0], born: editInfo.setBornTo}

      return editedAuthor


    }
  },
  Author: {
    bookCount: async (root) => {
        const books = await Book.find({author: root.id})
        return books.length
    } 

  }

}


const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})