const dummy = (blogs) => {
    
    return 1
  }
  
const totalLikes = (blogs) => {
    const counter = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(counter, 0)
}



  module.exports = {
    dummy,
    totalLikes
  }