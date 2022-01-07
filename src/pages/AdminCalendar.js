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

    // get the calendar data using token
    const { apiServerUrl } = useEnv()
    const [data, setData] = useState([]);
    const getCalendatData = async () => {
        // get access token from users to use api
        const token = await getAccessTokenSilently()
        const response = await axios.get(`${apiServerUrl}/api/v1/meetings`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        // console.log(response.data.date)
        setData(response.data);
    }

    useEffect(() => {
        getCalendatData();
        onEdit()
    }, []);

    // console.log(new Date(data[0].date))
    // console.log(new Date("2022-01-07"))

    const onEdit = () => {
        setData(
            data.map((it) =>
                [{ ...it, date: new Date(it.date.concat(' ', it.time)) }]
            )
        );
    }

    console.log(data)
    // if logged in user is not admin
    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/" />
            </>
        )
    }

    // const [aData, aSetData] = useState([{
    //     meetingId: 1,
    //     note: 'Explosion of Betelgeuse Star',
    //     StartTime: new Date(2021, 11, 12, 9, 30),
    //     EndTime: new Date(2021, 11, 12, 11, 0)
    // }, {
    //     meetingId: 2,
    //     note: 'Thule Air Crash Report',
    //     StartTime: new Date(2021, 11, 15, 12, 0),
    //     EndTime: new Date(2021, 11, 15, 14, 0)
    // }, {
    //     meetingId: 3,
    //     note: 'Thule Air Crash Report',
    //     StartTime: new Date(2021, 11, 18, 12, 0),
    //     EndTime: new Date(2021, 11, 18, 14, 0)
    // }, {
    //     meetingId: 4,
    //     note: 'Explosion of Betelgeuse Star',
    //     StartTime: new Date(2021, 11, 20, 9, 30),
    //     EndTime: new Date(2021, 11, 20, 11, 0)
    // }])

    return (
        <section className="hero d-flex align-items-center">
            <div className="col-lg-10">
                <br />
                <br />
                <br />
                <ScheduleComponent
                    currentView='Month' selectedDate={new Date()} height='850px' style={{ marginLeft: "250px" }} readonly={true}
                    eventSettings={{
                        dataSource: data,
                        fields: {
                            Id: 'meetingId',
                            subject: { name: 'note' },
                            isAllDay: { name: 'IsAllDay' },
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
        </section>
    );
};

export default withAuthenticationRequired(AdminCalendar, {
    onRedirecting: () => <Loader />,
})