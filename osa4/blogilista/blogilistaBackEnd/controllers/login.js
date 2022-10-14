const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    if(!username){
        return response.status(400).json({
            error: "username missing"
        })
    }

    if(!password){
        return  response.status(400).json({
            error: "password missing"
        })
    }

    const user = await User.findOne({username})
   
    if(!user){
        return response.status(400).json({
            error: "invalid username or password"
        })
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
    console.log(passwordCorrect)
    if(!passwordCorrect){
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    response.status(200).send({
        token,
        username: user.username,
        name: user.name
    })
})


module.exports = loginRouter