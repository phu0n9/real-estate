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

    // get the calendar data using token
    const [meetings, setMettings] = useState([]);

    useEffect(() => {
        // get the user data using token
    const getUserData = async (e) => {
        // get access token from users to use api
        const token = await getAccessTokenSilently()
        await axios.get(`${apiServerUrl}/api/v1/users/${e}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            return res.data.fullName
            // setUsers(res.data.fullName)
        })
        .catch((err)=>{console.log(err)})
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
        .catch((err)=>{console.log(err)})
    }
    const getCalendarData = async () => {
        // get access token from users to use api
        const token = await getAccessTokenSilently()
        await axios.get(`${apiServerUrl}/api/v1/meetings`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            // setMettings(
            //     res.data.map((it) => (
            //         {
            //             meetingId: it.meetingId,
            //             date: new Date(it.date.concat(' ', it.time)),
            //             title: "".concat(getHouseData(it.userHouse.houseId), "\n", getUserData(it.userHouse.userId))
            //         })
            //     ))
            setMettings(res.data)
        })
        .catch((err)=>{console.log(err)})
    }
    console.log(meetings)
    getCalendarData()
    }, [getAccessTokenSilently,apiServerUrl]);

    console.log(meetings)


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

export default withAuthenticationRequired(AdminCalendar, {
    onRedirecting: () => <Loader />,
})