import axios from "axios";
const baseUrl = "/api/blogs/"

let token = null;


const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};


const getWithId = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    return response.data
}

const create = async (id, comment) => {
    const config = {
        headers: { Authorization: token },
      };
    const response = await axios.post(`${baseUrl}/${id}/comments`, comment, config)
    return response.data
}


export default { getWithId, create, setToken }