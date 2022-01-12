import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEnv } from '../context/env.context';
import { useAuth0 } from "@auth0/auth0-react"
import axios from 'axios';

const EditDeposit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState([]);
    const { apiServerUrl } = useEnv()
    const {user,getAccessTokenSilently } = useAuth0()
    const [houseId, setHouseId] = useState('');
    const [userId, setUserId] = useState('');
    const [amount, setAmount] = useState('');
    const [depositDate, setDepositDate] = useState('');
    const [depositTime, setDepositTime] = useState('');
    const [depositNote, setDepositNote] = useState('');

    useEffect(() => {
        const fetchDeposit = async () =>{
            const token = await getAccessTokenSilently();
            await axios.get(`${apiServerUrl}/api/v1/deposits/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
                let data = res.data;
                console.log(data);
                setHouseId(data.userHouse.houseId);
                setUserId(data.userHouse.userId);
                setAmount(data.amount);
                setDepositDate(data.date);
                setDepositTime(data.time);
                setDepositNote(data.note);
            })
            .catch(error => console.log(error));
        }
        fetchDeposit()
    }, []);

    const updateDeposit = async () => {
        const userHouse = {'userId': userId, 'houseId': houseId};   
        console.log(userHouse);
        console.log(amount);
        console.log(depositDate);
        console.log(depositTime);
        console.log(amount);

        const data = {
            userHouse: userHouse,
            amount: amount,
            date: depositDate,
            time: depositTime,
            note: depositNote
        }
        // get access token from users to use api
        const token = await getAccessTokenSilently();
        console.log(token);
        await axios.put(`${apiServerUrl}/api/v1/deposits/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "content-type": "application/json"
            }
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Your Deposit Edit Was Successful!')
                navigate("/auth/admin/viewAllDeposits/");
            }
        })
        .catch(error => console.log(error));
    }

    const cancelEdit = () => {
        navigate("/auth/admin/viewAllDeposits/");
    }
    
    return (
        <div>
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
                                    <small style={{ fontSize: "25px", color: "black" }}>Edit Deposit</small>
                                </div>
                            </Card.Header>
                            <Card.Body className="px-lg-5 py-lg-5">
                                <Form role="form">
                                    <FormGroup className="mb-3">
                                        <Form.Label>House ID:</Form.Label>
                                        <Form.Control name="houseid"
                                            type="houseid"
                                            placeholder="House ID"
                                            value={houseId} 
                                            onChange={(event) => setHouseId(event.target.value)}
                                            />
                                    </FormGroup>

                                    <FormGroup className="mb-3">
                                        <Form.Label>User ID:</Form.Label>
                                        <Form.Control name="userid"
                                            placeholder="User ID"
                                            value={userId}
                                            onChange={(event) => setUserId(event.target.value)}
                                        />
                                    </FormGroup>

                                    <FormGroup className="mb-3">
                                        <Form.Label>Deposit Amount:</Form.Label>
                                        <Form.Control
                                            name="amount"
                                            type="number"
                                            placeholder="Deposit Amount"
                                            value={amount}
                                            onChange={(event) => setAmount(event.target.value)}
                                        />
                                    </FormGroup >

                                    <Row>
                                        <Col>
                                            <FormGroup className="mb-3">
                                                <Form.Label>Deposit Date:</Form.Label>
                                                <Form.Control
                                                    name="Deposited Date"
                                                    placeholder="YYYY-MM-DD"
                                                    value={depositDate}
                                                    onChange={(event) => setDepositDate(event.target.value)}
                                                />
                                            </FormGroup >
                                            <FormGroup className="mb-3">
                                                <Form.Label>Deposit Time:</Form.Label>
                                                <Form.Control
                                                    name="Deposited Time"
                                                    placeholder="HH:MM:SS"
                                                    value={depositTime}
                                                    onChange={(event) => setDepositTime(event.target.value)}
                                                />
                                            </FormGroup >
                                        </Col>
                                    </Row>

                                    <FormGroup className="mb-3">
                                        <Form.Label>Note:</Form.Label>
                                        <Form.Control
                                            className="form-control form-control-lg"
                                            name="Deposit Note"
                                            type="field"
                                            placeholder="Deposit Note"
                                            value={depositNote}
                                            onChange={(event) => setDepositNote(event.target.value)}
                                        />
                                    </FormGroup >

                                    <div>
                                        <div className='row'>
                                            <Button className="my-4" color="primary" type="button" onClick={updateDeposit}> Save Deposit Edit</Button>
                                            <Button className="my-4" color="primary" type="button" onClick={cancelEdit}> Cancel Edit </Button>
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
        </div>
    );
};

export default EditDeposit;