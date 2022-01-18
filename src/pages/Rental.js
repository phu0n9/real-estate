import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HouseItemCard from '../components/HouseItemCard';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
import Footer from '../components/Footer'
import { useEnv } from '../context/env.context'

const Rental = () => {


    const [pagination, setPagination] = useState([])
    const { apiServerUrl } = useEnv()
    const [houses, setHouses] = useState([]);                           // Setting current list of houses
    const [price, setPrice] = React.useState([0, 1000]);                // Price Range
    const [searchQuery, setSearchQuery] = useState('');                 // Search Bar Query
    const [pageNum, setPageNum] = useState(1);
    const [currentQuery, setCurrentQuery] = useState(0);
    const [contentState, setContentState] = useState('Not Searched');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [status, setStatus] = useState({ available: false, reserved: false, rented: false });
    const [type, setType] = useState({ apartment: false, serviced: false, street: false });
    const [statusArr, setStatusArr] = useState([]);
    const [typeArr, setTypeArr] = useState([]);
    const [sortParam, setSortParam] = useState('');
    const handleQuery = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        const getData = async () => {
            await axios.get(`${apiServerUrl}/api/v1/houses/random/6`)
                .then((res) => {
                    let content = res.data;
                    setHouses(content);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getData();
    }, []);

    const handeCheck = (checkbox) => {
        let temp = false;
        switch (checkbox) {
            case 'available':
                temp = !status.available;
                setStatus({ ...status, available: temp });
                break
            case 'reserved':
                temp = !status.reserved;
                setStatus({ ...status, reserved: temp });
                break
            case 'rented':
                temp = !status.rented;
                setStatus({ ...status, rented: temp });
                break
            case 'apartment':
                temp = !type.apartment;
                setType({ ...type, apartment: temp });
                break
            case 'serviced':
                temp = !type.serviced;
                setType({ ...type, serviced: temp });
                break
            case 'street':
                temp = !type.street;
                setType({ ...type, street: temp });
                break
        }
    };

    const insertChecked = () => {
        if (status.available === true) statusArr.push('available');
        if (status.reserved === true) statusArr.push('reserved');
        if (status.rented === true) statusArr.push('rented');
        if (type.apartment === true) typeArr.push('apartment');
        if (type.serviced === true) typeArr.push('serviced');
        if (type.street === true) typeArr.push('street');
    }

    const searchHouse = () => {
        setStatusArr([]);
        setTypeArr([]);
        insertChecked();
        let content = [];
        const data = {
            city: city,
            district: district,
            priceFrom: price[0],
            priceTo: price[1],
            statusList: statusArr,
            typeList: typeArr,
            query: searchQuery
        }

        axios.post(`${apiServerUrl}/api/v1/houses/search/form?orderBy=asc&pageNo=${pageNum}`, data)
            .then((res) => {
                content = res.data;
                setHouses(content.content);

                // Set Pagination
                if (content.totalPages === 1) setPagination([1]);
                else {
                    for (let i = 1; i <= content.totalPages; i++)
                        pagination.push(i);
                }

                if (content.length === 0) {
                    console.log("No Result");
                    setContentState('No Result');
                }
                else
                    setContentState('');
            })
            .catch(error => console.log(error));
    }

    const handlePageChange = (event) => {
        let page = event.target.getAttribute("value");
        setPageNum(page);
        searchHouse();
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <div style={{ position: "relative", width: "90%", padding: "10px 20px", margin: "0 auto", letterSpacing: "-.2px", boxShadow: "5px 10px 8px #888888" }}>
                <div style={{ paddingLeft: "110px" }}>
                    <h2>
                        You can find amazing rental houses here!
                    </h2>
                    <br />
                    <div>
                        <Container>
                            <Row>
                                <Col xs={2} md={2} lg={3}>
                                    <Form.Label>City</Form.Label>
                                    <Form.Select aria-label="house-type-select" value={city} onChange={(event) => setCity(event.target.value)}>
                                        <option value=""></option>
                                        <option value="Hanoi">Ha Noi</option>
                                        <option value="Saigon">Ho Chi Minh</option>
                                    </Form.Select>
                                </Col>

                                <Col xs={2} md={2} lg={3}>
                                    <Form.Label>District</Form.Label>
                                    {city === 'Hanoi' ? (
                                        <Form.Select aria-label="district-select" value={district} onChange={(event) => setDistrict(event.target.value)}>
                                            <option value=""></option>
                                            <option value="Ba Dinh">Ba Dinh</option>
                                            <option value="Dong Da">Dong Da</option>
                                            <option value="Cau Giay">Cau Giay</option>
                                        </Form.Select>
                                    ) : (
                                        city === 'Saigon' ? (
                                            <Form.Select aria-label="district-select" value={district} onChange={(event) => setDistrict(event.target.value)}>
                                                <option value=""></option>
                                                <option value="1">District 1</option>
                                                <option value="4">District 4</option>
                                                <option value="7">District 7</option>
                                                <option value="10">District 10</option>
                                            </Form.Select>
                                        ) : (
                                            <Form.Select aria-label="district-select" value={district} onChange={(event) => setDistrict(event.target.value)}>
                                                <option value=""></option>
                                            </Form.Select>
                                        )
                                    )}
                                </Col>
                                <Col xs={2} md={2} lg={3}>
                                    <Form.Label>Search Bar</Form.Label>
                                    <br />
                                    <input type="text" value={searchQuery} style={{ width: 280, height: 38 }} onChange={handleQuery} placeholder='Search Bar' />

                                </Col>
                                <Col xs={2} md={2} lg={3}>
                                    <Button style={{ height: 40, width: 100, marginTop: 31 }} variant="primary" onClick={searchHouse}>Search</Button>{' '}
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col xs={2} md={2} lg={3}>
                                    <Form.Label>House Status:</Form.Label>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Available" onChange={e => { handeCheck('available') }} />
                                        <Form.Check type="checkbox" label="Reserved" onChange={e => { handeCheck('reserved') }} />
                                        <Form.Check type="checkbox" label="Rented" onChange={e => { handeCheck('rented') }} />
                                    </Form.Group>
                                </Col>

                                <Col xs={2} md={2} lg={3}>
                                    <Form.Label>House Type:</Form.Label>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="Apartment" onChange={e => { handeCheck('apartment') }} />
                                        <Form.Check type="checkbox" label="Serviced" onChange={e => { handeCheck('serviced') }} />
                                        <Form.Check type="checkbox" label="Street" onChange={e => { handeCheck('street') }} />
                                    </Form.Group>
                                </Col>

                                <Col xs={2} md={2} lg={3}>
                                    <Form.Label>Price Range:</Form.Label>
                                    <Form.Group className="mb-3" controlId="formBasicRadio">
                                        <Form.Check
                                            type="radio"
                                            checked={price[0] === 200 && price[1] === 400}
                                            onChange={e => { setPrice([200, 400]) }}
                                            label="Under $400" />
                                        <Form.Check
                                            type="radio"
                                            checked={price[0] === 400 && price[1] === 800}
                                            onChange={e => { setPrice([400, 800]) }}
                                            label="$400 - $800" />
                                        <Form.Check
                                            type="radio"
                                            checked={price[0] === 800 && price[1] === 1000}
                                            onChange={e => { setPrice([800, 1000]) }}
                                            label="$800 - $1000" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <br />
                    <h5>
                        {contentState === 'Not Searched' ? 'Houses You May Be Interested In:' : contentState === 'No Result' ? 'There are no houses that match your query. Please try something else.' : ''}
                    </h5>
                    <br />
                    <Container>
                        <Row>
                            {houses.map((house) => (
                                <Col xs={2} md={2} lg={4}>
                                    <HouseItemCard key={house.houseId} houses={house} />
                                </Col>
                            ))}
                        </Row>
                        <br />
                        <Row>
                            <Pagination>
                                {pagination.map((page) => (
                                    <Pagination.Item key={page} value={page} active={page === pageNum} onClick={handlePageChange}>
                                        {page}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </Row>
                    </Container>
                </div>
            </div>
            <br />
            <Footer />
        </div>
    );
};

export default Rental;