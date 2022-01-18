import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState,useEffect } from "react";
import { useEnv } from "../../context/env.context";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const PaymentItem = ({ payment, onPaymentChange }) => {
  const { getAccessTokenSilently } = useAuth0();
  const { apiServerUrl } = useEnv();
  const [show, setShow] = useState(0); // 0: hide modal, 1: show payment details, 2: show update payment form
  const [formData, setFormData] = useState({
    amount: payment.amount,
    note: payment.note,
  });
  const [houseName,setHouseName] = useState("")
  const [userName,setUserName] = useState("")

  // deletePaymentById
  const deletePayment = async () => {
    const token = await getAccessTokenSilently();
    await axios.delete(`${apiServerUrl}/api/v1/payments/${payment.paymentId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    setShow(0);
    onPaymentChange();
  };

  // updatePaymentById
  const updatePayment = async () => {
    const token = await getAccessTokenSilently();
    const body = {
      amount: formData.amount,
      note: formData.note,
      date: payment.date,
      time: payment.time,
    };
    await axios.put(
      `${apiServerUrl}/api/v1/payments/byRental/${payment.rental.rentalId}/${payment.paymentId}`,
      body,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    setShow(0);
    onPaymentChange();
  };

  // get house name
  useEffect(()=>{
    const getHouseName = async ()=>{
      await axios.get(`${apiServerUrl}/api/v1/houses/${payment.rental.house.houseId}`)
      .then((res)=>{
        setHouseName(res.data.name)
      })
      .then((err)=>{console.log(err)})
    }
    const getUserName = async () =>{
      const token = await getAccessTokenSilently()
      await axios.get(`${apiServerUrl}/api/v1/users/${payment.rental.user.userId}`,{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      .then((res)=>{
        setUserName(res.data.fullName)
      })
      .catch((err)=>{console.log(err)})
    }
    getHouseName()
    getUserName()
  },[apiServerUrl,getAccessTokenSilently])

  return (
    <>
      <Card
        style={{ width: "400px",height:"250px" }}
        className="border-effect mx-2 mb-3"
        onClick={() => setShow(1)}
      >
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            Payment of House {houseName}
            <FaEdit
              onClick={(e) => {
                e.stopPropagation();
                setShow(2);
              }}
            />
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            Payment ID: {payment.paymentId}
          </Card.Subtitle>
          <Card.Text>
            House owner name: {userName}
          </Card.Text>
          <Card.Text>Payment Date: {payment.date}</Card.Text>
          <Card.Text>Monthly Fee: $ {payment.amount}</Card.Text>
        </Card.Body>
      </Card>
      <Modal show={show > 0} onHide={() => setShow(0)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {show === 1 ? "Payment" : "Update payment"} of House&nbsp;
            {payment.rental.house.houseId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Start Date: {payment.rental.startDate}
            <br />
            End Date: {payment.rental.endDate}
            <br />
            Payment Date: {payment.date}
            <br />
            {show === 1 ? (
              <div>
                Monthly Fee: $ {payment.amount}
                <br />
                Note: {payment.note}
              </div>
            ) : (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Monthly Fee</Form.Label>
                  <Form.Control
                    placeholder="$"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    value={formData.note}
                    onChange={(e) =>
                      setFormData({ ...formData, note: e.target.value })
                    }
                  />
                </Form.Group>
              </Form>
            )}
          </p>
        </Modal.Body>
        <Modal.Footer>
          {show === 2 && <Button onClick={updatePayment}>Update</Button>}
          {show === 1 && (
            <Button variant="danger" onClick={deletePayment}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PaymentItem;
