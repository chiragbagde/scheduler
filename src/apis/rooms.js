import axios from "axios";

const list = () => axios.get('http://localhost:3000/api/v1/room/get-all-rooms');

const create = payload => 
        axios.post("http://localhost:3000/api/v1/room/add-room", payload);

const show = id => axios.get(`http://localhost:3000/api/v1/room/${id}`);

const update = (id, payload) => 
        axios.put(`http://localhost:3000/api/v1/room/${id}`, payload);

const destroy = (id) => axios.post(`http://localhost:3000/api/v1/room/${id}`);

const roomsApi = {
  list,
  create,
  update,
  show,
  destroy,
};

export default roomsApi;
