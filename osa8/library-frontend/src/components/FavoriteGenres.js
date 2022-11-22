import { ME } from "../GraphQLqueries/userQueries"
import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import Books from "./Books"
import BooksDisplay from "./BooksDisplay"
import { ALL_BOOKS } from "../GraphQLqueries/bookQueries"

const FavoriteGenres = (props) => {
    const userQuery = useQuery(ME)
    const booksQuery = useQuery(ALL_BOOKS)
   
    console.log(userQuery)
    console.log(booksQuery)
   
    if(!props.show){
        return null
    }
    if(userQuery.data.loading || booksQuery.data.loading){
        return(
            <p>Loading...</p>
        )
    }
    const userGenre = userQuery.data.me.favoriteGenre
   
    const books = booksQuery.data.allBooks
   
    return(
        <>
            <h3>Books in your favorite genre: {userGenre}</h3>
            <BooksDisplay books={books} filter={userGenre}/>
        </>
    )
}




export default FavoriteGenres