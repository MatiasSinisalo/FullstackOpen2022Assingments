const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
describe('user creation checks', () => {
    test('creating a new user with password of length 2 returns statuscode 400', async () => {
        const newUser = {
            username: "test",
            name: "testname",
            password: "12"
        }
    
        api.post('/api/users').send(newUser).expect(400)
    
    })
    
    test('creating a new user with password of length 2 returns an error json', async () => {
        const newUser = {
            username: "test",
            name: "testname",
            password: "12"
        }
    
        const response = await api.post('/api/users').send(newUser)
        expect(response.body.error).toBe("password should have a min length of 3")
    
    })

    test('creating a new user with username of length 2 returns statuscode 400', async () => {
        const newUser = {
            username: "te",
            name: "testname",
            password: "123456"
        }
    
        api.post('/api/users').send(newUser).expect(400)
    
    })
    
    test('creating a new user with username of length 2 returns an error json', async () => {
        const newUser = {
            username: "te",
            name: "testname",
            password: "123456"
        }
    
        const response = await api.post('/api/users').send(newUser)
        expect(response.body.error).toBe("username should have a min length of 3")
    
    })


    test('creating a new user with username of length 2 doesnt create an user', async () => {
        const newUser = {
            username: "te",
            name: "testname",
            password: "123456"
        }
    
        const response = await api.post('/api/users').send(newUser)
        const username = newUser.username
        const user = await User.findOne({username})
        expect(user).toBe(null)
    
    })


    test('creating a new user with password of length 2 doesnt create an user', async () => {
        const newUser = {
            username: "test",
            name: "testname",
            password: "12"
        }
    
        const response = await api.post('/api/users').send(newUser)
        const username = newUser.username
        const user = await User.findOne({username})
        expect(user).toBe(null)
    
    })

    test('creating a user with existing username returns error 400', async () => {
        const newUser = {
            username: "test",
            name: "testname",
            password: "1234"
        }
        await api.post('/api/users').send(newUser)
        await api.post('/api/users').send(newUser).expect(400)
    })

    test('creating a user with existing username doesnt create an user', async () => {
        const newUser = {
            username: "test",
            name: "testname",
            password: "1234"
        }
        await api.post('/api/users').send(newUser)
        const secondUser = {
            username: "test",
            name: "secondUser",
            password: "1234"
        }
        await api.post('/api/users').send(secondUser)
        const username = newUser.username
        const user = await User.findOne({username})
        expect(user.username).toBe("test")
        expect(user.name).toBe("testname")
    })

    test('creating a new user with correct parameters creates an user', async () => {
        const newUser = {
            username: "test",
            name: "testname",
            password: "1234"
        }
    
        const response = await api.post('/api/users').send(newUser)
        const username = newUser.username
        const user = await User.findOne({username})
        expect(user.username).toBe("test")
        expect(user.name).toBe("testname")
    
    })
})







beforeEach(async () => {
    await User.deleteMany({})
    const newUser = {username:"placeholder",name:"placeholder name", password:"1234"}
    await api.post('/api/users').send(newUser)
   // await api.post('/api/login').send({username: newUser.username, password: newUser.password})
  
  //  const userObjects = users.map(user => new User(user))
  //  const userPromises = userObjects.map(userObj => userObj.save())
  //  await Promise.all(userPromises)
  })


afterAll(() => {
  mongoose.connection.close()
})