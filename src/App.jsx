import { Layout } from 'antd';
import 'antd/dist/reset.css';
import { Routes,Route, Navigate } from 'react-router-dom';
import './App.css';
import Rooms from './components/Rooms';
import Users from './components/Users';
import Meetings from './components/Meetings';
import UserForm from './components/Users/Form';
import RoomsForm from './components/Rooms/Form';
import MeetingsForm from './components/Meetings/Form';

const App = () => {
  return (
    <>
    <Layout>
      <Routes>
      <Route exact path="/" element={<Navigate to="users" />} />
          <Route path='/users' element={<Users />} />
          <Route path='/add-user' element={<UserForm />} />
          <Route path='/users/edit/:id' element={<UserForm />} />
          <Route path='/rooms' element={<Rooms />} />
          <Route path='/add-room' element={<RoomsForm />} />
          <Route path='/rooms/edit/:id' element={<RoomsForm />} />
          <Route path='/meetings' element={<Meetings />} />
          <Route path='/meetings/:type/:id' element={<Meetings />} />
          <Route path='/add-meeting' element={<MeetingsForm />} />
        </Routes>
    </Layout>
    </>
  );
}

export default App;
