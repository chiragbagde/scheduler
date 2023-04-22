import { useEffect, useState } from "react";
import RoomsApi from "../../apis/rooms";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { CloseCircleOutlined} from "@ant-design/icons";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const { data: rooms } = await RoomsApi.list();
      setRooms(rooms.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/rooms/edit/${id}`);
  };

  const handleDelete = async () => {
    try{
      await RoomsApi.destroy(deleteId);
      await fetchRooms();
    }
    catch (error) {
      console.log(error);
    }
    finally {
    setDeleteAlert(false);
  }};

  const handleClose = () => {
    setDeleteAlert(false);
  }

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {rooms.map((room) => (
        <div key={room.roomId} className="user-card">
          <h3>Room Id - {room.roomId}</h3>
          <h3>Room Name - {room.roomName}</h3>
          <Space wrap>
            <Button type="primary" onClick={() => handleEdit(room.roomId)}>
              Edit
            </Button>
            <Button type="primary" onClick={() => {setDeleteAlert(true); setDeleteId(room.roomId)}} danger>
              Delete
            </Button>
          </Space>
        </div>
      ))}
      {deleteAlert && (
        <div className="backdrop">
            <div className="delete-alert">
            <div className="icon"><CloseCircleOutlined onClick={handleClose} /></div>
            <div className="delete-content">
              <h3>Delete Room</h3>
              <p>Are you sure you want to continue deleting this room? This cannot be undone.</p>
            </div>
            <Button type="primary" className="delete-user"  onClick={handleDelete} danger>
              Delete
            </Button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
