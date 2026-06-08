import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:3000";

const list = () => axios.get(`${BASE}/api/v1/room/get-all-rooms`);
const create = (payload) => axios.post(`${BASE}/api/v1/room/add-room`, payload);
const show = (id) => axios.get(`${BASE}/api/v1/room/${id}`);
const update = (id, payload) => axios.put(`${BASE}/api/v1/room/${id}`, payload);
const destroy = (id) => axios.delete(`${BASE}/api/v1/room/${id}`);

const roomsApi = { list, create, update, show, destroy };

export default roomsApi;
