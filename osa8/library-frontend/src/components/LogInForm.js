const LoginForm = (props) => {
   
    
    if(!props.show){
        return null
    }
    return(
        <>
            <h3>log in</h3>
            <form onSubmit={props.handleLogin}>
                username <input type="text" name="username"></input>
                <br></br>
                password <input type="password" name="password"></input>
                <br></br>
                <input type="submit" value="log in"></input>
            </form>
        
        </>
    )
}

export default LoginForm