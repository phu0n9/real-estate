import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Week, Month, ViewsDirective, ViewDirective, Inject, Day } from '@syncfusion/ej2-react-schedule'
import Loader from '../components/Loader'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEnv } from '../context/env.context';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Popup from '../components/popup/Popup';
import UserMeetingForm from '../components/bookMeeting/UserMeetingForm';

const Calendar = () => {
    const { getAccessTokenSilently, user } = useAuth0()
    const { apiServerUrl, audience } = useEnv()
    const role = `${audience}/roles`
    const [meetings, setMeetings] = useState([]);
    const currentUserId =
        user.sub.length < 21
            ? user.sub.substring(user.sub.lastIndexOf("|") + 1, user.sub.length)
            : Math.trunc(
                user.sub.substring(
                    user.sub.lastIndexOf("|") + 1,
                    user.sub.length
                ) / 10000
            );

    useEffect(() => {
        // get the calendar data
        const getCalendarData = async () => {
            let cnt = 0
            const token = await getAccessTokenSilently()
            await axios.get(`${apiServerUrl}/api/v1/meetings/search/byUser/${currentUserId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {  // after fetched all meeting data, get the user data using userId in meeting data
                Promise.all(res.data.content.map(i =>
                    fetch(`${apiServerUrl}/api/v1/houses/${i.userHouse.houseId}`)
                )).then(res2 => Promise.all(res2.map(r => r.json())))
                    .then(result => {
                        console.log(res.data)
                        Promise.all(res.data.content.map((it, i) => {
                            if (it.userHouse.houseId === result[i].houseId) {
                                setMeetings(prevList => [...prevList, {
                                    meetingId: it.meetingId,
                                    houseId: it.userHouse.houseId,
                                    houseName: result[i].name,
                                    userId: it.userHouse.userId,
                                    note: it.note,
                                    date: new Date(it.date.concat(' ', it.time)),
                                    title: result[i].name,
                                }])
                            }
                        Promise.all(res.data.content.map((it) => {
                            cnt = 0
                            result.map((i) => {
                                if (it.userHouse.houseId === i.houseId) {
                                    cnt += 1
                                    if (cnt === 1) {
                                        setMeetings(prevList => [...prevList, {
                                            meetingId: it.meetingId,
                                            houseId: it.userHouse.houseId,
                                            houseName: i.name,
                                            userId: it.userHouse.userId,
                                            note: it.note,
                                            date: new Date(it.date.concat(' ', it.time)),
                                            title: i.name,
                                        }])
                                    } else {
                                        cnt = 0
                                    }
                                }
                            })
                        })
                        )
                    })
            })
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
    if (user[role].length !== 0) {
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
