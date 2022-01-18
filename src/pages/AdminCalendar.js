import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Week, Month, ViewsDirective, ViewDirective, Inject, Day } from '@syncfusion/ej2-react-schedule'
import Loader from '../components/Loader';
import axios from 'axios'
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { Navigate, useNavigate } from 'react-router-dom';
import Popup from '../components/popup/Popup';
import AdminMeetingForm from '../components/bookMeeting/AdminMeetingForm';

const AdminCalendar = () => {

    const { user, getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()
    const role = `${audience}/roles`

    const [meetings, setMeetings] = useState([]);
    useEffect(() => {
        // get the calendar data
        const getCalendarData = async () => {
            const token = await getAccessTokenSilently()
            console.log(token)
            await axios.get(`${apiServerUrl}/api/v1/meetings/search/byDate/month`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then(res => { 
                res.data.forEach(meeting =>{
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
                console.log(res.data)
            })
            .catch((err)=>console.log(err))
        }
        getCalendarData()

    }, [apiServerUrl, getAccessTokenSilently]);

    const [openEditPopup, setOpenEditPopup] = useState(false)
    const [meetingData, setMeetingData] = useState("")

    const editMeeting = (e) => {
        setMeetingData(e.event)
        setOpenEditPopup(true)
    }

    // if logged in user is not admin
    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/unauthorized" />
            </>
        )
    }

    return (
        <section className="hero d-flex align-items-center" style={{ marginTop: 100 }}>
            <br/>
            <br/>
            <br/>
            <div className="col-lg-10" >
                <ScheduleComponent style={{ marginLeft: "250px" }}
                    currentView='Month' selectedDate={new Date()} height='850px' readonly={true} popupOpen={false}
                    eventClick={editMeeting}
                    eventSettings={{
                        dataSource: meetings,
                        fields: {
                            Id: 'meetingId',
                            subject: { name: 'title' },
                            content: { name: 'content' },
                            startTime: { name: 'date' },
                            endTime: { name: 'date' },
                            description: { name: 'description' }
                        }
                    }}>

                    <ViewsDirective >
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
                <AdminMeetingForm meetingData={meetingData} />
            </Popup>
        </section>
    );
};

export default withAuthenticationRequired(AdminCalendar, {
    onRedirecting: () => <Loader />,
})