const LoginForm = ({username, password, setUsername, setPassword, handleLogin}) => {
    return (
      <div>
        <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        username<input onChange={({target})=>setUsername(target.value)} type="text" value={username}></input>
        <br></br>
        password<input onChange={({target})=>setPassword(target.value)} type="password" value={password}></input>
        <br></br>
        <input type="submit" value="login"></input>
      </form>
    </div>
    )
  }

export default LoginForm