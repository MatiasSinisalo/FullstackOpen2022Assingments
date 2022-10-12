
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
     return response.status(400).end()
  }

  if(!blog.title){
    return response.status(400).end()
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

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  
  if(!blog.url){
     return response.status(400).end()
  }

  if(!blog.title){
    return response.status(400).end()
  }
 
  if(!blog.likes){
    blog.likes = 0
  }
  

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  if(updatedBlog){
    response.json(updatedBlog)
  }
  else{
    response.status(404).send({ error: `Blog has already been removed from the database` })
  }
})


blogsRouter.get('/:id', async (request, response) => {
  const blogRequest = await Blog.findById(request.params.id)
 
  if(blogRequest){
    response.json(blogRequest)
  }
  else{
    response.status(404).send({ error: `Blog has already been removed from the database` })
  }
})


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

module.exports = blogsRouter

