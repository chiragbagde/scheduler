import { useEffect, useState } from "react";
import UsersApi from "../../apis/users";
import { useNavigate } from "react-router-dom";
import { Button, Space } from "antd";
import { CloseCircleOutlined} from "@ant-design/icons";
import usersApi from "../../apis/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data: users } = await UsersApi.list();
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const handleDelete = async () => {
    try{
      await usersApi.destroy(deleteId);
      await fetchUsers();
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
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {users.map((user) => (
        <div key={user.userId} className="user-card">
          <h3>User Name - {user.userName}</h3>
          <h3>User Email - {user.userEmail}</h3>
          <Space wrap>
            <Button type="primary" onClick={() => handleEdit(user.userId)}>
              Edit
            </Button>
            <Button type="primary" onClick={() => {setDeleteAlert(true); setDeleteId(user.userId)}} danger>
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
              <h3>Delete User</h3>
              <p>Are you sure you want to continue deleting this user? This cannot be undone.</p>
            </div>
            <Button type="primary" className="delete-user"  onClick={handleDelete} danger>
              Delete
            </Button>
            </div>
        </div>
      )}
    </>
  );
};

export default Users;
