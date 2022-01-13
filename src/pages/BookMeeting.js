import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { useEnv } from '../context/env.context';
import { Card, Col, Container, Row, Button, Form, FormGroup } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookMeeting = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()
    const role = `${audience}/roles`

    const [nowUser, setNowUser] = useState({})

    useEffect(() => {
        // get the calendar data
        const getUserData = async () => {
            const token = await getAccessTokenSilently();
            // if userid is bigger than 21, they use oauth2
            const currentUserId =
                user.sub.length < 21
                    ? user.sub.substring(user.sub.lastIndexOf("|") + 1, user.sub.length)
                    : Math.trunc(
                        user.sub.substring(
                            user.sub.lastIndexOf("|") + 1,
                            user.sub.length
                        ) / 10000
                    );
            const getData = await axios.get(`${apiServerUrl}/api/v1/users/${currentUserId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setNowUser(getData);
        }

        getUserData()

    }, []);
    console.log(nowUser)
    const [meeting, setMeeting] = useState({
        "userHouse": {
            "userId": nowUser.userId,
            "houseId": id
        },
        "date": "",
        "time": "",
        "note": ""
    });

    const [showMessage, setShowMessage] = useState(false);
    const [formerrors, setFormErrors] = useState({});

    const validate = () => {
        let errors = {};
        //date field
        if (!meeting.date) {
            errors.date = "Date is required";
        }
        //time field
        if (!meeting.time) {
            errors.time = "Time is required";
        }

        //Note field
        if (!meeting.note) {
            errors.note = "Note is required";
        }

        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    };


    const saveMeeting = async () => {
        // get access token from users to use api
        const token = await getAccessTokenSilently();
        await axios.post(`${apiServerUrl}/api/v1/meetings`, meeting, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "content-type": "application/json"
            }
        }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                navigate("/auth/admin/calendar");
            }
        }).catch(error => console.log(error));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (validate()) {
            setShowMessage(true)
            saveMeeting()
        } else {
            setShowMessage(false);
        }
    }

    return (
        <Container style={{ width: 800, marginTop: 100, marginBottom: 100 }}>
            <Row className="justify-content-md-center">
                <Col xs="10" md="9" lg="8" xl="7">
                    <Card className=" shadow border-0">
                        <Card.Header className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-5 mb-3">
                                <small style={{ fontSize: "25px", color: "black" }}>Creating the Meeting</small>
                            </div>
                        </Card.Header>
                        <Card.Body className="px-lg-5 py-lg-5">
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <Form.Label>House Id</Form.Label>
                                    <Form.Control
                                        name="houseId"
                                        type="number"
                                        placeholder="Enter the house Id"
                                        value={meeting.userHouse.houseId}
                                        readOnly={true} />
                                </FormGroup >
                                <FormGroup className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <DatePicker
                                        required
                                        selected={meeting.date}
                                        dateFormat='yyyy-MM-dd'
                                        name="date"
                                        isClearable
                                        showYearDropdown
                                        scrollableMonthYearDropdown
                                        showMonthDropdown
                                        scrollableYearDropdown
                                        onChange={date => setMeeting({ ...meeting, date: new Date(date) })} />
                                    {formerrors.date && (
                                        <p className="text-danger">{formerrors.date}</p>
                                    )}
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Form.Label>Time</Form.Label>
                                    <br />
                                    <TimePicker
                                        required
                                        value={meeting.time}
                                        format='hh:mm'
                                        name="time"
                                        disableClock={true}
                                        inputReadOnly={true}
                                        onChange={date => setMeeting({ ...meeting, time: date })} />
                                    {formerrors.time && (
                                        <p className="text-danger">{formerrors.time}</p>
                                    )}
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control
                                        name="note"
                                        type="text"
                                        placeholder="Writing the note for admin "
                                        value={meeting.note}
                                        onChange={e => setMeeting({ ...meeting, note: e.target.value })}
                                        required />
                                    {formerrors.note && (
                                        <p className="text-danger">{formerrors.note}</p>
                                    )}
                                </FormGroup >

                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="button" onClick={submitHandler}>
                                        Save
                                    </Button>
                                </div>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default withAuthenticationRequired(BookMeeting, {
    onRedirecting: () => <Loader />,
});