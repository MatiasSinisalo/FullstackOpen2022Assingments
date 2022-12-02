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
        <p>{props.noBooksMsg}</p>
        }
      </>
    )
}

export default BooksDisplay