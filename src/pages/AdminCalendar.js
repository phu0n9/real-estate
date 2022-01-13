import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Week, Month, ViewsDirective, ViewDirective, Inject, Day } from '@syncfusion/ej2-react-schedule'
import Loader from '../components/Loader';
import axios from 'axios'
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { Navigate, useNavigate } from 'react-router-dom';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
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
            let cnt = 0
            const token = await getAccessTokenSilently()
            await axios.get(`${apiServerUrl}/api/v1/meetings`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {  // after fetched all meeting data, get the user data using userId in meeting data
                Promise.all(res.data.map(i =>
                    fetch(`${apiServerUrl}/api/v1/users/${i.userHouse.userId}`, {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    })
                ))
                    .then(res2 => Promise.all(res2.map(r => r.json())))
                    .then(res2Result => { // after fetched the user data, get the house data using houseId in meeting data
                        Promise.all(res.data.map(i =>
                            fetch(`${apiServerUrl}/api/v1/houses/${i.userHouse.houseId}`, {
                                headers: {
                                    authorization: `Bearer ${token}`
                                }
                            })
                        )).then(res3 => Promise.all(res3.map(r => r.json())))
                            .then(res3Result => { // after fetched the house data, spread user full name and house name
                                Promise.all(res.data.map((it) => {
                                    cnt = 0
                                    res2Result.map((user, i) => {
                                        res3Result.map((house, j) => {
                                            if (it.userHouse.userId === res2Result[i].userId && it.userHouse.houseId === res3Result[j].houseId) {
                                                cnt += 1
                                                if (cnt === 1) {
                                                    setMeetings(prevList => [...prevList, {
                                                        meetingId: it.meetingId,
                                                        title: "Meeting Id : ".concat(it.meetingId, "/", " house : ", res3Result[j].name),
                                                        houseId: it.userHouse.houseId,
                                                        houseName: res3Result[j].name,
                                                        userId: it.userHouse.userId,
                                                        userName: res2Result[i].fullName,
                                                        date: new Date(it.date.concat(' ', it.time)),
                                                        description: "meeting with : ".concat(res2Result[i].fullName),
                                                        note: it.note
                                                    }])
                                                } else {
                                                    cnt = 0
                                                }
                                            }
                                        })
                                    })
                                }))
                            })
                    })
            })
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
                <AdminMeetingForm meetingData={meetingData} />
            </Popup>
        </section>
    );
};

export default withAuthenticationRequired(AdminCalendar, {
    onRedirecting: () => <Loader />,
})