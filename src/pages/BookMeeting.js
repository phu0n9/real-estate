import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { useEnv } from '../context/env.context';
import { Card, Col, Container, Row, Button, Form, FormGroup } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import { UserContext } from '../App';

const BookMeeting = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()
    const role = `${audience}/roles`
    const currentUserId = useContext(UserContext)

    const [hour, setHour] = useState("09")
    const [min, setMin] = useState("00")

    const [meeting, setMeeting] = useState({
        "date": "",
        "time": "",
        "note": "",
        "userId": currentUserId,
        "houseId": ""
    })

    const [house, setHouse] = useState({
        "houseId": "",
        "name": "",
        "address": ""
    })

    useEffect(() => {
        const getHouse = async () => {
            const token = await getAccessTokenSilently()
            await axios.get(`${apiServerUrl}/api/v1/houses/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((res) => {
                    setHouse({
                        houseId: res.data.houseId,
                        name: res.data.name,
                        address: res.data.address
                    })
                    setMeeting({ ...meeting, houseId: res.data.houseId })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getHouse()
    }, [apiServerUrl, getAccessTokenSilently])

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

        // if(!meeting.time){
        //     errors.note = "Must change time";
        // }

        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    const saveMeeting = async () => {
        await axios.post(`${apiServerUrl}/api/v1/meetings?userId=${meeting.userId}&houseId=${meeting.houseId}&date=${moment(meeting.date).format('YYYY-MM-DD')}&time=${hour.concat(":", min)}&note=${meeting.note}`, {
        }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                navigate("/rental");
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
                                    <Form.Label>House Name</Form.Label>
                                    <Form.Control
                                        name="house name"
                                        type="text"
                                        placeholder="House Name"
                                        value={house.name}
                                        readOnly={true} />
                                </FormGroup >

                                <FormGroup className="mb-3">
                                    <Form.Label>House Address</Form.Label>
                                    <Form.Control
                                        name="house address"
                                        type="text"
                                        placeholder="House Address"
                                        value={house.address}
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