describe('Blog app', function() {
  const users = [
    {
      username:'placeholder',
      name:'placeholder name',
      password: '1234',
      blogs:[],
    },
    {
      username:'second placeholder',
      name:'testname',
      blogs:[],
      password: '1234'
    }
  ]

  const blogs = [
    { title:'This blog is owned by username placeholder',author:'Edsger W. Dijkstra',url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',likes:5 },
    { title:'This blog is owned by username second placeholder',author:'Edsger W. Dijkstra',url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',likes:6 }
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


    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users/', users[0])
      cy.request('POST', 'http://localhost:3003/api/users/', users[1])
      cy.visit('http://localhost:3000')

      cy.request('POST', 'http://localhost:3003/api/login/', { username: users[0].username, password: users[0].password }).then(
        ({ body }) => {
          localStorage.setItem('user', JSON.stringify(body))
          cy.visit('http://localhost:3000')
        }
      )







    })

    it('a blog can be created', function () {
      cy.contains('add new blog').click()
      cy.get('#createBlogTitle').type('cypress title test')
      cy.get('#createBlogAuthor').type('cypress Author test')
      cy.get('#createBlogUrl').type('cypress Url test')
      cy.contains('create blog').click()
      cy.contains('blogs')
      cy.contains('cypress title test cypress Author test')
      cy.contains('view')

    })

    it('a blog can be liked', function () {
      cy.contains('add new blog').click()
      cy.get('#createBlogTitle').type('cypress title test for liking')
      cy.get('#createBlogAuthor').type('cypress Author test for liking')
      cy.get('#createBlogUrl').type('cypress Url test for liking')
      cy.contains('create blog').click()
      cy.contains('cypress title test for liking cypress Author test for liking').contains('view').click()
      cy.contains('cypress Url test for liking').parent().as('likedBlog')
      cy.get('@likedBlog').contains('like').click()
      cy.get('@likedBlog').contains('likes 1')



    })

    it('added blog can be removed', function () {
      cy.contains('add new blog').click()

      cy.createBlog(blogs[0])
      cy.visit('http://localhost:3000')
      cy.contains(`${blogs[0].title} ${blogs[0].author}`).contains('view').click()
      cy.contains(`${blogs[0].url}`).parent().as('blogToBeRemoved')
      cy.get('@blogToBeRemoved').contains('remove').click()
      cy.contains(`${blogs[0].url}`).should('not.exist')
      cy.contains(`${blogs[0].title} ${blogs[0].author}`).should('not.exist')

    })

    it('cant remove a blog by other user',  function() {
      cy.request('POST', 'http://localhost:3003/api/login/', { username: users[1].username, password: users[1].password }).then(
        ({ body }) => {
          localStorage.setItem('user', JSON.stringify(body))
          cy.visit('http://localhost:3000')
          cy.createBlog(blogs[1])
          cy.visit('http://localhost:3000')
          cy.contains('logout').click()
          cy.request('POST', 'http://localhost:3003/api/login/', { username: users[0].username, password: users[0].password }).then(
            ({ body }) => {
              localStorage.setItem('user', JSON.stringify(body))
              cy.visit('http://localhost:3000')
              cy.contains(`${blogs[1].title} ${blogs[1].author}`).contains('view').click()
              cy.contains(`${blogs[1].url}`).parent().as('blogToBeRemoved')
              cy.get('@blogToBeRemoved').contains('remove').should('not.exist')
            }
          )
        }
      )

    })

    it('blogs are sorted by likes correctly',  function() {
      cy.request('POST', 'http://localhost:3003/api/login/', { username: users[1].username, password: users[1].password }).then(
        ({ body }) => {
          localStorage.setItem('user', JSON.stringify(body))
          cy.visit('http://localhost:3000')
          cy.createBlog({ title: 'most', likes: 2, url: 'test url', author: 'author' })
          cy.createBlog({ title: 'least', likes: 0, url: 'url', author: 'other' })
          cy.visit('http://localhost:3000')

          cy.get('.blog').eq(0).should('contain', 'most')
          cy.get('.blog').eq(1).should('contain', 'least')

          cy.contains('least').parent().contains('view').click()
          cy.contains('least').parent().contains('like').click()
          cy.wait(500)


          cy.contains('least').parent().contains('like').click()
          cy.wait(500)

          cy.contains('least').parent().contains('like').click()
          cy.wait(500)

          cy.get('.blog').eq(0).should('contain', 'least')
          cy.get('.blog').eq(1).should('contain', 'most')







        }
      )

    })


  })

})