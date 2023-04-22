import { Formik, Form as UserForm, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import usersApi from "../../apis/users";
import { validationSchema } from "../../common/constants";
import Alert from "../AlertMessage";

const Form = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const [initialValues, setInitialValues] = useState({
    userId: "",
    userName: "",
    userEmail: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  const fetchUser = async (id) => {
    try {
      const { data: user } = await usersApi.show(id);
      setInitialValues(prevValues => ({
        ...prevValues,
        ...user.data
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
        await usersApi.update(values.userId, values);
        setMessage("User updated successfully")
      }
      else{
        await usersApi.create(values);
        setMessage("User created successfully")
      }
      setSuccess(true);
    } catch (error) {
      setError(true);
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchUser(params.id);
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
          path="/users"
          navigate={navigate}
          type="success"
        />
      )}
      {error && (
        <Alert
          message={message}
          path="/users"
          navigate={navigate}
          type="error"
        />
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <UserForm className="formik-form">
            <div>
              <CloseCircleOutlined
                className="icon"
                onClick={() => navigate("/users")}
              />
              <h2>User Form</h2>
              <div className="formcontent">
                <label htmlFor="userId">User ID -</label>
                <Field name="userId">
                  {({ field }) => (
                    <Input {...field} disabled={update} placeholder="Enter User ID" />
                  )}
                </Field>
              </div>
              <div className="formcontent">
                <label htmlFor="userName">User Name -</label>
                <Field name="userName">
                  {({ field, form }) => (
                    <>
                      <Input {...field} placeholder="Enter User Name" />
                      {form.touched.userName && form.errors.userName ? (
                        <ErrorMessage
                          name="userName"
                          className="error-message"
                          component="div"
                        />
                      ) : null}
                    </>
                  )}
                </Field>
              </div>
              <div className="formcontent">
                <label htmlFor="userEmail">User Email -</label>
                <Field name="userEmail">
                  {({ field, form }) => (
                    <>
                      <Input {...field} placeholder="Enter User Email" />
                      {form.touched.userEmail && form.errors.userEmail ? (
                        <ErrorMessage
                          name="userEmail"
                          className="error-message"
                          component="div"
                        />
                      ) : null}
                    </>
                  )}
                </Field>
              </div>
              <div></div>
              <Button type="primary" disabled={!formik.dirty} className="formsubmit" htmlType="submit">
                Submit
              </Button>
            </div>
          </UserForm>
        )}
      </Formik>
    </div>
  );
};

export default Form;
