import React,{ useState } from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HouseItemCard from '../components/HouseItemCard';
import Form from 'react-bootstrap/Form'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from 'react-bootstrap/Button'
import Pagination from 'react-bootstrap/Pagination'
import Footer from '../components/Footer'

const Rental = () => {
    let pagination = [];
    const [houses, setHouses] = useState([]);
    const [price, setPrice] = React.useState([0, 900000]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [pageNum, setPageNum] = useState(1);
    const [sortParam, setSortParam] = useState('');
    const [currentQuery, setCurrentQuery] = useState(0);

    // Handle Value States
    function valuetext(value) {
        return `$${value}`;
    }
  
    const handlePriceChange = (event, newValue) => {
        setPrice(newValue);
    };

    const handleSort = (event) => {
        setSortParam(event.target.value);
    };

    const handleQuery = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle Queries
    const handleSearchQuery = () => {
        console.log(sortParam)
        axios.get(`http://localhost:8081/api/v1/houses/search?query=${searchQuery}&pageNo=${pageNum}&sortBy=${sortParam}`)
            .then((res) => {
                let content = res.data.content
                setHouses(content);
            });
        setCurrentQuery(0)
        setPageNum(1)
    };

    const handleSearchPrice = () => {
        axios.get(`http://localhost:8081/api/v1/houses/search/byPriceBetween?low=${price[0]}&high=${price[1]}&pageNo=${pageNum}&sortBy=${sortParam}`)
            .then((res) => {
                let content = res.data.content
                setHouses(content);
            });
        setCurrentQuery(1)
        setPageNum(1)
    };

    const handlePageChange = (event) => {
        let page = event.target.getAttribute("value");
        if (currentQuery === 1) {
            axios.get(`http://localhost:8081/api/v1/houses/search?query=${searchQuery}&pageNo=${page}&sortBy=${sortParam}`)
            .then((res) => {
                let content = res.data.content
                setHouses(content);
            });
        }
        else {
            axios.get(`http://localhost:8081/api/v1/houses/search/byPriceBetween?low=${price[0]}&high=${price[1]}&pageNo=${page}&sortBy=${sortParam}`)
            .then((res) => {
                let content = res.data.content
                setHouses(content);
            });
        }
        setPageNum(page);
    }

    // Set Pagination Bar
    for (let number = 1; number <= 20; number++) {
        pagination.push(
            <Pagination.Item key={number} value={number} onClick={handlePageChange}>
            {number}
            </Pagination.Item>,
        );
    }

    return (
        <div>
            <br />
            <br />
            <div style={{ position: "relative", width: "90%", padding: "10px 20px", margin: "0 auto", letterSpacing: "-.2px", boxShadow: "5px 10px 8px #888888" }}>
                <div style={{ paddingLeft: "110px" }}>
                    <h2>
                        View All House Listing
                    </h2>
                    <div>
                        <Container>
                            <Row>
                                <Col xs={2} md={2} lg={5}>
                                    <Form.Label>Search Bar</Form.Label>
                                    <input type="text" value={searchQuery} style={{width: 500}} onChange={handleQuery} placeholder='Search Bar'/>
                                   
                                </Col>  
                                <Col xs={2} md={2} lg={2.5}>
                                    <Button style={{height: 50, width: 150, marginTop: 20}} variant="secondary" onClick={handleSearchQuery}>Search By Query</Button>{' '}
                                </Col>
                                <Col xs={2} md={2} lg={2}>
                                    <Form.Label>Price Range</Form.Label>
                                    <Box sx={{ width: 180 }}>
                                        <Slider
                                            getAriaLabel={() => 'Price Range'}
                                            value={price}
                                            max={900000}
                                            onChange={handlePriceChange}
                                            valueLabelDisplay="auto"
                                            getAriaValueText={valuetext}
                                        />
                                    </Box>
                                </Col>
                                <Col xs={2} md={2} lg={3}>
                                    <Button style={{height: 50, width: 150, marginTop: 20}} variant="secondary" onClick={handleSearchPrice}>Search By Price</Button>{' '}
                                </Col>
                                <Col xs={2} md={2} lg={4}>
                                    <Form.Label>Sort Houses By</Form.Label>
                                    <Form.Select aria-label="house-type-select" value={sortParam} onChange={handleSort}>
                                        <option value="">Default Sort</option>
                                        <option value="name">Name</option>
                                        <option value="price">Price</option>
                                        <option value="type">Type of House</option>
                                        <option value="numberOfBeds">Numbers of Beds</option>
                                        <option value="squareFeet">Square Feets</option>
                                        <option value="status">Status</option>
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <br/>
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
                                {pagination}    
                            </Pagination>
                        </Row>
                    </Container>
                </div>
            </div>
            <br/>
            <Footer/>
        </div>
    );
};

export default Rental;