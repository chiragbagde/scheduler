import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:3000";

const create = (payload) => axios.post(`${BASE}/api/v1/schedule/create-meeting`, payload);
const show_user = (id) => axios.get(`${BASE}/api/v1/schedule/get-meetings/user?userId=${id}`);
const show_room = (payload) => axios.post(`${BASE}/api/v1/schedule/get-meetings/room`, payload);

const meetingsApi = { create, show_user, show_room };

export default meetingsApi;
