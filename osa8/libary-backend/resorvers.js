const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { UserInputError } = require('apollo-server-express')


const createNewAuthor = async (authorName) => {
  const newAuthor = {
    name: authorName,
    born: null,
    bookCount: 1
  }
 
  try{
    const authorObj = Author(newAuthor)
    const savedAuthor = await authorObj.save()
    return savedAuthor
  }
  catch(error){
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
}

const updateAuthorBookCount = async (authorId, newCount) => {
   //update the author
   const updatedAuthor = await Author.findByIdAndUpdate(authorId, {bookCount: newCount}, {new: true})
   return updatedAuthor
}

const saveBook = async (book, booksAuthor) => {
  const bookToSave = {...book, author: booksAuthor}
  console.log(bookToSave)
 
 
  try{
    const bookObj = Book(bookToSave)
    const returnedBook = await bookObj.save()
    const bookToReturn = {...bookToSave, id: returnedBook._id}
    console.log(bookToReturn)

    pubsub.publish('BOOK_ADDED', { bookAdded: bookToReturn }) 
    return bookToReturn
  }
  catch(error){
    throw new UserInputError(error.message, {
      invalidArgs: args,
    })
  }
}


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
        console.log(author)
        if(author === null){
          const newAuthor = await createNewAuthor(book.author)
          const savedBook = await saveBook(book, newAuthor)
          return savedBook
        }
        else{
          const updatedAuthor = await updateAuthorBookCount(author.id, author.bookCount + 1)
          const savedBook = await saveBook(book, updatedAuthor)
          return savedBook
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
      },
    },
    Subscription: {
        bookAdded: {
          subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },
    Author: {
      /*
      this is code for tasks before 8.26, in task 8.26 we update authors bookcount each time a new book is added and
      there's no need to query the books of the author

      bookCount: async (root) => {
          const books = await Book.find({author: root.id})
          return books.length
      } 
      */
    },
   
  
  }

module.exports = resolvers