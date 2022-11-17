import { gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import {ALL_BOOKS} from '../GraphQLqueries/bookQueries'



const Books = (props) => {
  
  //const [books, setBooks] = useState([])
  const [allBooks, setAllBooks] = useState([])
  const [books, setBooks] = useState([])


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

  const setFilteredBooks = (newFilter) => {
    if(newFilter === null){
      setBooks(allBooks)
      return allBooks
    }

    console.log(newFilter)
    const bookswithFilter = allBooks.filter((book) => {

      if(book.genres){
         const filteredBooks = book.genres.filter((genre) => genre === newFilter)
         return filteredBooks.length
      }
      return false
    })
    console.log(bookswithFilter)
    setBooks(bookswithFilter)
    return bookswithFilter
  }

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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          <>
            {books.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
      
   
        {
          genresList.map((genre) =>
            <button key={genre} onClick={() => setFilteredBooks(genre)}>{genre}</button>
          )
        }
        <button onClick={() => setFilteredBooks(null)}>reset filters</button>
      

    </div>
  )
}

export default Books
