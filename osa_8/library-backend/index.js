const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const DataLoader = require('dataloader')
require('dotenv').config()
// Models
const User = require('./models/user')
const Author = require('./models/author')
const Book = require('./models/book')

// Hidden variables
const mongoUri = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose.set('useFindAndModify', false)

console.log('conneting to database...')

mongoose.connect(mongoUri, { useNewUrlParser: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to MongoDB: ', error.message))

// Apollo stuff
const pubsub = new PubSub()
const typeDefs = gql`

type User {
    username: String!
    favoriteGenre: String!
    id : ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int
    bookCount: Int
    books: [ID]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!,
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    me: (root, args, { currentUser }) => currentUser,
    bookCount: () => {
      console.log('bookCount')
      return Book.collection.countDocuments()
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => {
      console.log('AUTHOR.FIND (allAuthors)')
      return Author.find({})
    },
    allBooks: async (root, args) => {

      // if author and genre as arg
      if (args.author && args.genre) {
        console.log('AUTHOR.FINDONE (allBooks) -> author and genre as arg')
        const author = await Author.findOne({ name: args.author })
        console.log('BOOK.FIND (allBooks) -> author and genre as arg')
        return Book
          .find({
            $and: [
              { author: { $eq: author.id } },
              { genres: { $in: args.genre } }]
          })
          .populate('author', { id: 1, name: 1, born: 1, bookCount: 1, })
      }

      // If genre as arg
      if (!args.author && args.genre) {
        console.log('BOOK.FIND (allBooks -> genre as arg)')
        return Book
          .find({ genres: { $in: args.genre } })
          .populate('author', { id: 1, name: 1, born: 1, bookCount: 1 })
      }

      // If author as arg
      if (args.author && !args.genre) {
        console.log('BOOK.FIND (allBooks -> author as arg)')
        let author = await Author.findOne({ name: args.author })

        return Book
          .find({ author: author.id })
          .populate('author', { id: 1, name: 1, born: 1, bookCount: 1 })
      }

      // If no args
      console.log('BOOK.FIND (allBooks -> no args)')
      const book = await Book
        .find({})
        .populate('author', { id: 1, name: 1, born: 1, books:1, bookCount: 1 })

        return book
    }
  },
  Author: {
    bookCount: (root) => root.books.length
  },
  Mutation: {
    createUser: (root, args) => {
      const user = new User({ ...args })
      console.log('USER.SAVE')

      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message,
          { invalidArgs: args })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== "talkkuna") {
        throw new UserInputError("Wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not autheticated")
      }
      console.log('AUTHOR.FINDONE')


      let author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author({ name: args.author })
        console.log('AUTHOR.SAVE')

        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message,
            { invalidArgs: args }
          )
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author.id,
        genres: args.genres
      })
      console.log('BOOK.SAVE', args.title)

      try {
        const savedBook = await book.save()
        author.books = author.books.concat(savedBook._id)
        await Author.findByIdAndUpdate(author._id, author)
      } catch (error) {
        throw new UserInputError(error.message,
          { invalidArgs: args })
      }
      console.log('BOOK.FINDONE')

      // Extra db-query to populate author-field
      const savedBook = await Book.findOne({ title: args.title })
        .populate('author', { id: 1, name: 1, born: 1, bookCount: 1, books: 1 })

      // For subscribers
      pubsub.publish('BOOK_ADDED', { bookAdded: savedBook })

      // Return saved book with populated author
      return savedBook

    },
    editAuthor: (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not autheticated")
      }

      try {
        return Author
          .findOneAndUpdate(
            { name: args.name },
            { $set: { born: args.setBornTo } },
            { new: true })
      } catch (error) {
        throw new UserInputError(error.message,
          { invalidArgs: args })
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authorization = req ? req.headers.authorization : null

    if (authorization && authorization.toLocaleLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET)

      const currentUser = await User
        .findById(decodedToken.id)
      return {
        currentUser
      }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})