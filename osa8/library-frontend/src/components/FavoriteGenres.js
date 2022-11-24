import { ME } from "../GraphQLqueries/userQueries"
import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import Books from "./Books"
import BooksDisplay from "./BooksDisplay"
import { ALL_BOOKS } from "../GraphQLqueries/bookQueries"

const FavoriteGenres = (props) => {
    const booksQuery = useQuery(ALL_BOOKS)
    if(!props.show){
        return null
    }
    if(booksQuery.data.loading){
        return(
            <p>Loading...</p>
        )
    }
    const books = booksQuery.data.allBooks
    if(!props.user){
        return (
            <>
                <p>this page is only for logged in users</p>
            </>
        )
    }

    return(
        <>
            <h3>Books in your favorite genre: { props.user.favoriteGenre}</h3>
            <BooksDisplay books={books} filter={ props.user.favoriteGenre}/>
        </>
    )
}




export default FavoriteGenres