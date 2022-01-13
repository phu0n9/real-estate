import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { Grid } from '@material-ui/core'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEnv } from '../../context/env.context';
import { useAuth0 } from "@auth0/auth0-react"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const DeleteMeetingForm = ({ form }) => {
    const { apiServerUrl } = useEnv()
    const { getAccessTokenSilently } = useAuth0()
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        meetingId: "",
    });

    const [showMessage, setShowMessage] = useState(false);
    const [formerrors, setFormErrors] = useState({});
    const validate = () => {
        let errors = {};

        //meetingId field
        if (!details.meetingId) {
            errors.meetingId = "Meeting Id is required";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    const deleteCalendarData = async () => {
        const token = await getAccessTokenSilently()
        await axios.delete(`${apiServerUrl}/api/v1/meetings/${details.meetingId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        navigate("/auth/admin/calendar")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate(details)) {
            setShowMessage(true);
            deleteCalendarData()
            form(false)
        }
    }

    return (
        <Container style={{ width: 800 }}>
            <Row className="justify-content-md-center">
                <Col xs="10" md="9" lg="8" xl="7">
                    <Card className=" shadow border-0">
                        <Card.Body className="px-lg-5 py-lg-5">
                            <Form role="form">
                                <FormGroup className="mb-3" style={{ marginTop: 50 }}>
                                    <Form.Label>Meeting Id</Form.Label>
                                    <Form.Control
                                        name="meetingId"
                                        type="number"
                                        placeholder="Please enter the meetingId"
                                        onChange={e => setDetails({ ...details, meetingId: e.target.value })}
                                        value={details.meetingId}
                                        required />
                                    {formerrors.meetingId && (
                                        <p className="text-danger">{formerrors.meetingId}</p>
                                    )}
                                </FormGroup >
                                <Form.Label style={{ color: "red" }}>*Meeting Id can be found in the calendar*</Form.Label>

                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="button" onClick={handleSubmit}>
                                        Delete
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

export default DeleteMeetingForm;