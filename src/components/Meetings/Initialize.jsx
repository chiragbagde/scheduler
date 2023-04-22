import { Formik, Form, Field } from "formik";
import React,{useState, useEffect} from 'react';
import { Select, Input, Button } from "antd";
import UsersApi from "../../apis/users";
import RoomsApi from "../../apis/rooms";

const { Option } = Select;

const Initialize = ({history}) => {
    const [users, setUsers] = useState("");
    const [rooms, setRooms] = useState("");
    const [loading, setLoading] = useState(true);
    
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
    
      useEffect(() => {
        fetchUsers();
        fetchRooms();
      }, []);
    
    const [initialValues, setInitialValues] = useState({
        usersOrRooms: "",
        selectedOption: "",
      });

    const handleSubmit = (values) => {
        console.log(values, initialValues);
        window.location.href = `/meetings/${values.usersOrRooms}/${values.selectedOption}`;
      };
 
      if (loading) {
        return <div>Loading....</div>;
      }
    
  return (
    <div className="backdrop">
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleSubmit, setFieldValue }) => (
        <Form className="formik-form" onSubmit={handleSubmit}>
          <Field name="usersOrRooms">
            {({ field }) => (
              <>
                <label htmlFor={field.name}>Select Users/Rooms</label>
                <Select
                  {...field}
                  onSelect={(val) =>
                    {
                    setInitialValues((values) => {
                      return {
                        ...values,
                        usersOrRooms: val,
                      };
                    });
                    setFieldValue('usersOrRooms', val);
                  }
                  }
                  value={initialValues.usersOrRooms}
                >
                  <Option value="users">Users</Option>
                  <Option value="rooms">Rooms</Option>
                </Select>
              </>
            )}
          </Field>
          <br />
          {initialValues.usersOrRooms === "users" && (
            <Field name="selectedOption">
              {({ field }) => (
                <>
                  <label htmlFor={field.name}>Select a Option</label>
                  <Select
                    {...field}
                    onSelect={(val) =>
                      {
                      setInitialValues((values) => {
                        return {
                          ...values,
                          selectedOption: val,
                        };
                      });
                      setFieldValue('selectedOption', val);
                    }
                    }
                    value={initialValues.selectedOption}
                  >
                    {users.map((user) => (
                      <Option key={user.userId} value={user.userId}>
                        {user.userName}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
            </Field>
          )}

          {initialValues.usersOrRooms === "rooms" && (
            <Field name="selectedOption">
              {({ field }) => (
                <>
                  <label htmlFor={field.name}>Select a Option</label>
                  <Select
                    {...field}
                    onSelect={(val) => {
                      setInitialValues((values) => {
                        return {
                          ...values,
                          selectedOption: val,
                        };
                      });
                      setFieldValue('selectedOption', val);
                    }
                    }
                    value={initialValues.selectedOption}
                  >
                    {" "}
                    {rooms.map((room) => (
                      <Option key={room.roomId} value={room.roomId}>
                        {room.roomName}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
            </Field>
          )}

          <br />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  </div>
  )
}

export default Initialize