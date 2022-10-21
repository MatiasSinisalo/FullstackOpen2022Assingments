import { func } from "prop-types"

describe('Blog app', function() {
    const users = [
        {
            username:"placeholder",
            name:"placeholder name", 
            password: "1234", 
            blogs:[], 
        },
        {
            username:"second placeholder",
            name:"testname",
            blogs:[],
            password: "1234"
        }
        ]
        
        const blogs = [
        {title:"This blog is owned by username placeholder",author:"Edsger W. Dijkstra",url:"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",likes:5},
        {title:"This blog is owned by username second placeholder",author:"Edsger W. Dijkstra",url:"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",likes:6}
        ]
        describe('when not logged in', function() {
            beforeEach( function() {
            
                cy.request('POST', 'http://localhost:3003/api/testing/reset')
                cy.request('POST', 'http://localhost:3003/api/users/', users[0])
                cy.request('POST', 'http://localhost:3003/api/users/', users[1])
                cy.visit('http://localhost:3000')
             })
             it('log in form is shown', function(){
                cy.contains('username')
                cy.contains('password')
                cy.contains('login')
             })
             
            
        })
    
    
    
        describe('log in', function () {
            it('wrong credentials', function() {
                cy.get('#username').type('placeholder')
                cy.get('#password').type('wrong')
                cy.get('#loginSubmit').click()
                cy.contains('login')
                cy.visit('http://localhost:3000')
            })

            it('right credentials', function() {
                cy.get('#username').type('placeholder')
                cy.get('#password').type('1234')
                cy.get('#loginSubmit').click()
                cy.contains('placeholder name logged in')
                cy.contains('logout')
                cy.contains('add new blog')
                cy.get('#logout').click()
            })
        })

        describe('when logged in', function() {
            beforeEach( async function () {
                const response = await cy.request('POST', 'http://localhost:3003/api/login/', {username: users[0].username, password: users[0].password})
                localStorage.setItem('user', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')

            })

            it('a blog can be created', function () {
                cy.contains("add new blog").click()
                cy.get("#createBlogTitle").type("cypress title test")
                cy.get("#createBlogAuthor").type("cypress Author test")
                cy.get("#createBlogUrl").type("cypress Url test")
                cy.contains("create blog").click()
                cy.contains("blogs")
                cy.contains("cypress title test cypress Author test")
                cy.contains("view")

            })
        })
   
    })