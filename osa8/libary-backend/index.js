require("dotenv").config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { UniqueDirectiveNamesRule } = require('graphql')
const { mongoose } = require('mongoose')
const { v4: uuid } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
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


    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    me: async(root, args, context) => {
      return context.user
    }

  },
  Mutation: {
    addBook: async (root, args, context) => {

      if(context.user === undefined){
        throw new UserInputError("Unauthorized", {
          invalidArgs: args,
        })
      }

      const book = {...args}
      let author = await Author.findOne({name: book.author})//authors.filter((author) => author.name === book.author)
    
      if(author === null){
        const newAuthor = {
          name: book.author,
          born: null,
        
        }
       
       
        try{
          const authorObj = Author(newAuthor)
          const savedAuthor = await authorObj.save()
          author = {
            name: savedAuthor.name,
            born: savedAuthor.born,
            id: savedAuthor._id, //id is needed if the request wants the id back from create book query
            _id: savedAuthor.id //_id is needed for the bookToSave.save() to have the correct ref to author
          }
        }
        catch(error){
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        
      }
      
      const bookToSave = {...book, author: author}
      console.log(bookToSave)
     
      try{
        const bookObj = Book(bookToSave)
        const returnedBook = await bookObj.save()
        console.log({...bookToSave, id: returnedBook._id})
        return {...bookToSave, id: returnedBook._id}
      }
      catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const author =  await Author.findOne({name: args.name})
      
      if(author === null){
        throw new UserInputError("Author not found", {
          invalidArgs: args,
        })
      }
      console.log(context.user)
      if(context.user === undefined){
        throw new UserInputError("Unauthorized", {
          invalidArgs: args,
        })
      }


      try{
      const updatedAuthor = await Author.findByIdAndUpdate(author.id, {born: args.setBornTo}, {new: true})
      return updatedAuthor
      }
      catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      const hashedPassword = await bcrypt.hash('password12345', 10)
      const newUser = {...args, passwordHash: hashedPassword} //this is intenttionally hardcoded
    
     // console.log(newUser)
     try{
      const newUserObj = User(newUser)
     // console.log(newUserObj)
      const response = await newUserObj.save()
      //console.log({username: response.username, favoriteGenre: response.favoriteGenre, id: response._id})
      return {username: response.username, favoriteGenre: response.favoriteGenre, id: response._id}
     }
     catch(error){
      throw new UserInputError(error.message, {
        invalidArgs: "password or username are invalid",
      })
     }
    },
    login: async (root, args) => {
      const proposedPassword = args.password
      const userToCompareTo =  await User.findOne({username: args.username})
      const correct = await bcrypt.compare(proposedPassword, userToCompareTo.passwordHash)
      if(correct){
        
        const tokenInfo = {
          username: userToCompareTo.username,
          id: userToCompareTo.id
        }
        const token = await jwt.sign(tokenInfo, process.env.SECRET)
        return {value: token}
      }

      throw new UserInputError("Incorrect credentials", {
        invalidArgs: "password or username are invalid",
      })
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
  context: async ({ req }) => {
    //the try catch is there because i dont want to show an error in a situtation where the token is given but it is not needed
    //for example in the case of login and createuser
    try{
    const authorizationHeader = req.headers.authorization
   
    if (authorizationHeader && authorizationHeader.toLowerCase().startsWith('bearer ')) {
      const token = jwt.verify(authorizationHeader.substring(7), process.env.SECRET)
      const user = await User.findById(token.id)
     
      return { user }
    }
  }
  catch{

  }
  
  
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})