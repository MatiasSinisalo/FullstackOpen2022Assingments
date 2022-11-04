import axios from 'axios'
const baseurl='/api/login'
const login = async credentials => {
  //  console.log(credentials.username)
  const response = await axios.post(baseurl, credentials)
  return response.data
}

export default{ login }