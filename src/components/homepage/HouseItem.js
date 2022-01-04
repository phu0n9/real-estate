import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../../stylesheet/homepage/HouseItem.css'
// import { useExternalApi } from '../../api/api'

export default function HouseItem() {
    
    const [houses, setHouses] = useState([])
    // const url = "houses/search"
    // const params = {
    //     query:"",
    //     pageNo:1,
    //     pageSize:9,
    //     sortBy: "name",
    //     orderBy:"asc"
    // }
    // const {apiResponse,getPublicResource} = useExternalApi({url: url,params: params});

    useEffect(() =>{
        const fetchHouse = async () =>{
            await axios.get('http://localhost:8080/api/v1/houses/search',{
                params:{
                    query:"",
                    pageNo:1,
                    pageSize:9,
                    sortBy: "name",
                    orderBy:"asc"
                }
            })
            .then((res)=>{
                setHouses(res.data.content)
            })
            .catch((err)=>console.error(err))
        }
        fetchHouse()
    },[])

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
