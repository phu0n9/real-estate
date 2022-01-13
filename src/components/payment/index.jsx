import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Container,
  Dropdown,
  DropdownButton,
  Pagination,
} from "react-bootstrap";
import { UserContext } from "../../App";
import { useEnv } from "../../context/env.context";
import Loader from "../Loader";
import AddPayment from "./AddPayment";
import PaymentItem from "./PaymentItem";

const Payment = ({ isAdmin }) => {
  const [paymentList, setPaymentList] = useState([]);
  const [rentalList, setRentalList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedRentalId, setSelectedRentalId] = useState(0);
  const [activePage, setActivePage] = useState(1);

  const { getAccessTokenSilently } = useAuth0();
  const { apiServerUrl } = useEnv();
  const currentUserId = useContext(UserContext);

  // getFilteredPayments
  const getAllPayments = async () => {
    setLoading(true);
    const token = await getAccessTokenSilently();

    const params = {
      pageNo: activePage,
      userId: !isAdmin ? currentUserId : "",
    };
    const response = await axios.get(`${apiServerUrl}/api/v1/payments/byUser`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      params,
    });
    setPaymentList(response.data);

    // for user, get list of rentals for them to filter
    if (!isAdmin) {
      let tempRental = [];
      // get all rentalIds
      response.data.forEach((p) => {
        if (!tempRental.includes(p.rental.rentalId)) {
          tempRental.push(p.rental.rentalId);
        }
      });

      // map rental with price
      const rentalWithPrice = tempRental.map((rental) => {
        const price = response.data.find(
          (payment) => payment.rental.rentalId === rental
        ).amount;
        return {
          rentalId: rental,
          price,
        };
      });
      setRentalList(rentalWithPrice);
    }
    setLoading(false);
  };

  // getFilteredPaymentsByRentalId
  const getPaymentsByRentalId = async () => {
    setLoading(true);
    const token = await getAccessTokenSilently();
    const response = await axios.get(
      `${apiServerUrl}/api/v1/payments/search/byRental/${selectedRentalId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          pageNo: activePage,
        },
      }
    );
    setPaymentList(response.data.content);
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
    for (let number = 1; number <= paymentList.length / 10 + 1; number++) {
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

  // const shouldPay = () => {
  //   const lastPayment = paymentList[paymentList.length - 1].date.split("-");
  //   const months = [
  //     "",
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   const d = new Date();
  //   const month = d.getMonth() + 1;
  //   const year = d.getFullYear();
  //   if (
  //     year > parseInt(lastPayment[0]) ||
  //     (year === parseInt(lastPayment[0]) && month > parseInt(lastPayment[1]))
  //   ) {
  //     return months[month];
  //   } else return false;
  // };

  return (
    <Container className="py-5" style={{ marginTop: "5rem" }}>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {!isAdmin && rentalList.length > 0 && (
            // show dropdown rentalId list for user to filter
            <DropdownButton
              id="dropdown-basic-button"
              className="mx-2 mb-3"
              title={`Rental ID ${
                selectedRentalId > 0 ? selectedRentalId : ""
              }`}
              onSelect={(e) => setSelectedRentalId(e)}
            >
              {rentalList.map((rental) => (
                <Dropdown.Item eventKey={rental.rentalId}>
                  Rental ID: {rental.rentalId}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          )}
          <div className="d-flex flex-wrap">
            {paymentList.map((p) => {
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
            })}
          </div>
          {!isAdmin && <AddPayment rentals={rentalList} />}
          {paymentList.length > 10 && (
            <Pagination>{paginationItems()}</Pagination>
          )}
        </div>
      )}
    </Container>
  );
};
export default Payment;
