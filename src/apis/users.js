import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:3000";

const list = () => axios.get(`${BASE}/api/v1/users/get-all-users`);
const create = (payload) => axios.post(`${BASE}/api/v1/users/add-user`, payload);
const show = (id) => axios.get(`${BASE}/api/v1/users/${id}`);
const update = (id, payload) => axios.put(`${BASE}/api/v1/users/${id}`, payload);
const destroy = (id) => axios.delete(`${BASE}/api/v1/users/${id}`);

const usersApi = { list, create, update, show, destroy };

export default usersApi;
