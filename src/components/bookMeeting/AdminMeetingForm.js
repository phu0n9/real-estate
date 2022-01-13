import React from 'react';
import { Card, Col, Container, Row, Button, Form, FormGroup } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom';

const AdminMeetingForm = (props) => {

    const navigate = useNavigate();

    const editButton = (e) => {
        e.preventDefault();
        navigate("/auth/admin/adminEditMeeting/" + props.meetingData.meetingId);
    }

    return (
        <Container style={{ width: 800 }}>
            <Row className="justify-content-md-center">
                <Col xs="10" md="9" lg="8" xl="7">
                    <Card className=" shadow border-0">
                        <Card.Header className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-5 mb-3">
                                <small style={{ fontSize: "25px", color: "black" }}>Edit Rental</small>
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
                                                value={props.meetingData.userId} />
                                        </FormGroup >
                                    </Col>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>House Id</Form.Label>
                                            <Form.Control
                                                name="houseId"
                                                type="number"
                                                placeholder="Enter the house Id"
                                                value={props.meetingData.houseId}
                                                readOnly={true} />
                                        </FormGroup >
                                    </Col>
                                </Row>

                                <FormGroup className="mb-3">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        name="userName"
                                        type="text"
                                        placeholder="Enter the user Id"
                                        readOnly={true}
                                        value={props.meetingData.userName} />
                                </FormGroup >

                                <FormGroup className="mb-3">
                                    <Form.Label>House Name</Form.Label>
                                    <Form.Control
                                        name="houseName"
                                        type="text"
                                        placeholder="Enter the user Id"
                                        readOnly={true}
                                        value={props.meetingData.houseName} />
                                </FormGroup >

                                <FormGroup className="mb-3">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        name="houseName"
                                        type="text"
                                        placeholder="Enter the user Id"
                                        readOnly={true}
                                        value={props.meetingData.date} />
                                </FormGroup >

                                <FormGroup className="mb-3">
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control
                                        name="note"
                                        type="text"
                                        placeholder="$"
                                        readOnly={true}
                                        value={props.meetingData.note}
                                        required />
                                </FormGroup >

                                <div className="text-center">
                                    <Button className="my-4" color="primary" type="button" onClick={editButton}>
                                        Edit
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

export default AdminMeetingForm;