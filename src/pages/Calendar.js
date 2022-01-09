import React, { useEffect, useState } from 'react';
import { ScheduleComponent, Week, Month, ViewsDirective, ViewDirective, Inject, Day } from '@syncfusion/ej2-react-schedule'
import Loader from '../components/Loader'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEnv } from '../context/env.context';
import axios from 'axios';

const Calendar = () => {
    const { getAccessTokenSilently,user} = useAuth0()
    
    // get the calendar data using token
    const { apiServerUrl } = useEnv()

    const [meetings, setMettings] = useState([]);
    const getCalendatData = async () => {
        // get access token from users to use api
        const token = await getAccessTokenSilently()
        console.log(token)

        await axios.get(`${apiServerUrl}/api/v1/meetings/search/byUser/1`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setMettings(
                res.data.content.map((it) => (
                    {
                        meetingId: it.meetingId,
                        date: new Date(it.date.concat(' ', it.time)),
                        title: "".concat(getHouseData(it.userHouse.houseId))
                    })
                ))
        })
        // setData(response.data);
    }

    // get the house data using token
    const getHouseData = async (e) => {
        // get access token from users to use api
        const token = await getAccessTokenSilently()
        await axios.get(`${apiServerUrl}/api/v1/houses/${e}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            return res.data.name
        })
    }

    useEffect(() => {
        getCalendatData();
    }, []);

    return (
        <section className="hero d-flex align-items-center">
            <div className="col-lg-10">
                <br />
                <br />
                <br />
                <ScheduleComponent
                    currentView='Month' selectedDate={new Date()} height='850px' style={{ marginLeft: "250px" }} readonly={true}
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
        </section>
    );
};

export default withAuthenticationRequired(Calendar, {
    onRedirecting: () => <Loader />,
})