const BooksDisplay = (props) => {

    return(
        <>
        {
        props.books.length > 0 ?
            <>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                <>
                    
                    {props.books.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                    ))}
                        
                </>
                </tbody>
            </table>
            </>
         :
        <p>There are no books with your favorite genre</p>
        }
      </>
    )
}

export default BooksDisplay