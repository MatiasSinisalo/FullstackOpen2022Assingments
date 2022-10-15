const User = require('../models/user')
const jwt = require('jsonwebtoken')
const getUser = async (request, response, next) => {
    
    const auth = request.get('authorization')
    request.user = null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
        const token = auth.substring(7)
        try{
            const validToken = jwt.verify(token, process.env.SECRET)
            
            if(validToken.id){
                    const user = await User.findById(validToken.id)
                    
                    if(user){
                        request.user = user
                    }
                }
        }
        catch{
            next()
        }

    }
    next()
}


module.exports = getUser
