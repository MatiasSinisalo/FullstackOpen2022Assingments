const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    favoriteGenre: {
        type: String
    },
    passwordHash: {
    type: String,
    required: true
    },
})




module.exports = mongoose.model('userLibary', userSchema)


