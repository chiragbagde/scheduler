import axios from "axios";

const list = () => axios.get('http://localhost:3000/api/v1/users/get-all-users');

const create = payload => 
        axios.post("http://localhost:3000/api/v1/users/add-user", payload);

const show = id => axios.get(`http://localhost:3000/api/v1/users/${id}`);

const update = (id, payload) => 
        axios.put(`http://localhost:3000/api/v1/users/${id}`, payload);

const destroy = (id) => axios.delete(`http://localhost:3000/api/v1/users/${id}`);

const usersApi = {
  list,
  create,
  update,
  show,
  destroy,
};

export default usersApi;
