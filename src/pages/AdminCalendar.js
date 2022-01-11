import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Week, Month, ViewsDirective, ViewDirective, Inject, Day } from '@syncfusion/ej2-react-schedule'
import Loader from '../components/Loader';
import axios from 'axios'
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { Navigate } from 'react-router-dom';

const AdminCalendar = () => {

    const { user, getAccessTokenSilently } = useAuth0()
    const { audience } = useEnv()
    const role = `${audience}/roles`
    const { apiServerUrl } = useEnv()

    const [meetings, setMeetings] = useState([]);
    useEffect(() => {
        // get the calendar data
        const getCalendarData = async () => {
            const token = await getAccessTokenSilently()
            console.log(token)
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
                                    res2Result.map((user, i) => {
                                        res3Result.map((house, j) => {
                                            if (it.userHouse.userId === res2Result[i].userId && it.userHouse.houseId === res3Result[j].houseId) {
                                                setMeetings(prevList => [...prevList, {
                                                    meetingId: it.meetingId,
                                                    houseId: it.userHouse.houseId,
                                                    userId: it.userHouse.userId,
                                                    date: new Date(it.date.concat(' ', it.time)),
                                                    title: "user_name : ".concat(res2Result[i].fullName, "/", " house : ", res3Result[j].name),
                                                }])
                                            }
                                        })
                                    })
                                }))
                            })
                    })
            })
        }
        getCalendarData()

    }, []);
    console.log(meetings)

    // const handleQuery = (event) => {
    //     setSearchQuery(event.target.value);
    // };

    // if logged in user is not admin
    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/" />
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
                    eventSettings={{
                        dataSource: meetings,
                        fields: {
                            Id: 'meetingId',
                            subject: { name: 'title' },
                            content: { name: 'content' },
                            startTime: { name: 'date' },
                            endTime: { name: 'date' },
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
        </section>
    );
};

export default withAuthenticationRequired(AdminCalendar, {
    onRedirecting: () => <Loader />,
})