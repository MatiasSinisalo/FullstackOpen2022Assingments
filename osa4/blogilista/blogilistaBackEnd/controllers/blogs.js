
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = request.body
  
  if(!blog.url){
     return response.status(400).send()
  }

  if(!blog.title){
    return response.status(400).send()
  }
  
  if(!blog.likes){
    blog.likes = 0
  }
  const blogObject = new Blog(blog)

  blogObject
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter

