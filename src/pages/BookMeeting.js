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
import * as moment from 'moment'

const BookMeeting = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()
    const role = `${audience}/roles`

    const [hour, setHour] = useState("09")
    const [min, setMin] = useState("00")

    const [meeting, setMeeting] = useState({
        "userHouse": {
            "userId": "",
            "houseId": ""
        },
        "date": "",
        "time": "",
        "note": ""
    });

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
            await axios.get(`${apiServerUrl}/api/v1/users/${currentUserId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
                setMeeting({ userHouse: { userId: res.data.userId, houseId: id } })
            })
        }

        getUserData()

    }, []);

    const [showMessage, setShowMessage] = useState(false);
    const [formerrors, setFormErrors] = useState({});

    const validate = () => {
        let errors = {};
        //date field
        if (!meeting.date) {
            errors.date = "Date is required";
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
        console.log(meeting)
        const token = await getAccessTokenSilently();
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "content-type",
            "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS",
            "Authorization": `Bearer ${token}`
        };
        await axios.post(`${apiServerUrl}/api/v1/meetings`, {
            headers: headers,
            params: {
                "userId": meeting.userHouse.userId,
                "houseId": meeting.userHouse.houseId,
                "date": moment(meeting.date).format('YYYY-MM-DD'),
                "time": hour.concat(":", min),
                "note": meeting.note
            }
        }).then((res) => {
            console.log(res)
            // if (res.status === 200) {
            //     navigate("/auth/admin/calendar");
            // }
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
                                        // isClearable
                                        showYearDropdown
                                        scrollableMonthYearDropdown
                                        showMonthDropdown
                                        scrollableYearDropdown
                                        onChange={date => setMeeting({ ...meeting, date: new Date(date) })} />
                                    {formerrors.date && (
                                        <p className="text-danger">{formerrors.date}</p>
                                    )}
                                </FormGroup>

                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>Time (hours)</Form.Label>
                                            <Form.Select aria-label="house-type-select"
                                                name="hour"
                                                value={hour}
                                                onChange={e => setHour(e.target.value)}
                                                required>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                {formerrors.hour && (
                                                    <p className="text-danger">{formerrors.hour}</p>
                                                )}
                                            </Form.Select>
                                        </FormGroup >
                                    </Col>

                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>Time (minutes)</Form.Label>
                                            <Form.Select aria-label="house-type-select"
                                                name="min"
                                                value={min}
                                                onChange={e => setMin(e.target.value)}
                                                required>
                                                <option value="00">00</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="30">30</option>
                                                <option value="40">40</option>
                                                <option value="50">50</option>
                                                {formerrors.min && (
                                                    <p className="text-danger">{formerrors.min}</p>
                                                )}
                                            </Form.Select>
                                        </FormGroup >
                                    </Col>
                                </Row>

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