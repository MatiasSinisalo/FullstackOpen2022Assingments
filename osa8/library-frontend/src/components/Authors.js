import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../GraphQLqueries/authorQueries'

const EditAuthorForm = (props) => {

  const [editAuthor] = useMutation(EDIT_AUTHOR, {refetchQueries: [ { query: ALL_AUTHORS } ]})


  const editAuthorBornDate = async (event) => {
    event.preventDefault()

    const name = event.target.name.value
    const born = event.target.born.value
    console.log(event.target.name.value)
    await editAuthor({variables: {name: name, setBornTo: Number(born)}})

    console.log("edited author")
  }

  return(
    <form onSubmit={editAuthorBornDate}>
      name: <input type="text" name="name"></input>
      <br></br>
      born: <input type="number" name ="born"></input>
      <br></br>
      <input type="submit" value="update author"></input>

    </form>
  )
}


const Authors = (props) => {
 
  
  const request = useQuery(ALL_AUTHORS)

  if(request.loading){
    return <div>loading</div>
  }

  const authors = request.data.allAuthors

  console.log(authors)
  if (!props.show) {
    return null
  }
  return (
    <>
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <EditAuthorForm/>
    </>
  )
}

export default Authors
