
import { useApolloClient } from "@apollo/client"
import { useEffect, useState } from "react"
import BooksDisplay from "./BooksDisplay"
import {ALL_BOOKS_WITH_GENRE } from "../GraphQLqueries/bookQueries"

const FavoriteGenres = (props) => {
   const client = useApolloClient()
  
    const [favoriteBooks, setFavoriteBooks] = useState(null)
   
    

    if(!props.show){
        return null
    }

    if(!props.user){
        return (
            <>
                <p>this page is only for logged in users</p>
            </>
        )
    }
    
    client.query({query: ALL_BOOKS_WITH_GENRE, variables: {genre: props.user.favoriteGenre}}).then((response) => {
            setFavoriteBooks(response.data.allBooks)
        } 
    )
    
    if(!favoriteBooks){
            return(
                <p>loading ...</p>
            )
    }
   
    if(favoriteBooks){
    return(
        <>
            <h3>Books in your favorite genre: { props.user.favoriteGenre }</h3>
            <BooksDisplay books={favoriteBooks}/>
        </>
    )
    }
}




export default FavoriteGenres