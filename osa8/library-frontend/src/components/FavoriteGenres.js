
import { useApolloClient } from "@apollo/client"
import { useEffect, useState } from "react"
import BooksDisplay from "./BooksDisplay"
import {ALL_BOOKS_WITH_GENRE } from "../GraphQLqueries/bookQueries"

const FavoriteGenres = (props) => {
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
    
   
    
    if(!props.favoriteBooks){
            return(
                <p>loading ...</p>
            )
    }
   
   
    return(
        <>
            <h3>Books in your favorite genre: { props.user.favoriteGenre }</h3>
            <BooksDisplay books={props.favoriteBooks} noBooksMsg={`There are no books in genre ${props.user.favoriteGenre}`}/>
        </>
    )
    
}




export default FavoriteGenres