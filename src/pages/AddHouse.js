import React, { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import { Navigate } from 'react-router-dom';
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

import '../stylesheet/addHouse/form-control.css'

const AddHouse = () => {
    const [name, setHouseName] = useState("")
    const [price, setHousePrice] = useState(0)
    const [description, setHouseDescription] = useState("")
    const [address, setHouseAddress] = useState("")
    const [type, setHouseType] = useState("")
    const [status, setHouseStatus] = useState("")
    const [numberOfBeds, setNumberOfBeds] = useState(0)
    const [squareFeet, setSquareFeet] = useState(0)

    const [image, setImage] = useState([])

    const { apiServerUrl } = useEnv()

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

    const { user, getAccessTokenSilently } = useAuth0()
    const { audience } = useEnv()
    const role = `${audience}/roles`

    const handleChange = (e) => {
        const files = Array.from(e.target.files)
        setImage(files)
    }

    const uploadHouse = async () => {
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
            // get access token from users to use api
            const token = await getAccessTokenSilently()
            await axios.post(`${apiServerUrl}/api/v1/houses`, formData, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res)
            })
            .catch(error => console.log(error))
        }
    }

    // checking for if users is admin or not
    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/" />
            </>
        )
    }

    return (
        <section className="ftco-section">
            <div className="container">
                <br />
                <br />
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12">
                        <div className="wrapper">
                            <div className="row no-gutters">
                                <div className="contact-wrap w-100 p-md-5 p-4">
                                    <h3 className="mb-4">Add House</h3>
                                    <div className="row">

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="name" placeholder="House Name" onChange={nameOnChange} required/>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="number" min="0" max="900000" className="form-control" name="price" placeholder="House Price" onChange={priceOnChange} required/>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <textarea name="description" className="form-control description-box" cols="30" rows="7" placeholder="House Description" onChange={descriptionOnChange} required></textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="address" placeholder="House Address" onChange={addressOnChange} required/>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="type" placeholder="House Type" onChange={typeOnChange} required/>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="status" placeholder="House Status" onChange={statusOnChange} required/>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="number" min="1" max="10" className="form-control" name="numberOfBeds" placeholder="Number of Bedroom" onChange={numberOfBedsOnChange} required/>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" min="100" max="10000" className="form-control" name="squareFeet" placeholder="Square Feet" onChange={squareFeetOnChange} required/>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="file" multiple onChange={handleChange} className="form-control" required/>
                                            </div>
                                        </div>


                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="submit" value="Add House" className="btn btn-primary vertical-center" onClick={uploadHouse} />
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withAuthenticationRequired(AddHouse, {
    onRedirecting: () => <Loader />,
})
