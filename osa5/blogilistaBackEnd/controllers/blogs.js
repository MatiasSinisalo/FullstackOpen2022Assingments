
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { request } = require('../app')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  return response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
 
  const blog = request.body
  
  if(!request.user){
    return response.status(401).json({error: 'Unauthorized'})
  }
  const user = request.user

  if(!blog.url){
     return response.status(400).end()
  }

  if(!blog.title){
    return response.status(400).end()
  }
  
  if(!blog.likes){
    blog.likes = 0
  }
  
  const blogToSave = {
    title: blog.title,
    author: blog.author,
    user: user.id,
    likes: blog.likes,
    url: blog.url
  }

  const blogObject = new Blog(blogToSave)

 const result =  await blogObject.save()
 
 const savedBlogId = result.id
 const userBlogs = user.blogs.concat(savedBlogId)
 const updatedUser = await User.findByIdAndUpdate(user.id, {blogs: userBlogs},  {new: true})
 
 if(updatedUser){
  return  response.status(201).json({blog: result, user: updatedUser})
 }
 else{
  return response.status(404).json({error: "user assigned to the blog has already been removed from the database!"})
 }
  
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
 
  if(!request.user){
    return response.status(401).json({error: 'Unauthorized'})
  }
  
  const toBeModifiedBlog = await Blog.findOne({_id: request.params.id})
  if(!toBeModifiedBlog){
    return response.status(404).json({error: `Blog has already been removed from the database`})
  }

  
  if(!(toBeModifiedBlog.user.toString() === request.user.id.toString())){
    //if the modification changes title, auhor, url or the user it is not authorized since the original user isnt the one creating the change
    if(toBeModifiedBlog.title !== blog.title | toBeModifiedBlog.author !== blog.author | toBeModifiedBlog.url !== blog.url | toBeModifiedBlog.user.toString() !== blog.user.toString())
    {
      return response.status(401).json({error: 'Unauthorized'})
    }
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
  const blogRequest = await Blog.findById(request.params.id).populate('user')
 
  if(blogRequest){
    response.json(blogRequest)
  }
  else{
    response.status(404).send({ error: `Blog has already been removed from the database` })
  }
})


blogsRouter.delete('/:id', async (request, response) => {

 
  if(!request.user){
    return response.status(401).json({error: 'Unauthorized'})
  }


  const userid = request.user.id
  const blogToBeRemoved = await Blog.findById(request.params.id)
  if(!blogToBeRemoved){
    return response.status(404).json({error: 'blog has already been removed from the server!'})
  }


 


  if(!(blogToBeRemoved.user.toString() === userid.toString())){
    return response.status(401).json({error: 'Unauthorized'})
  }


  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

module.exports = blogsRouter

