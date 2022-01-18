import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MapSection from "../components/map/Map";
import { Button, Container, Row } from "react-bootstrap";
import "../App.css";
import "../stylesheet/Details.css";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Badge from "react-bootstrap/Badge";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useEnv } from "../context/env.context";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { FaBusinessTime } from "react-icons/fa";
import { UserContext } from "../App";
import HouseItemCard from "../components/HouseItemCard";

const ViewDetail = () => {
  const [uid, setUID] = useState(0);
  const { id } = useParams();
  const [house, setHouse] = useState([]);
  const [location, setLocation] = useState({});
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0();
  const { audience, apiServerUrl } = useEnv();
  const role = `${audience}/roles`;
  const navigate = useNavigate();

  const [statusArr, setStatusArr] = useState([]);
  const [typeArr, setTypeArr] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const data = {
    city: "",
    district: "",
    priceFrom: 0,
    priceTo: 0,
    statusList: statusArr,
    typeList: typeArr,
    query: searchQuery
  }

  const { currentUserId } = useContext(UserContext);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  const [suggestion, setSuggestion] = useState([])

  const bookMeeting = () => {
    if (isAuthenticated) {
      navigate(`/BookMeeting/${id}`);
    } else {
      loginWithRedirect();
    }
  };

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${apiServerUrl}/api/v1/houses/${id}`)
        .then((res) => {
          setHouse(res.data);
          setLocation({
            address: res.data.address,
            lat: res.data.latitude,
            lng: res.data.longitude,
          });
          setImages(res.data.image);
          setStatus(res.data.status);
          setType(res.data.type);
          // let words = (user.sub).split('|')
          setUID(currentUserId);
          data.district = res.data.location.district
          data.city = res.data.location.city
        }).then(
          axios.post(`${apiServerUrl}/api/v1/houses/search/form?orderBy=asc&pageNo=1`, data)
            .then(res2 => {
              setSuggestion([...res2.data.content])
            })
        )
        .catch((err) => {
          console.log(err);
          navigate("/error");
        });
    };
    getData();
  }, [id, apiServerUrl, navigate]);

  const deleteHouse = async () => {
    // get access token from users to use api
    const token = await getAccessTokenSilently();
    await axios
      .delete(`${apiServerUrl}/api/v1/houses/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/processing");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateHouse = () => {
    navigate(`/auth/admin/updateHouse/${id}`);
  };

  const saveDeposit = async () => {
    if (isAuthenticated) {
      const monthly_price = Math.round(Math.trunc(house.price) / 12).toString();
      const userHouse = { userId: uid, houseId: Math.trunc(id) };
      const today = new Date();
      let dateNow = "1010-10-10";
      let timeNow = "10:00";

      if (today.getMonth() < 10) {
        dateNow =
          today.getFullYear() +
          "-0" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
      } else if (today.getDate() < 10) {
        dateNow =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-0" +
          today.getDate();
      } else
        dateNow =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();

      if (today.getHours() < 10) {
        timeNow = "0" + today.getHours() + ":" + today.getMinutes();
      } else if (today.getMinutes() < 10) {
        timeNow = "0" + today.getHours() + ":0" + today.getMinutes();
      } else timeNow = +today.getHours() + ":" + today.getMinutes();

      if (!userHouse || !monthly_price) {
        alert("Please fill all the information in the form.");
      } else {
        const data = {
          userHouse: userHouse,
          amount: monthly_price,
          date: dateNow.toString(),
          time: timeNow.toString(),
          note: house.name,
        };
        // get access token from users to use api
        const token = await getAccessTokenSilently();
        console.log(token);
        await axios
          .post(`${apiServerUrl}/api/v1/deposits`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              alert("Your Deposit Was Successful, Enjoy Your Stay!");
            }
          })
          .catch((error) => console.log(error));
      }
    } else {
      loginWithRedirect();
    }
  };

  const suggestionSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear"
  };

  return (
    <section className="portfolio-details">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-8">
            <Slider {...settings}>
              {images.map((image, index) => {

                return (
                  <div key={index}>
                    <img
                      src={image}
                      style={{ height: 600, overflow: 'hidden' }}
                      alt="house"
                    />
                  </div>
                );
              })}
            </Slider>
            <div className="portfolio-description">
              <h2>House Description</h2>
              <p>{house.description}</p>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="portfolio-info">
              <h3>{house.name}</h3>
              <ul>
                <li>
                  <strong>House Price</strong>: {house.price}
                </li>
                <li>
                  <strong>Address</strong>: {house.address}
                </li>
                <li>
                  <strong>Number of Beds</strong>: {house.numberOfBeds}
                </li>
                <li>
                  <strong>Type</strong>:
                  <Badge
                    pill
                    bg={
                      type === "street"
                        ? "warning"
                        : type === "apartment"
                          ? "info"
                          : "success"
                    }
                  >
                    {house.type}
                  </Badge>{" "}
                </li>
                <li>
                  <strong>Status</strong>:
                  <Badge
                    pill
                    bg={
                      status === "reserved"
                        ? "info"
                        : status === "available"
                          ? "success"
                          : "warning"
                    }
                  >
                    {house.status}
                  </Badge>{" "}
                </li>
              </ul>
            </div>
            <div className="portfolio-description" style={{ paddingLeft: 50 }}>
              {
                // isAuthenticated
                !isAuthenticated ?
                  (
                    // && user[role].length !== 0 && user !== undefined
                    // (
                    // (
                    // user === undefined
                    // ?
                    <span>
                      <Button
                        variant="primary"
                        onClick={bookMeeting}
                        style={{ height: "3rem" }}
                      >
                        Book Meeting
                      </Button>

                      <Button
                        variant="success"
                        onClick={saveDeposit}
                        style={{
                          height: "3rem",
                          display: status === "available" ? "block" : "none",
                        }}
                      >
                        Deposit Money
                      </Button>

                    </span>
                  )
                  :
                  (
                    user !== undefined && user[role].length === 0
                      ?
                      (
                        <span>
                          <Button
                            variant="primary"
                            onClick={bookMeeting}
                            style={{ height: "3rem" }}
                          >
                            Book Meeting
                          </Button>

                          <Button
                            variant="success"
                            onClick={saveDeposit}
                            style={{
                              height: "3rem",
                              display: status === "available" ? "block" : "none",
                            }}
                          >
                            Deposit Money
                          </Button>
                        </span>
                      )
                      :
                      (
                        <span>
                          <Button variant="danger" onClick={deleteHouse}>
                            Delete House
                          </Button>
                          <Button variant="info" onClick={updateHouse}>
                            Update House
                          </Button>
                        </span>
                      )

                  )
                // )
                // )
                // :
                // (
                //     <Button variant="primary" onClick={()=> loginWithRedirect()} style={{ height: '3rem'}}>Log in</Button>
                // )
              }
            </div>

            <div className="portfolio-description">
              <h2>Map Information</h2>
              <MapSection location={location} zoomLevel={3} />
            </div>
          </div>
          <Container style={{ justifyContent: "center", marginTop: 100 }}>
            <h2 style={{ marginTop: 30 }}>Another houses?</h2>
            <Row>
              <Slider {...suggestionSettings}>
                {suggestion.map((e) => {
                  return <HouseItemCard houses={e} />
                })}
              </Slider>
            </Row>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default ViewDetail;
