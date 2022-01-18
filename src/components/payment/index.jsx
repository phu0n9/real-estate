import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Container, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext, UserRoleContext } from "../../App";
import { useEnv } from "../../context/env.context";
import Loader from "../Loader";
import AddPayment from "./AddPayment";
import PaymentItem from "./PaymentItem";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const Payment = () => {
  let isAdmin = useContext(UserRoleContext);

  const navigate = useNavigate();

  const [paymentList, setPaymentList] = useState([]);
  const [rentalList, setRentalList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedRentalId, setSelectedRentalId] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const { getAccessTokenSilently, user } = useAuth0();
  const currentUserId = useContext(UserContext);
  const [totalItem, setTotalItem] = useState();
  let url = window.location.href.includes("admin")

  const { apiServerUrl } = useEnv();

  // const [userName, setUserName] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [btnPressed, setBtnPressed] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // getFilteredPayments
  const getAllPayments = async () => {
    setLoading(true);
    const token = await getAccessTokenSilently();
    await axios.get(`${apiServerUrl}/api/v1/payments/byUser?pageSize=${!isAdmin ? "":6}&pageNo=${activePage}&${!isAdmin ? "userId="+currentUserId : ""}`, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        setTotalItem(res.data.totalElements);
        setTotalPages(res.data.totalPages);

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
        setPaymentList([...res.data.content]);
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
          pageSize: 6,
        },
      }.then((res) => {
        setPaymentList(res.data.content);
        setTotalItem(res.data.totalElements);
      })
    );
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
      if(selectedPayment === null){
        for (let number = 0; number < totalPages ; number++) {
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
    }
    return items;
  };

  if(!isAdmin && url){
    navigate("/auth/payments")
  }

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
                getOptionLabel={(option) => option.rental.house.name}
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
                getOptionLabel={(option) => option.rental.user.fullName}
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
                url={url}
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
export default withAuthenticationRequired(Payment, {
  onRedirecting: () => <Loader />,
});
