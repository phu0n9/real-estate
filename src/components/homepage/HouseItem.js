import React,{useState,useEffect} from 'react'
import '../../stylesheet/homepage/HouseItem.css'
import { useEnv } from '../../context/env.context';
import axios from "axios";

export default function HouseItem() {
    
    const [houses, setHouses] = useState([])
    const { apiServerUrl } = useEnv()

    useEffect(() =>{
        const fetchHouse = async () =>{
            await axios.get(`${apiServerUrl}/api/v1/houses/random/9`)
            .then((res)=>{
                setHouses(res.data)
            })
            .catch((err)=>console.error(err))
        }
        fetchHouse()
    },[apiServerUrl])

    return (
        houses.map((house,index)=>{
            return <div className="col-lg-4 col-md-6 item-item filter-web" key={index}>
            <div className="item-wrap">
                <img src={house.image[3]} className="img-fluid" alt="house-frontal"/>
                <div className="item-info">
                <h4>{house.name}</h4>
                <p>Address: {house.address}</p>
                <p>Number of beds: {house.numberOfBeds}</p>
                <p>{house.squareFeet} squareFeet</p>
                </div>
            </div>
            </div>      
        })
    )
}
