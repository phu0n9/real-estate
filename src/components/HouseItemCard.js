import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HouseItemCard = ({ houses }) => {
    const navigate = useNavigate();
    const viewDetail = () => {
        navigate("/viewDetail/" + houses.houseId)
    }
    console.log(houses)

    return (
        <Card onClick={viewDetail} style={{ width: '20rem'}}>
            <Card.Img variant="top" src={houses.image[3]} style={{height: 200, overflow: 'hidden'}} />
            <Card.Body>
                <Card.Title>{houses.name}</Card.Title>
                <Card.Text>{"Price: $" + houses.price }</Card.Text>
                <Card.Text>{"Beds: " + houses.numberOfBeds + " bed(s)"}</Card.Text>
                <Card.Text>{"Address: " + houses.address}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default HouseItemCard;