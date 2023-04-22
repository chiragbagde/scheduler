import { Formik, Form as MeetingForm, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";
import { meetingValidationSchema } from "../../common/constants";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import meetingsApi from "../../apis/meetings"
import { useState } from "react";
import Alert from "../AlertMessage";

const Form = () => {
  const initialValues = {
    hostUserId: "",
    guestUsers: [""],
    roomId: "",
    meetingDate: "",
    startTime: "",
    endTime: "",
  };

  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (values) => {
    // Do something with the form data, such as send it to an API endpoint
    try{
    await meetingsApi.create({
        ...values,
        guestUsers: values.guestUsers.split(',').map((user) => user.trim()),
    });
    setSuccess(true);
    setMessage('Meeting created successfully')
    }
    catch(error){
        setError(true);
        setMessage(error.message);
    }
    console.log(values);
  };

  return (
    <div className="backdrop">
              {success && (
        <Alert
          message={message}
          path="/meetings"
          navigate={navigate}
          type="success"
        />
      )}
      {error && (
        <Alert
          message={message}
          path="/meetings"
          navigate={navigate}
          type="error"
        />
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={meetingValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <MeetingForm className="formik-form meetings">
            <div>
              <CloseCircleOutlined
                className="icon"
                onClick={() => navigate("/meetings")}
              />
              <h2>Meeting Form</h2>
              <div className="formcontent">
                <label htmlFor="userId">Host User ID:</label>
                <Field
                  id="userId"
                  name="userId"
                  as={Input}
                  placeholder="enter host user ID"
                />
                <ErrorMessage name="userId" />
              </div>
              <div className="formcontent">
                <label htmlFor="guestUsers">Guest Users:</label>
                <Field
                  id="guestUsers"
                  name="guestUsers"
                  as={Input}
                  placeholder="enter guests users id's comma separated"
                />
                <ErrorMessage name="guestUsers" />
              </div>
              <div className="formcontent">
                <label htmlFor="roomId">Room ID:</label>
                <Field
                  id="roomId"
                  name="roomId"
                  as={Input}
                  placeholder="Enter room Id"
                />
                <ErrorMessage name="roomId" />
              </div>
              <div className="formcontent">
                <label htmlFor="meetingDate">Meeting Date:</label>
                <Field
                  id="meetingDate"
                  name="meetingDate"
                  as={Input}
                  type="date"
                />
                <ErrorMessage name="meetingDate" />
              </div>
              <div className="formcontent">
                <label htmlFor="startTime">Start Time:</label>
                <Field id="startTime" name="startTime" as={Input} type="time" />
                <ErrorMessage name="startTime" />
              </div>
              <div className="formcontent">
                <label htmlFor="endTime">End Time:</label>
                <Field id="endTime" name="endTime" as={Input} type="time" />
                <ErrorMessage name="endTime" />
              </div>
              <Button type="primary" htmlType="submit">
                Create Meeting
              </Button>
            </div>
          </MeetingForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
