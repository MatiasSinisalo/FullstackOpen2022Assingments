const BooksDisplay = (props) => {

    const filterBooks = (booksToFilter, filter) => {
        if(filter === null){
            return booksToFilter
        }

        const bookswithFilter = booksToFilter.filter((book) => {
          if(book.genres){
            console.log(`${book.genres} to ${filter}`)
             const filteredGenres = book.genres.filter((genre) => genre === filter)
             return filteredGenres.length
          }
          return false
        })
        return bookswithFilter
    }

    const filteredBooks = filterBooks(props.books, props.filter)
    console.log(props.filter)

    return(
        <>
        <table>
            <tbody>
            <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
            </tr>
            <>
                {
                    filteredBooks.length > 0 ?
                    <>
                        {filteredBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                        ))}
                    </>
                    :
                    <p>There are no books with genre: {props.filter}</p>
                }
            </>
            </tbody>
        </table>
        
      </>
    )
}

export default BooksDisplay