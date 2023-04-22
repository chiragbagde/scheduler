import Initialize from "./Initialize";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import meetingsApi from "../../apis/meetings";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);

  const history = useNavigate();
  const params = useParams();

  console.log(params);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit', second: '2-digit'}
    return new Date(dateString).toLocaleDateString(undefined, options)
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit'}
    return new Date(dateString).toLocaleDateString(undefined, options)
  };

  const fetchMeetingsForUser = async () => {
    try{
      const { data: meetings } = await meetingsApi.show_user(params.id);
      setMeetings(meetings.data.sort((a,b) => new Date(b.meetingDate) - new Date(a.meetingDate)));
      console.log(meetings);
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    if(params.type=="users" && params.id){
      fetchMeetingsForUser()
    }
  },[])

  if(!params.type){
    return <Initialize history={history} />
  }
  return(
    <>
      {meetings.map((meeting) => (
        <div className="user-card" key={meeting.startTime}>
            <h3>Timestamp - {formatDate(meeting.meetingDate)}</h3>
            <h4>Host User - {meeting.hostUserId}</h4>
            <h4>Start Time - {formatTime(meeting.startTime)}</h4>
            <h4>End Time - {formatTime(meeting.endTime)}</h4>
            <h4>Guest Users - </h4>
            {meeting.guestUsers.map((user) => (
              <p className="user" key={user}>{user}<hr className="solid" /></p>
            ))}
        </div>
      ))}
    </>
  )
};

export default Meetings;
