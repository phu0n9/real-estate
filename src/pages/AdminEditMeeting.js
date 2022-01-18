import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Card, Col, Container, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useEnv } from '../context/env.context';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import Loader from '../components/Loader';
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css"
import * as moment from 'moment'

const AdminEditMeeting = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()
    const role = `${audience}/roles`

    const [hour, setHour] = useState("09")
    const [min, setMin] = useState("00")

    const [meeting, setMeeting] = useState({
        "meetingId": "",
        "userHouse": {
            "userId": "",
            "houseId": ""
        },
        "date": "",
        "time": "",
        "note": ""
    });

    useEffect(() => {
        const fetchRental = async () => {
            const token = await getAccessTokenSilently();
            await axios.get(`${apiServerUrl}/api/v1/meetings/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
                setMeeting({
                    meetingId: res.data.meetingId,
                    userHouse: { userId: res.data.userHouse.userId, houseId: res.data.userHouse.houseId },
                    date: new Date(res.data.date),
                    time: res.data.time,
                    note: res.data.note
                })
            }).catch(error => console.log(error));
        }
        fetchRental()
    }, []);

    console.log(meeting)

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
            errors.endDate = "Time is required";
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
        console.log(meeting)
        await axios.post(`${apiServerUrl}/api/v1/meetings?meetingId=${meeting.meetingId}&userId=${meeting.userHouse.userId}&houseId=${meeting.userHouse.houseId}&date=${moment(meeting.date).format('YYYY-MM-DD')}&time=${meeting.time}&note=${meeting.note}`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                navigate("/auth/admin/calendar");
            }
        }).catch(error => console.log(error));
    }

    const deleteMeeting = async () => {
        // get access token from users to use api
        const token = await getAccessTokenSilently();
        await axios.delete(`${apiServerUrl}/api/v1/meetings/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "content-type": "application/json"
            }
        }).then((res) => {
            if (res.status === 200) {
                navigate("/auth/admin/calendar");
            }
        }).catch(error => console.log(error));
    }

    const deleteHandler = () => {
        deleteMeeting()
    }

    const cancelHandler = () => {
        navigate("/auth/admin/calendar");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (validate()) {
            setShowMessage(true)
            console.log(meeting)
            saveMeeting()
        } else {
            setShowMessage(false);
        }
    }

    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/unauthorized" />
            </>
        )
    }

    return (
        <Container style={{ width: 800, marginTop: 100, marginBottom: 100 }}>
            <Row className="justify-content-md-center">
                <Col xs="10" md="9" lg="8" xl="7">
                    <Card className=" shadow border-0">
                        <Card.Header className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-5 mb-3">
                                <small style={{ fontSize: "25px", color: "black" }}>Edit Meeting</small>
                            </div>
                        </Card.Header>
                        <Card.Body className="px-lg-5 py-lg-5">
                            <Form role="form">
                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>User Id</Form.Label>
                                            <Form.Control
                                                name="userId"
                                                type="number"
                                                placeholder="Enter the user Id"
                                                readOnly={true}
                                                value={meeting.userHouse.userId} />
                                        </FormGroup >
                                    </Col>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>House Id</Form.Label>
                                            <Form.Control
                                                name="houseId"
                                                type="number"
                                                placeholder="Enter the house Id"
                                                value={meeting.userHouse.houseId}
                                                readOnly={true} />
                                        </FormGroup >
                                    </Col>
                                </Row>
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
                                        onChange={date => setMeeting({ ...meeting, date: date })} />
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
                                        placeholder="write what "
                                        value={meeting.note}
                                        readOnly={true}
                                        required />
                                </FormGroup >

                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="button" onClick={submitHandler}>
                                        Edit
                                    </Button>
                                    <Row>
                                        <Col>
                                            <Button className="my-4" variant="danger" type="button" onClick={deleteHandler}>
                                                Delete
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button className="my-4" variant="secondary" type="button" onClick={cancelHandler}>
                                                Cancel
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container >
    );
};

export default withAuthenticationRequired(AdminEditMeeting, {
    onRedirecting: () => <Loader />,
})