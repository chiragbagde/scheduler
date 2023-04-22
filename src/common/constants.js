import {
    UserOutlined,
    UsergroupAddOutlined,
    PhoneOutlined,
    PlusOutlined,
    EditOutlined
  } from "@ant-design/icons";
  import * as Yup from "yup";
  
export const users = [
    {
      label: "Add User",
      icon: <PlusOutlined />,
      path: "/add-user",
    },
  ];
  
  export const rooms = [
    {
      label: "Add Room",
      icon: <PlusOutlined />,
      path: "/add-room",
    },
  ];
 

  export const meetings = [
    {
      label: "Add Meeting",
      icon: <PlusOutlined />,
      path: "/add-meeting",
    },
    {
      label: "User Meetings",
      icon: <UserOutlined />,
      path: "/user-meetings",
    },
    {
      label: "Room Meetings",
      icon: <UsergroupAddOutlined />,
      path: "/room-meetings",
    },
  ];

  export const items = [
  {
    label: "users",
    icon: <UserOutlined />,
    path: "/users",
    obj: users,
  },
  {
    label: "rooms",
    icon: <UsergroupAddOutlined />,
    path: "/rooms",
    obj: rooms,
  },
  {
    label: "meetings",
    icon: <PhoneOutlined />,
    path: "/meetings",
    obj: meetings,
  },
];

const transformGuestUsers = (value) => {
  if (value.length>0)
    return String(value).split(',').map((user) => user.trim());
  return [];
};

export const validationSchema = Yup.object({
  userName: Yup.string().required("User name is required"),
  userEmail: Yup.string().email("Invalid email address").required("Email is required"),
});


export const roomValidationSchema = Yup.object({
  roomId: Yup.string().required("Id is required"),
  roomName: Yup.string().required("Room Name is required"),
});

export const meetingValidationSchema = Yup.object({
  userId: Yup.string().required("Host user ID is required"),
  guestUsers: Yup.array()
  .transform(transformGuestUsers)
    .min(1, "At least one guest user is required")
    .of(Yup.string())
    .required("Guest users are required"),
  roomId: Yup.string().required("Room ID is required"),
  meetingDate: Yup.date().required("Meeting date is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string().required("End time is required"),
});