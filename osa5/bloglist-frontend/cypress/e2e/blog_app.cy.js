
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
            })
        })
   
    })