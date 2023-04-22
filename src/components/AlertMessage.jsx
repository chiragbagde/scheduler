import { Alert } from "antd";

const SuccessAlert = ({ message, path, type, navigate }) => {
  const onClose = () => {
    navigate(path);
  };

  return (
    <Alert
      onClose={onClose}
      className="alert"
      message={message}
      type={type}
      showIcon
      closable
    />
  );
};

export default SuccessAlert;
