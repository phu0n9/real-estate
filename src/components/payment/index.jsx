import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container, Pagination, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useEnv } from "../../context/env.context";
import Loader from "../Loader";
import AddPayment from "./AddPayment";
import PaymentItem from "./PaymentItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Payment = ({ isAdmin }) => {
  const [paymentList, setPaymentList] = useState([]);
  const [rentalList, setRentalList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedRentalId, setSelectedRentalId] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const { getAccessTokenSilently } = useAuth0();
  const currentUserId = useContext(UserContext);
  const [totalItem, setTotalItem] = useState();

  const { audience, apiServerUrl } = useEnv();
  const role = `${audience}/roles`;
  const { user } = useAuth0();

  const [userName, setUserName] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [btnPressed, setBtnPressed] = useState(false);

  // getFilteredPayments
  const getAllPayments = async () => {
    setLoading(true);
    const token = await getAccessTokenSilently();
    const params = {
      pageNo: activePage,
      userId: !isAdmin ? currentUserId : "",
    };
    await axios
      .get(`${apiServerUrl}/api/v1/payments/byUser`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params,
      })
      .then((res) => {
        setTotalItem(res.data.totalElements);

        if (!isAdmin) {
          let tempRental = [];
          // get all rentalIds
          res.data.content.forEach((p) => {
            if (!tempRental.includes(p.rental.rentalId)) {
              tempRental.push(p.rental.rentalId);
            }
          });

          // map rental with price
          const rentalWithPrice = tempRental.map((rental) => {
            const price = res.data.content.find(
              (payment) => payment.rental.rentalId === rental
            ).amount;
            return {
              rentalId: rental,
              price,
            };
          });
          setRentalList(rentalWithPrice);
        }
        res.data.content.map((p) => {
          axios
            .get(`${apiServerUrl}/api/v1/users/${p.rental.userHouse.userId}`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res2) => {
              axios
                .get(
                  `${apiServerUrl}/api/v1/houses/${p.rental.userHouse.houseId}`,
                  {
                    headers: {
                      authorization: `Bearer ${token}`,
                    },
                  }
                )
                .then((res3) => {
                  console.log(res3);
                  setPaymentList((prevList) => [
                    ...prevList,
                    {
                      ...p,
                      userName: res2.data.fullName,
                      houseName: res3.data.name,
                    },
                  ]);
                });

              // setPaymentList((prevList) => [
              //   ...prevList,
              //   {
              //     ...p,
              //     userName: res2.data.fullName,
              //   },
              // ])
            });
        });
      });
    setLoading(false);
  };

  // getFilteredPaymentsByRentalId
  const getPaymentsByRentalId = async () => {
    setLoading(true);
    const token = await getAccessTokenSilently();
    await axios.get(
      `${apiServerUrl}/api/v1/payments/search/byRental/${selectedRentalId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          pageNo: activePage,
        },
      }.then((res) => {
        setPaymentList(res.data.content);
        setTotalItem(res.data.totalElements);
        res.data.content.forEach((p) => {
          axios
            .get(`${apiServerUrl}/api/v1/users/${p.rental.userHouse.userId}`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((res2) => {
              setUserName(res2.data.fullName);
            });
        });
      })
    );

    // setPaymentList(response.data.content);
    // setTotalItem(response.data.totalElements)
    setLoading(false);
  };

  useEffect(() => {
    // getFilteredPaymentsByRentalId when user selects rentalId
    if (selectedRentalId > 0) {
      getPaymentsByRentalId();
    } else if (currentUserId) {
      getAllPayments();
    }
  }, [activePage, selectedRentalId, currentUserId]);

  const paginationItems = () => {
    let items = [];
    for (let number = 0; number <= paymentList.length / 10 + 1; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => setActivePage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  console.log(paymentList);
  return (
    <Container className="py-5" style={{ marginTop: "5rem" }}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            {!isAdmin ? (
              <Autocomplete
                id="payments"
                options={paymentList}
                getOptionLabel={(option) => option.houseName}
                style={{ width: 350, marginTop: 50 }}
                value={selectedPayment}
                clearOnBlur={true}
                onChange={(_event, houseName) => {
                  if (
                    _event.target.tagName === "svg" ||
                    _event.target.tagName === "path"
                  ) {
                    setBtnPressed(false);
                  } else {
                    setBtnPressed(true);
                  }
                  setSelectedPayment(houseName);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Serch by House Name"
                    variant="outlined"
                  />
                )}
              />
            ) : (
              <Autocomplete
                id="payments"
                options={paymentList}
                getOptionLabel={(option) => option.userName}
                style={{ width: 350, marginTop: 50 }}
                value={selectedPayment}
                clearOnBlur={true}
                onChange={(_event, userName) => {
                  if (
                    _event.target.tagName === "svg" ||
                    _event.target.tagName === "path"
                  ) {
                    setBtnPressed(false);
                  } else {
                    setBtnPressed(true);
                  }
                  setSelectedPayment(userName);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Serch by User Name"
                    variant="outlined"
                  />
                )}
              />
            )}
          </div>

          <div className="d-flex flex-wrap" style={{ marginTop: 50 }}>
            {btnPressed === true ? (
              <PaymentItem
                payment={selectedPayment}
                onPaymentChange={() => {
                  if (selectedRentalId > 0) {
                    getPaymentsByRentalId();
                  } else getAllPayments();
                }}
              ></PaymentItem>
            ) : (
              paymentList.map((p) => {
                return (
                  <PaymentItem
                    payment={p}
                    onPaymentChange={() => {
                      if (selectedRentalId > 0) {
                        getPaymentsByRentalId();
                      } else getAllPayments();
                    }}
                  />
                );
              })
            )}
          </div>
          {!isAdmin && rentalList.length > 0 && (
            <AddPayment rentals={rentalList} />
          )}
          {totalItem > 1 && (
            <Pagination style={{ marginTop: "20px" }}>
              {paginationItems()}
            </Pagination>
          )}
        </div>
      )}
    </Container>
  );
};
export default Payment;
