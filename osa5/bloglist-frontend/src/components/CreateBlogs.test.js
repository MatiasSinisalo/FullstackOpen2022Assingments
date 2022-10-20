import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogs from './CreateBlogs'
import userEvent from '@testing-library/user-event'

test('<CreateBlogs/> form sends correct information to the server when submitted', async () => {
    let container
    
    const notificationFunc = jest.fn()
    const user = userEvent.setup()
    const createBlogFunc = jest.fn()
    
    container = render(<CreateBlogs createBlog={createBlogFunc} setNotification={notificationFunc}/>).container

    const displayButton = await  screen.getByText('create blog')
    await user.click(displayButton)


    const title = await container.querySelector('#createBlogTitle')
    const author =  await container.querySelector('#createBlogAuthor')
    const url =  await container.querySelector('#createBlogUrl')
    const submit =  await screen.getByText('create blog')

    await user.type(title, "Lorem Ipsum")
    await user.type(author, "wise human")
    await user.type(url, "google.com")

    await user.click(submit)
    console.log(createBlogFunc.mock.calls)
    expect(createBlogFunc.mock.calls).toContainEqual([{title: 'Lorem Ipsum', author: 'wise human', url: 'google.com'}])


})

