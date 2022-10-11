const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const blogs = [
    {
    
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    
    },
    {
      
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    
    },
    {
     
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    
    },
    {
    
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
    
    },
    {
     
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
     
    },
    {
  
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
    
    }  
  ]



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('amount of returned blogs is correct', async () => {
    const response =  await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length)
})

test('indentifying field must be id', async () => {
    const response =  await api.get('/api/blogs')
    const returnedBlogs = response.body.map(blog => blog)
    expect(returnedBlogs[0].id).toBeDefined()
})


test('adding a new blog increases the returned blogs length by 1', async () => {

    const newBlog = {
        author: "test author",
        title: "just added blog",
        url: "https://www.helsinki.fi/fi",
        likes: 10
    }
    await api.post('/api/blogs').send(newBlog)
  
    const response =  await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogs.length + 1)

})

test('just added blog is found from the database', async () => {

    const newBlog = {
        author: "test author",
        title: "just added blog",
        url: "https://www.helsinki.fi/fi",
        likes: 10
    }
    await api.post('/api/blogs').send(newBlog)
  
    const response =  await api.get('/api/blogs')
    const returnedBlogs = response.body.map(blog => {
        delete blog.id
        return blog
    })

    expect(returnedBlogs).toContainEqual(newBlog)
})

test('blog created with empty likes is assinged 0 likes when added to database', async () => {

    const newBlog = {
        author: "test author",
        title: "just added blog",
        url: "https://www.helsinki.fi/fi",
    }

    await api.post('/api/blogs').send(newBlog)
  
    const response =  await api.get('/api/blogs')
    const returnedBlogs = response.body.map(blog => {
        delete blog.id
        return blog
    })
    const compareBlog = {
        author: "test author",
        title: "just added blog",
        url: "https://www.helsinki.fi/fi",
        likes: 0
    }
    expect(returnedBlogs).toContainEqual(compareBlog)
})

test('if new blog title is empty return 400', async () => {

    const newBlog = {
        author: "test",
        title: "",
        url: "https://www.helsinki.fi/fi",
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  
   
})

test('if new blog url is empty return 400', async () => {

    const newBlog = {
        author: "test",
        title: "test title",
        url: "",
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  
   
})

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = blogs.map(blog => new Blog(blog))
    const blogPromises = blogObjects.map(blogObj => blogObj.save())
    await Promise.all(blogPromises)
  })


afterAll(() => {
  mongoose.connection.close()
})