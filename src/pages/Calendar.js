import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Week, Month, ViewsDirective, ViewDirective, Inject, Day } from '@syncfusion/ej2-react-schedule'
import Loader from '../components/Loader'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEnv } from '../context/env.context';
import axios from 'axios';


const Calendar = () => {
    const { getAccessTokenSilently } = useAuth0()

    // get the calendar data using token
    const { apiServerUrl } = useEnv()
    const [data, setData] = useState([]);
    const getCalendatData = async () => {
        // get access token from users to use api
        const token = await getAccessTokenSilently()
        console.log(token)

        const response = await axios.get(`${apiServerUrl}/api/v1/meetings/search/byUser/{userId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        setData(response.data);
    }

    useEffect(() => {
        getCalendatData();
    }, []);

    // const [data, setData] = useState([{
    //     Id: 1,
    //     Subject: 'Explosion of Betelgeuse Star',
    //     StartTime: new Date(2021, 11, 12, 9, 30),
    //     EndTime: new Date(2021, 11, 12, 11, 0)
    // }, {
    //     Id: 2,
    //     Subject: 'Thule Air Crash Report',
    //     StartTime: new Date(2021, 11, 15, 12, 0),
    //     EndTime: new Date(2021, 11, 15, 14, 0)
    // }, {
    //     Id: 3,
    //     Subject: 'Thule Air Crash Report',
    //     StartTime: new Date(2021, 11, 18, 12, 0),
    //     EndTime: new Date(2021, 11, 18, 14, 0)
    // }, {
    //     Id: 4,
    //     Subject: 'Explosion of Betelgeuse Star',
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
                            id: 'Id',
                            subject: { name: 'Subject' },
                            isAllDay: { name: 'IsAllDay' },
                            startTime: { name: 'StartTime' },
                            endTime: { name: 'EndTime' }
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

export default withAuthenticationRequired(Calendar, {
    onRedirecting: () => <Loader />,
})