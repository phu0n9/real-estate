import React,{useEffect,useState} from 'react'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import Loader from '../components/Loader'
import { useParams,Navigate,useNavigate} from 'react-router-dom';
import { useEnv } from '../context/env.context'
import '../stylesheet/addHouse/form-control.css'
import axios from 'axios'

const UploadHouseImage = () =>{

    const { user, getAccessTokenSilently} = useAuth0()
    const { audience,apiServerUrl } = useEnv()
    const role = `${audience}/roles`
    const [images,setImages] = useState([])
    const [files,setFiles] = useState([])

    let navigate = useNavigate()

    const { id } = useParams()

    useEffect(()=>{
        const fetchImages = async () =>{
            const token = await getAccessTokenSilently()
            await axios.get(`${apiServerUrl}/api/v1/houses/${id}`,{
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            .then((res)=>{
                setImages(res.data.image)
            })
            .catch((err)=>{console.log(err)})
        }
        fetchImages()
    },[apiServerUrl,getAccessTokenSilently,id])


    const handleChange = (e) => {
        const files = Array.from(e.target.files)
        setFiles(files)
    }

    const submitBtnOnClick = async () =>{
        const formData = new FormData()
        formData.append('houseId',id)
        files.forEach(file =>{
            formData.append("files",file)
        })
        const token = await getAccessTokenSilently()
        await axios.put(`${apiServerUrl}/api/v1/houses/addHouseImage`,formData,{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
        .then(()=>{
            navigate('/processing')
        })
        .catch((err)=>{console.log(err)})
    }

    // checking for if users is admin or not
    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/unauthorized" />
            </>
        )
    }

    return (
        <div className="container" style={{marginTop:"10%"}}>
            <h3 className="mb-4">Upload more image</h3>

            <span className="col-md-12 image-slider">
                {
                    images.map((imageLink,key)=>{
                        return <span key={key} >
                            <img src={imageLink} alt="house-pic" className='house-img'/>
                        </span>
                    })
                }
            </span>

            <div className="col-md-12">
                <div className="form-group">
                    <input type="file" multiple onChange={handleChange} className="form-control" required/>
                </div>
            </div>

            <div className="col-md-12">
                <div className="form-group">
                <input type="submit" value="Upload image" className="btn btn-primary vertical-center" onClick={submitBtnOnClick} />
                </div>
            </div>
        
        </div>
    )
}

export default withAuthenticationRequired(UploadHouseImage, {
    onRedirecting: () => <Loader />,
})