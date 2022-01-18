import React, { useContext, useEffect, useState } from 'react';
import { ScheduleComponent, Week, Month, ViewsDirective, ViewDirective, Inject, Day } from '@syncfusion/ej2-react-schedule'
import Loader from '../components/Loader'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEnv } from '../context/env.context';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Popup from '../components/popup/Popup';
import UserMeetingForm from '../components/bookMeeting/UserMeetingForm';
import { UserContext, UserRoleContext } from '../App';

const Calendar = () => {
    const { getAccessTokenSilently, user } = useAuth0()
    const { apiServerUrl, audience } = useEnv()
    const role = `${audience}/roles`
    const [meetings, setMeetings] = useState([]);
    const currentUserId = useContext(UserContext)
    const isAdmin = useContext(UserRoleContext)

    useEffect(() => {
        // get the calendar data
        const getCalendarData = async () => {
            const token = await getAccessTokenSilently()
            await axios.get(`${apiServerUrl}/api/v1/meetings/search/byUser/${currentUserId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then(res => {  // after fetched all meeting data, get the user data using userId in meeting data
                res.data.content.forEach(meeting =>{
                    setMeetings((prevMeeting)=>[...prevMeeting,{
                        meetingId: meeting.meetingId,
                        title: "Meeting Id : ".concat(meeting.meetingId, "/", " house : ",  meeting.house.name),
                        houseId: meeting.house.houseId,
                        houseName: meeting.house.name,
                        userId: meeting.user.userId,
                        userName: meeting.user.fullName,
                        date: new Date(meeting.date.concat(' ', meeting.time)),
                        description: "meeting with : ".concat(meeting.user.fullName),
                        note: meeting.note
                    }])
                })
            })
            .catch((err)=>console.log(err))
        }
        getCalendarData()
    }, [apiServerUrl, currentUserId, getAccessTokenSilently]);

    const [openEditPopup, setOpenEditPopup] = useState(false)
    const [meetingData, setMeetingData] = useState("")

    const editMeeting = (e) => {
        setMeetingData(e.event)
        setOpenEditPopup(true)
    }

    // if logged in user is admin
    if (!isAdmin) {
        return (
            <>
                <Navigate replace to="/auth/admin/calendar" />
            </>
        )
    }
    return (
        <section className="hero d-flex align-items-center">
            <div className="col-lg-10">
                <br />
                <br />
                <br />
                <ScheduleComponent
                    currentView='Month' selectedDate={new Date()} height='850px' style={{ marginLeft: "250px" }}
                    popupOpen={false} readonly={true}
                    eventClick={editMeeting}
                    eventSettings={{
                        dataSource: meetings,
                        fields: {
                            Id: 'meetingId',
                            subject: { name: 'title' },
                            startTime: { name: 'date' },
                            endTime: { name: 'date' }
                        }
                    }}>

                    <ViewsDirective>
                        <ViewDirective option='Day' />
                        <ViewDirective option='Week' />
                        <ViewDirective option='Month' />
                    </ViewsDirective>
                    <Inject services={[Day, Week, Month]} />
                </ScheduleComponent>
            </div>
            <Popup
                title="View Meeting Detail"
                openPopup={openEditPopup}
                setOpenPopup={setOpenEditPopup}
            >
                <UserMeetingForm meetingData={meetingData} />
            </Popup>
        </section>

    );
};

export default withAuthenticationRequired(Calendar, {
    onRedirecting: () => <Loader />,
})
