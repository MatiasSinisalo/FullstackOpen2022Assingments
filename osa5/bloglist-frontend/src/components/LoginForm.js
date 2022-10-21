const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        username<input id="username" onChange={({ target }) => setUsername(target.value)} type="text" value={username}></input>
        <br></br>
        password<input id="password" onChange={({ target }) => setPassword(target.value)} type="password" value={password}></input>
        <br></br>
        <input id="loginSubmit" type="submit" value="login"></input>
      </form>
    </div>
  )
}

export default LoginForm