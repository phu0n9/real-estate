import React, { useState, useEffect } from 'react'
import '../stylesheet/addHouse/form-control.css'
import axios from 'axios'
import { useEnv } from '../context/env.context'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"
import { Card, Col, Container, Row, Button, Form, FormGroup,DropdownButton, Dropdown } from 'react-bootstrap';

export default function HouseForm({ pageTitle }) {
    const { getAccessTokenSilently } = useAuth0()
    const [houses,setHouses] = useState({
        "name":"",
        "price":0,
        "description":"",
        "address": "",
        "type":"appartment",
        "status":"available",
        "numberOfBeds":0,
        "squareFeet":0,
        "image":[],
        "city":"Saigon",
        "district":1
    })

    let districtList = houses.city === "Saigon" ? ["1","4","7","10"] : ["Ba Dinh","Cau Giay","Dong Da"]
    const [citySelected,setCitySelected] = useState(false)

    const { id } = useParams();
    const [checked, setChecked] = useState(true)
    const [imageURL, setImageURL] = useState([])

    const { apiServerUrl } = useEnv()

    let navigate = useNavigate()

    const handleChange = (e) => {
        const files = Array.from(e.target.files)
        setHouses({...houses,image: files})
    }

    useEffect(() => {
        if (id != null) {
            const fetchHouse = async () => {
                const token = await getAccessTokenSilently()
                await axios.get(`${apiServerUrl}/api/v1/houses/${id}`)
                    .then((res) => {
                        setHouses({
                            name: res.data.name,
                            price: res.data.price,
                            description: res.data.description,
                            address: res.data.address,
                            type: res.data.type,
                            status: res.data.status,
                            numberOfBeds: res.data.numberOfBeds,
                            squareFeet: res.data.squareFeet,
                            image: res.data.image,
                            city: res.data.location.city,
                            district: res.data.location.district
                        })
                    })
                    .catch((err) => { console.log(err) })
            }
            fetchHouse()
        }
    }, [id, apiServerUrl, getAccessTokenSilently])

    const handleCheck = (e) => {
        setChecked(!checked)
        if (e.target.checked) {
            setImageURL(oldImg => [...oldImg, e.target.value])
        }
        else {
            setImageURL(imageURL.filter(item => item !== e.target.value))
        }
    }

    console.log(houses)

    const submitBtnOnClick = async () => {
        const formData = new FormData()
        houses.image.forEach(file => {
            formData.append('files', file)
        })
        
        formData.append('name', houses.name)
        formData.append('price', houses.price)
        formData.append('description', houses.description)
        formData.append('address', houses.address)
        formData.append('type', houses.type)
        formData.append('numberOfBeds', houses.numberOfBeds)
        formData.append('squareFeet', houses.squareFeet)
        formData.append('status', houses.status)
        formData.append('district',houses.district)
        formData.append('city',houses.city)

        if (!houses.image || !houses.price || !houses.description || !houses.address || !houses.type || !houses.numberOfBeds || !houses.squareFeet || !houses.district || !houses.city) {
            alert('Please fill all the information in the form.')
        }
        else {
            if (id == null) { // in add house page
                // get access token from users to use api
                const token = await getAccessTokenSilently()
                await axios.post(`${apiServerUrl}/api/v1/houses`, formData, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                    navigate('/processing')
                })
                .catch(error => console.log(error))
            }
            else { // in update house page
                let data = {
                    "name": houses.name,
                    "image": imageURL,
                    "price": houses.price,
                    "description": houses.description,
                    "address": houses.address,
                    "type": houses.type,
                    "status": houses.status,
                    "numberOfBeds": houses.numberOfBeds,
                    "squareFeet": houses.squareFeet,
                    "city": houses.city,
                    "district": houses.district
                }
                console.log(data)
                const token = await getAccessTokenSilently()
                await axios.put(`${apiServerUrl}/api/v1/houses/${id}`, data, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        console.log(res)
                        navigate('/processing')
                    })
                    .catch(error => console.log(error))
            }
        }
    }

    const uploadMoreImage = () => {
        navigate(`/auth/admin/uploadImage/${id}`)
    }


    if (id != null && houses.image === undefined) {
        navigate('/processing')
    }

    return (
        <Container>
            <br/>
            <br/>
            <br/>
            <Row className="justify-content-md-center">
                <Col xs="10" md="9" lg="8" xl="7">

                    <Card className=" shadow border-0">

                        <Card.Header className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-5 mb-3">
                                <small style={{ fontSize: "25px", color: "black" }}>{pageTitle}</small>
                            </div>
                        </Card.Header>

                        <Card.Body className="px-lg-5 py-lg-5">

                            <Form role="form">
                                <Row>
                                    <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>House Name</Form.Label>
                                        <Form.Control name="name"
                                            type="text"
                                            placeholder="House Name"
                                            value={houses.name} 
                                            required
                                            onChange={e => setHouses({ ...houses, name: e.target.value })}
                                            />
                                    </FormGroup>
                                    </Col>

                                    <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control name="price"
                                            type="number"
                                            placeholder="Price"
                                            value={houses.price}
                                            required
                                            onChange={e => setHouses({ ...houses, price: e.target.value })}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>

                                <FormGroup className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        placeholder="Description"
                                        value={houses.description}
                                        rows={3}
                                        style={{height:"10%"}}
                                        required
                                        onChange={e => setHouses({ ...houses, description: e.target.value })}
                                    />
                                </FormGroup >

                                <FormGroup className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        name="address"
                                        type="text"
                                        placeholder="Address"
                                        value={houses.address}
                                        required
                                        onChange={e => setHouses({ ...houses, address: e.target.value })}
                                    />
                                </FormGroup >

                                <FormGroup className="mb-3">
                                    <Form.Label>House Type</Form.Label>
                                    <DropdownButton id="dropdown-item-button" title={houses.type}
                                        onSelect={e => setHouses({ ...houses, type: e })}
                                    >
                                        <Dropdown.Item eventKey="appartment">apartment</Dropdown.Item>
                                        <Dropdown.Item eventKey="serviced">serviced</Dropdown.Item>
                                        <Dropdown.Item eventKey="street">street</Dropdown.Item>
                                    </DropdownButton>
                                </FormGroup>

                                <Row>
                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>City</Form.Label>
                                            <DropdownButton id="dropdown-item-button" title={houses.city}
                                                onSelect={e => {
                                                    setHouses({ ...houses, city: e })
                                                    setCitySelected(!citySelected)
                                                }}
                                                variant='success'
                                            >
                                                <Dropdown.Item eventKey="Saigon">Ho Chi Minh</Dropdown.Item>
                                                <Dropdown.Item eventKey="Hanoi">Ha Noi</Dropdown.Item>
                                            </DropdownButton>
                                        </FormGroup>
                                    </Col>

                                    <Col>
                                        <FormGroup className="mb-3">
                                            <Form.Label>District</Form.Label>
                                            <DropdownButton id="dropdown-item-button" title={!citySelected ? houses.district : districtList[0]} 
                                                onSelect={e => {
                                                    setHouses({ ...houses, district: e })
                                                    setCitySelected(!citySelected)
                                                }}
                                            >   
                                                {
                                                      districtList.map((district,key)=>{
                                                        return <Dropdown.Item eventKey={district} key={key}>{district}</Dropdown.Item>
                                                    })
                                                }
                                               
                                            </DropdownButton>
                                        </FormGroup>
                                    </Col>

                                </Row>


                                <Row>
                                    <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Number of beds</Form.Label>
                                        <Form.Control name="numOfBeds"
                                            type="number"
                                            placeholder="Number of beds"
                                            value={houses.numberOfBeds} 
                                            required
                                            onChange={e => setHouses({ ...houses, numberOfBeds: e.target.value })}
                                            />
                                    </FormGroup>
                                    </Col>

                                    <Col>
                                    <FormGroup className="mb-3">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control name="squareFeet"
                                            type="number"
                                            placeholder="Square Feet"
                                            value={houses.squareFeet}
                                            required
                                            onChange={e => setHouses({ ...houses, squareFeet: e.target.value })}
                                        />
                                    </FormGroup>
                                    </Col>
                                </Row>

                                {
                                    id == null ? "" :
                                        <span className="col-md-12 image-slider">
                                            {
                                                houses.image.map((imageLink, key) => {
                                                    return <span key={key} >
                                                        <img src={imageLink} alt="house-pic" className='house-img' />
                                                        <input type="checkbox" value={imageLink} onClick={handleCheck} defaultChecked="checked" />
                                                    </span>
                                                })
                                            }
                                        </span>
                                }

                                {
                                    id == null ?
                                        <FormGroup className="mb-3">
                                            <Form.Label>Image Upload</Form.Label>
                                            <Form.Control name="uploadImage"
                                                type="file"
                                                required
                                                multiple
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        : ""
                                }

                                <div className="text-center">
                                    <div className='row'>

                                        {
                                            id == null ?
                                            <Button className="my-4" color="primary" type="button" onClick={submitBtnOnClick} >
                                                {pageTitle}
                                            </Button>
                                            :
                                            <>
                                                <Button className="my-4" color="primary" type="button" onClick={submitBtnOnClick}>
                                                    {pageTitle}
                                                </Button>
                                                <Button className="my-4" color="primary" type="button" onClick={uploadMoreImage}>
                                                    Upload more image
                                                </Button>
                                            </>
                                        }
                                    </div>
                                </div>


                            </Form>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
