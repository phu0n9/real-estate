import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Card, Col, Container, Row, Button, Form, FormGroup } from 'react-bootstrap';
import { useEnv } from '../context/env.context';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import axios from 'axios';
import DatePicker from 'react-datepicker'
import Loader from '../components/Loader';

const EditRental = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()
    const role = `${audience}/roles`

    const [rental, setRental] = useState({
        "userHouse": {
            "userId": '',
            "houseId": ''
        },
        "startDate": '',
        "endDate": '',
        "depositAmount": '',
        "monthlyFee": '',
        "payableFee": ''
    });

    useEffect(() => {
        const fetchRental = async () => {
            const token = await getAccessTokenSilently();
            await axios.get(`${apiServerUrl}/api/v1/rentals/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
                setRental({ ...res.data, startDate: new Date(res.data.startDate), endDate: new Date(res.data.endDate) })
            }).catch(error => console.log(error));
        }

        fetchRental()
    }, []);

    console.log(rental)

    const [showMessage, setShowMessage] = useState(false);
    const [formerrors, setFormErrors] = useState({});

    const validate = () => {
        let errors = {};

        //startDate field
        if (!rental.startDate) {
            errors.startDate = "Start Date is required";
        }

        //endDate field
        if (!rental.endDate) {
            errors.endDate = "End Date is required";
        }

        //depositAmount field
        if (!rental.depositAmount) {
            errors.depositAmount = "depositAmount is required";
        } else if (rental.depositAmount.length < 1) {
            errors.depositAmount = "depositAmount must be more than 8 digits";
        }

        //monthlyFee field
        if (!rental.monthlyFee) {
            errors.monthlyFee = "monthlyFee is required";
        } else if (rental.monthlyFee.length < 1) {
            errors.monthlyFee = "monthlyFee must be more than 8 digits";
        }
        //payableFee field
        if (!rental.payableFee) {
            errors.payableFee = "payableFee is required";
        } else if (rental.payableFee.length < 1) {
            errors.payableFee = "payableFee must be more than 8 digits";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    const saveRental = async () => {
        // get access token from users to use api
        const token = await getAccessTokenSilently();
        console.log(token);
        await axios.put(`${apiServerUrl}/api/v1/rentals/${id}`, rental, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "content-type": "application/json"
            }
        }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                navigate("/auth/admin/viewRentalHouses");
            }
        }).catch(error => console.log(error));
    }

    const deleteRental = async () => {
        // get access token from users to use api
        const token = await getAccessTokenSilently();
        console.log(token);
        await axios.delete(`${apiServerUrl}/api/v1/rentals/${id}`, rental, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "content-type": "application/json"
            }
        }).then((res) => {
            console.log(res)
            if (res.status === 200) {
                navigate("/auth/admin/viewRentalHouses");
            }
        }).catch(error => console.log(error));
    }

    const deleteHandler = () => {
        deleteRental()
    }

    const cancelHandler = () => {
        navigate("/auth/admin/viewRentalHouses");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (validate()) {
            setShowMessage(true)
            saveRental()
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
        <Container style={{ marginTop: 100, marginBottom: 100 }}>
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
                                                value={rental.userHouse.userId} />
                                        </FormGroup >
                                    </Col>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>House Id</Form.Label>
                                            <Form.Control
                                                name="houseId"
                                                type="number"
                                                placeholder="Enter the house Id"
                                                value={rental.userHouse.houseId}
                                                readOnly={true} />
                                        </FormGroup >
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>Start Date</Form.Label>
                                            <DatePicker
                                                required
                                                selected={rental.startDate}
                                                dateFormat='yyyy-MM-dd'
                                                name="startDate"
                                                isClearable
                                                showYearDropdown
                                                scrollableMonthYearDropdown
                                                showMonthDropdown
                                                scrollableYearDropdown
                                                onChange={date => setRental({ ...rental, startDate: date })} />
                                            {formerrors.startDate && (
                                                <p className="text-danger">{formerrors.startDate}</p>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>End Date</Form.Label>
                                            <DatePicker
                                                required
                                                selected={rental.endDate}
                                                dateFormat='yyyy-MM-dd'
                                                name="endDate"
                                                isClearable
                                                showYearDropdown
                                                scrollableMonthYearDropdown
                                                showMonthDropdown
                                                scrollableYearDropdown
                                                onChange={date => setRental({ ...rental, endDate: date })} />
                                            {formerrors.endDate && (
                                                <p className="text-danger">{formerrors.endDate}</p>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup className="mb-3">
                                    <Form.Label>Deposit Amount</Form.Label>
                                    <Form.Control
                                        name="depositAmount"
                                        type="number"
                                        placeholder="$"
                                        onChange={e => setRental({ ...rental, depositAmount: e.target.value })}
                                        value={rental.depositAmount}
                                        required />
                                    {formerrors.depositAmount && (
                                        <p className="text-danger">{formerrors.depositAmount}</p>
                                    )}
                                </FormGroup >

                                <FormGroup className="mb-3">
                                    <Form.Label>Monthly Fee</Form.Label>
                                    <Form.Control
                                        name="monthlyFee"
                                        type="number"
                                        placeholder="$"
                                        onChange={e => setRental({ ...rental, monthlyFee: e.target.value })}
                                        value={rental.monthlyFee}
                                        required />
                                    {formerrors.monthlyFee && (
                                        <p className="text-danger">{formerrors.monthlyFee}</p>
                                    )}
                                </FormGroup >
                                <FormGroup className="mb-3">
                                    <Form.Label>Payable Fee</Form.Label>
                                    <Form.Control
                                        name="payableFee"
                                        type="number"
                                        placeholder="$"
                                        onChange={e => setRental({ ...rental, payableFee: e.target.value })}
                                        value={rental.payableFee}
                                        required />
                                    {formerrors.payableFee && (
                                        <p className="text-danger">{formerrors.payableFee}</p>
                                    )}
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

export default withAuthenticationRequired(EditRental, {
    onRedirecting: () => <Loader />,
})