import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import {ALL_BOOKS} from '../GraphQLqueries/bookQueries'
import BooksDisplay from './BooksDisplay'


const Books = (props) => {
  
  //const [books, setBooks] = useState([])
  const [allBooks, setAllBooks] = useState([])
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState(null)

  //getting the object for query: https://www.apollographql.com/docs/react/data/queries/
  const bookQuery = useQuery(ALL_BOOKS)

  useEffect(() => {
    async function getBooks(){
      if(bookQuery.data){
        setAllBooks(bookQuery.data.allBooks)
        setBooks(bookQuery.data.allBooks)
      }
    }
    getBooks()
  }, [bookQuery])

  const allGenres = () =>  {
    let genres = {}

    allBooks.forEach((book) => {
      book.genres.forEach((genre) => {
        genres[genre] = true
      })
    })
    
    return Object.keys(genres)
  }
  
  const genresList = allGenres()
 
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>

        <BooksDisplay books = {books} filter={filter}/>
      
   
        {
          genresList.map((genre) =>
            <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
          )
        }
        <button onClick={() => setFilter(null)}>reset filters</button>
      

    </div>
  )
}

export default Books
