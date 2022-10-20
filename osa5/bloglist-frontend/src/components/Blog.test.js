import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('<Blog /> displays title and author when collapsed', async () => {
 
  render(<Blog blog={{title: "test title", author: "test author", url: "test url"}} />)

 
  const blog =  await screen.getByText('test title test author')

  expect(blog).toBeDefined()

})

test('<Blog /> doesnt display url when collapsed', async () => {
 
    render(<Blog blog={{title: "test title", author: "test author", url: "test url"}} />)
  
   
    const expandedBlog = await screen.queryByText('test url')
    expect(expandedBlog).toBeNull 
})

test('<Blog /> doesnt display likes when collapsed', async () => {
 
    render(<Blog blog={{title: "test title", author: "test author", url: "test url"}} />)
  
   
    const expandedBlog = await screen.queryByText('likes', { exact: false })
    expect(expandedBlog).toBeNull 
})


test('<Blog />  displays likes when not collapsed', async () => {
    
    const blogUser = {username : "placeholder"}
    render(<Blog blog={{title: "test title", author: "test author", url: "test url", user: blogUser}} user={{username: "placeholder"}} />)
 
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
   
    const likes = await screen.getByText('likes', { exact: false })
  
   
})

test('<Blog />  displays url when not collapsed', async () => {
    
    const blogUser = {username : "placeholder"}
    render(<Blog blog={{title: "test title", author: "test author", url: "test url", user: blogUser}} user={{username: "placeholder"}} />)
 
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
   
    await screen.getByText('test url')
  
   
})

test('<Blog />  displays author when not collapsed', async () => {
    
    const blogUser = {username : "placeholder"}
    render(<Blog blog={{title: "test title", author: "test author", url: "test url", user: blogUser}} user={{username: "placeholder"}} />)
 
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
   
    await screen.getByText('test author')
  
   
})


test('<Blog />  displays title when not collapsed', async () => {
    
    const blogUser = {username : "placeholder"}
    render(<Blog blog={{title: "test title", author: "test author", url: "test url", user: blogUser}} user={{username: "placeholder"}} />)
 
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
   
    await screen.getByText('test title')
  
   
})

