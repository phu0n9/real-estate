import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Form, FormGroup } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useEnv } from '../../context/env.context';
import { useAuth0 } from "@auth0/auth0-react"

const MeetingForm = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState([]);
    const { apiServerUrl } = useEnv()
    const { user,getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        const fetchUsers = async () =>{
            const token = await getAccessTokenSilently()
            let userId = user.sub.substring(user.sub.lastIndexOf("|")+1,user.sub.length)
            await axios.get(`${apiServerUrl}/api/v1/users/${userId}`,{
                headers: {
                    authorization: `Bearer ${token}`    
                }
            })
            .then((res)=>{setCurrentUser(res.data)})
            .catch((error)=>{console.error(error)})
        }
        fetchUsers()
    }, []);

    return (
        <Container>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Row className="justify-content-md-center">
                <Col xs="10" md="9" lg="8" xl="7">
                    <Card className=" shadow border-0">
                        <Card.Header className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-5 mb-3">
                                <small style={{ fontSize: "25px", color: "black" }}>Meeting Form</small>
                            </div>
                        </Card.Header>
                        <Card.Body className="px-lg-5 py-lg-5">
                            <Form role="form">
                                <FormGroup className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={currentUser.email} />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control name="fullName"
                                        placeholder="Full name"
                                        value={currentUser.fullName}
                                    />
                                </FormGroup>

                                <FormGroup className="mb-3">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        name="phoneNumber"
                                        type="number"
                                        placeholder="Phone number"
                                        value={currentUser.phoneNumber}
                                    />
                                </FormGroup >

                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>Is this a contract meeting?</Form.Label>
                                            <Form.Select name="gender">
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </Form.Select>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>Select Meeting Day</Form.Label>
                                            <DatePicker
                                                required
                                                selected={currentUser.dob}
                                                maxDate={new Date()}
                                                dateFormat='yyyy-MM-dd'
                                                name="dob"
                                                isClearable
                                                showYearDropdown
                                                scrollableMonthYearDropdown
                                                showMonthDropdown
                                                scrollableYearDropdown
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <div className="text-center">
                                    <div className='row'>
                                        <Button className="my-4" color="primary" type="button">
                                            Submit Meeting Request
                                        </Button>
                                        <Button className="my-4" color="primary" type="button">
                                            Cancel Request
                                        </Button>
                                    </div>
                                </div>
                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
        </Container >
    );
};

export default MeetingForm;