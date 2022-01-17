import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  Container,
  Dropdown,
  DropdownButton,
  Pagination,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useEnv } from "../../context/env.context";
import Loader from "../Loader";
import AddPayment from "./AddPayment";
import PaymentItem from "./PaymentItem";

const Payment = ({isAdmin}) => {
  const [paymentList, setPaymentList] = useState([]);
  const [rentalList, setRentalList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedRentalId, setSelectedRentalId] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const { getAccessTokenSilently } = useAuth0();
  const currentUserId = useContext(UserContext);
  const [totalItem,setTotalItem] = useState()

  const { audience,apiServerUrl } = useEnv()
  const role = `${audience}/roles`
  const {user } = useAuth0();

<<<<<<< HEAD
  const [userName,setUserName] = useState([])

=======
>>>>>>> dc52a23 (add)
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
    setPaymentList(response.data.content);
    setTotalItem(response.data.totalElements)

    // for user, get list of rentals for them to filter
    if (!isAdmin) {
      let tempRental = [];
      // get all rentalIds
      response.data.content.forEach((p) => {
        if (!tempRental.includes(p.rental.rentalId)) {
          tempRental.push(p.rental.rentalId);
        }
      });

      // map rental with price
      const rentalWithPrice = tempRental.map((rental) => {
        const price = response.data.content.find(
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
<<<<<<< HEAD
      }.then(Promise.all(
          await axios.get(`${apiServerUrl}/api/v1/users/${paymentList.rental.userHouse.userId}`,{
            headers:{
              authorization:`Bearer ${token}`
            }
          })
          .then((res)=>{
            setUserName(res.data.fullName)
          })
          .catch((err)=>{console.log(err)})
      ))
    )

=======
      }
    );
>>>>>>> dc52a23 (add)
    setPaymentList(response.data.content);
    setTotalItem(response.data.totalElements)
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


  return (
    <Container className="py-5" style={{ marginTop: "5rem" }}>
      {loading ? (
        <Loader />
      ) : (
        <div>
<<<<<<< HEAD
        
            {/* <DropdownButton
=======
          {!isAdmin && rentalList.length > 0 && (
            // show dropdown rentalId list for user to filter
            <DropdownButton
>>>>>>> dc52a23 (add)
              id="dropdown-basic-button"
              className="mx-2 mb-3"
              title={`Rental ID ${
                selectedRentalId > 0 ? selectedRentalId : ""
              }`}
<<<<<<< HEAD
              onSelect={(e) => setSelectedRentalId(e)}>
=======
              onSelect={(e) => setSelectedRentalId(e)}
            >
>>>>>>> dc52a23 (add)
              {rentalList.map((rental) => (
                <Dropdown.Item eventKey={rental.rentalId}>
                  Rental ID: {rental.rentalId}
                </Dropdown.Item>
              ))}
<<<<<<< HEAD
            </DropdownButton> */}
       

          <div className="d-flex flex-wrap" style={{ marginTop: 150 }}>
=======
            </DropdownButton>
          )}
          <div className="d-flex flex-wrap">
>>>>>>> dc52a23 (add)
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
<<<<<<< HEAD

=======
>>>>>>> dc52a23 (add)
          </div>
          {!isAdmin && rentalList.length > 0 && <AddPayment rentals={rentalList} />}
          {totalItem > 1 && (
            <Pagination style={{marginTop:"20px"}}>{paginationItems()}</Pagination>
          )}
        </div>
      )}
    </Container>
  );
};
export default Payment;
