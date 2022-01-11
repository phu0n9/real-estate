import React,{useState,useEffect} from 'react'
import '../stylesheet/addHouse/form-control.css'
import axios from 'axios'
import { useEnv } from '../context/env.context'
import { useNavigate,useParams} from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"

export default function HouseForm({pageTitle}) {
    const {getAccessTokenSilently } = useAuth0()

    const [name, setHouseName] = useState("")
    const [price, setHousePrice] = useState(0)
    const [description, setHouseDescription] = useState("")
    const [address, setHouseAddress] = useState("")
    const [type, setHouseType] = useState("")
    const [status, setHouseStatus] = useState("")
    const [numberOfBeds, setNumberOfBeds] = useState(0)
    const [squareFeet, setSquareFeet] = useState(0)
    const { id } = useParams();
    const [image, setImage] = useState([])
    const [checked,setChecked] = useState(true)
    const [imageURL,setImageURL] = useState([])

    const { apiServerUrl } = useEnv()

    let navigate = useNavigate()

    const nameOnChange = (e) => {
        setHouseName(e.target.value)
    }

    const priceOnChange = (e) => {
        setHousePrice(e.target.value)
    }

    const descriptionOnChange = (e) => {
        setHouseDescription(e.target.value)
    }

    const addressOnChange = (e) => {
        setHouseAddress(e.target.value)
    }

    const typeOnChange = (e) => {
        setHouseType(e.target.value)
    }

    const statusOnChange = (e) => {
        setHouseStatus(e.target.value)
    }

    const numberOfBedsOnChange = (e) => {
        setNumberOfBeds(e.target.value)
    }

    const squareFeetOnChange = (e) => {
        setSquareFeet(e.target.value)
    }

    const handleChange = (e) => {
        const files = Array.from(e.target.files)
        setImage(files)
    }

    useEffect(()=>{
        if (id != null){
            const fetchHouse = async () =>{
                const token = await getAccessTokenSilently()
                await axios.get(`${apiServerUrl}/api/v1/houses/${id}`,{
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                })
                .then((res)=>{
                    setHouseName(res.data.name)
                    setHousePrice(res.data.price)
                    setHouseDescription(res.data.description)
                    setHouseAddress(res.data.address)
                    setHouseStatus(res.data.status)
                    setHouseType(res.data.type)
                    setNumberOfBeds(res.data.numberOfBeds)
                    setSquareFeet(res.data.squareFeet)
                    setImage(res.data.image)
                    setImageURL(res.data.image)
                })
                .catch((err)=>{console.log(err)})
            }
            fetchHouse()
        }
    },[id,apiServerUrl,getAccessTokenSilently])

    const handleCheck = (e) =>{
        setChecked(!checked)
        if(e.target.checked){
            setImageURL(oldImg => [...oldImg,e.target.value])
        }
        else{
            setImageURL(imageURL.filter(item => item !== e.target.value))
        }
    }

    const submitBtnOnClick = async () => {
        const formData = new FormData()
        image.forEach(file => {
            formData.append('files', file)
        })
        
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('address', address)
        formData.append('type', type)
        formData.append('numberOfBeds', numberOfBeds)
        formData.append('squareFeet', squareFeet)
        formData.append('status', status)

        if(!image || !price || !description || !address || !type || !numberOfBeds || !squareFeet || !status){
            alert('Please fill all the information in the form.')
        }
        else{
            if (id == null ){ // in add house page
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
            else{ // in update house page
                let data = {
                    "name" : name,
                    "image":imageURL,
                    "price":price,
                    "description":description,
                    "address":address,
                    "type":type,
                    "status":status,
                    "numberOfBeds":numberOfBeds,
                    "squareFeet":squareFeet
                }
                const token = await getAccessTokenSilently()
                await axios.put(`${apiServerUrl}/api/v1/houses/${id}`, data, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                    navigate('/processing')
                })
                .catch(error => console.log(error))
            }
        }
    }

    const uploadMoreImage = ()=>{
        navigate(`/auth/admin/uploadImage/${id}`)
    }

    if (id != null && image === undefined){
        navigate('/processing')
    }

    return (
        <div className="container">
            <br />
            <br />
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12">
                    <div className="wrapper">
                        <div className="row no-gutters">
                            <div className="contact-wrap w-100 p-md-5 p-4">
                                <h3 className="mb-4">{pageTitle}</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="name" placeholder="House Name" onChange={nameOnChange} required value={name}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="number" min="0" max="900000" className="form-control" name="price" placeholder="House Price" onChange={priceOnChange} required value={price}/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <textarea name="description" className="form-control description-box" cols="30" rows="7" placeholder="House Description" onChange={descriptionOnChange} required value={description}></textarea>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="address" placeholder="House Address" onChange={addressOnChange} required value={address}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="type" placeholder="House Type" onChange={typeOnChange} required value={type}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="status" placeholder="House Status" onChange={statusOnChange} required value={status}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="number" min="1" max="10" className="form-control" name="numberOfBeds" placeholder="Number of Bedroom" onChange={numberOfBedsOnChange} required value={numberOfBeds}/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" min="100" max="10000" className="form-control" name="squareFeet" placeholder="Square Feet" onChange={squareFeetOnChange} required value={squareFeet}/>
                                        </div>
                                    </div>

                                    {
                                        id == null ? "" :
                                        <span className="col-md-12 image-slider">
                                            {
                                                image.map((imageLink,key)=>{
                                                    return <span key={key} >
                                                        <img src={imageLink} alt="house-pic" className='house-img'/>
                                                        <input type="checkbox" value={imageLink} onClick={handleCheck} defaultChecked="checked"/>
                                                    </span>
                                                })
                                            }
                                        </span>
                                    }

                                    {
                                        id == null ? 
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="file" multiple onChange={handleChange} className="form-control" required/>
                                            </div>
                                        </div>
                                    : ""
                                    }

                                    
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            {
                                                id == null ? 
                                                <input type="submit" value={pageTitle} className="btn btn-primary vertical-center" onClick={submitBtnOnClick} />
                                                :
                                                <>
                                                    <input type="submit" value={pageTitle} className="btn btn-primary vertical-center" onClick={submitBtnOnClick} style={{marginLeft:"46%"}}/>
                                                    <input type="submit" value="Upload more image" className="btn btn-info vertical-center" onClick={uploadMoreImage} />

                                                </>

                                            }

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
