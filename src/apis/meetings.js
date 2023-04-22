import axios from "axios";

const create = payload => 
        axios.post("http://localhost:3000/api/v1/schedule/create-meeting", payload);

const show_user = (id) => 
    axios.get(`http://localhost:3000/api/v1/schedule/get-meetings/user?userId=${id}`);

const show_room = (payload) => axios.post(`http://localhost:3000/api/v1/scheddule/get-meetings/room`, 
payload);

const meetingsApi = {
  create,
  show_room,
  show_user,
}

export default meetingsApi;
