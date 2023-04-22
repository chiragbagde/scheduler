import { Formik, Form as RoomsForm, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import roomsApi from "../../apis/rooms";
import { roomValidationSchema } from "../../common/constants";
import Alert from "../AlertMessage";

const Form = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const [initialValues, setInitialValues] = useState({
    roomId: "",
    roomName: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  const fetchRoom = async (id) => {
    try {
      const { data: room } = await roomsApi.show(id);
      setInitialValues(prevValues => ({
        ...prevValues,
        ...room.data
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
        if(update){
            await roomsApi.update(values.roomId, values);
            setMessage("Room updated successfully")
        }
        else{
            await roomsApi.create(values);
            setMessage("Room created successfully")
        }
      setSuccess(true)
    } catch (error) {
      setError(true);
      setMessage(error.message)
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoom(params.id);
    if(params.id){
      setUpdate(true);
    }
  }, [params]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <div className="backdrop">
      {success && (
        <Alert
          message={message}
          path="/rooms"
          navigate={navigate}
          type="success"
        />
      )}
      {error && (
        <Alert
          message={message}
          path="/rooms"
          navigate={navigate}
          type="error"
        />
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={roomValidationSchema}
      >
        {() => (
          <RoomsForm className="formik-form">
            <div>
              <CloseCircleOutlined
                className="icon"
                onClick={() => navigate("/rooms")}
              />
              <h2>Room Form</h2>
              <div className="formcontent">
                <label htmlFor="roomId">room ID -</label>
                <Field name="roomId">
                  {({ field }) => (
                    <Input {...field} disabled={update} placeholder="Enter room ID" />
                  )}
                </Field>
              </div>
              <div className="formcontent">
                <label htmlFor="roomName">Room Name -</label>
                <Field name="roomName">
                  {({ field, form }) => (
                    <>
                      <Input {...field} placeholder="Enter room Name" />
                      {form.touched.roomName && form.errors.roomName ? (
                        <ErrorMessage
                          name="roomName"
                          className="error-message"
                          component="div"
                        />
                      ) : null}
                    </>
                  )}
                </Field>
              </div>
              <div></div>
              <Button type="primary" className="formsubmit" htmlType="submit">
                Submit
              </Button>
            </div>
          </RoomsForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
