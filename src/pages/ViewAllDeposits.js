import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import axios from 'axios'
import { useEnv } from '../context/env.context'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { Navigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

const ViewAllDeposit = () => {
    const [pagination, setPagination] = useState([])
    const { user, getAccessTokenSilently } = useAuth0()
    const { audience } = useEnv()
    const role = `${audience}/roles`    
    const navigate = useNavigate();
    const { apiServerUrl } = useEnv()
    const [deposits, setDeposits] = useState([]);
    const [searchHouseId, setSearchHouseId] = useState('');
    const [contentState, setContentState] = useState('');
    const [pageNum, setPageNum] = useState(0);
    const [sortParam, setSortParam] = useState('');
    const [orderParam, setOrderParam] = useState('');

    useEffect(() => {
        // Get The Deposit Data
        const getDepositsData = async () => {
            const token = await getAccessTokenSilently();
            await axios.get(`${apiServerUrl}/api/v1/deposits/search?pageNo=${pageNum}&sortBy=${sortParam}&orderBy=${orderParam}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
            console.log(res);
            let content = res.data;

            // Set Pagination
            if (content.totalPages === 1) setPagination([1]);
            else {
                for (let i = 1; i <= content.totalPages; i++) 
                pagination.push(i);
        }

            if (content.content.length === 0) {
                setContentState('No Result');
                setDeposits([]);
            }
            else {
                setDeposits(content.content);
                setContentState('');
            }
        })
        .catch(error => console.log(error));

        }
        getDepositsData();
    }, []);

    // if logged in user is not admin
    if (user[role].length === 0) {
        return (
            <>
                <Navigate replace to="/auth/viewUserDeposit" />
            </>
        )
    }

    const handleForm = (event) => {
        setSearchHouseId(event.target.value);
    }

    const handleSearch = async () => {
        const token = await getAccessTokenSilently()
        await axios.get(`${apiServerUrl}/api/v1/deposits/search/byHouse/${searchHouseId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => {
            let content = res.data.content;
            console.log(content);
            if (content.length === 0) {
                setContentState('No Result');
                setDeposits([]);
            }
            else {
                setDeposits(content);
                setContentState('');
            }
                
        })
        .catch(error => console.log(error));
    }

    const getUpdatedDeposits = async () => {
        const token = await getAccessTokenSilently();
            await axios.get(`${apiServerUrl}/api/v1/deposits/search?pageNo=${pageNum}&sortBy=${sortParam}&orderBy=${orderParam}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
            console.log(res);
            let content = res.data;

            if (content.content.length === 0) {
                setContentState('No Result');
                setDeposits([]);
            }
            else {
                setDeposits(content.content);
                setContentState('');
            }
        })
        .catch(error => console.log(error));
            
    }

    const handlePageChange = async (event) => {
        let page = event.target.getAttribute("value");
        console.log(page);
        const token = await getAccessTokenSilently();
        await axios.get(`${apiServerUrl}/api/v1/deposits/search?pageNo=${page}&sortBy=${sortParam}&orderBy=${orderParam}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            let content = res.data.content;
            if (content.length === 0) {
                setContentState('No Result');
                setDeposits([]);
            }
            else {
                setDeposits(content);
                setContentState('');
            }
        })
        .catch(error => console.log(error));
        setPageNum(page);
    }

    const deleteDeposit = async (event) => {
        const deleteId = event.target.value;
        const token = await getAccessTokenSilently();
        await axios.delete(`${apiServerUrl}/api/v1/deposits/${deleteId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            getUpdatedDeposits();
        })
        .catch(error => console.log(error));
    }

    const handleOrder = async (event) => {
        setOrderParam(event.target.value);
        const token = await getAccessTokenSilently();
        await axios.get(`${apiServerUrl}/api/v1/deposits/search?pageNo=${pageNum}&sortBy=${sortParam}&orderBy=${orderParam}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res);
            let content = res.data.content;
            if (content.length === 0) {
                setContentState('No Result');
                setDeposits([]);
            }
            else {
                setDeposits(content);
                setContentState('');
            }
        })
        .catch(error => console.log(error));
    }

    const editDeposit = (event) => {
        navigate("/auth/admin/editDeposit/" + event.target.value)
    }

    return (
        <div style={{ position: "relative", width: "90%", padding: "10px 20px", margin: "0 auto", letterSpacing: "-.2px", boxShadow: "5px 10px 8px #888888" }}>
            <div style={{ paddingLeft: "110px" }}>
                <br/>
                <br/>
                <br/>
                <br/>
                <h2>
                    View All House Deposits
                </h2>
                <br/>
                <div>
                    <Container>
                        <Row>
                            <Col xs={2} md={2} lg={4}>
                                <Form.Label>Sort Deposits By</Form.Label>
                                <Form.Select aria-label="house-type-select" value={orderParam} onChange={handleOrder}>
                                    <option value="">Default Order</option>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </Form.Select>
                            </Col>
                            <Col xs={2} md={2} lg={5}>
                                <Form.Label>Search By House ID</Form.Label>
                                <input type="text" value={searchHouseId} style={{width: 500, height: 38}} onChange={handleForm} placeholder='Please Enter House Id'/>
                            </Col>  
                            <Col xs={2} md={2} lg={2.5}>
                                <Button style={{height: 50, width: 200, marginTop: 20}} variant="secondary" onClick={handleSearch} placeholder='Please Enter House Id'>Search</Button>{' '}
                            </Col>
                        </Row>
                    </Container>
                </div>
                <h5>
                    {contentState === 'No Result' ? 'There are no deposits that match your query. Please try something else.' : ''}
                </h5>
                <br/>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Deposit Id</th>
                            <th>User Id</th>
                            <th>House Id</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>House Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deposits.map((deposit) => (
                            <tr>
                                <td>{deposit.depositId}</td>
                                <td>{deposit.userHouse.userId}</td>
                                <td>{deposit.userHouse.houseId}</td>
                                <td>{deposit.amount}</td>
                                <td>{deposit.date}</td>
                                <td>{deposit.time}</td>
                                <td>{deposit.note}</td>
                                <td>
                                <Button onClick={editDeposit} value={deposit.depositId}>Edit</Button>
                                </td>
                                <td>
                                <Button variant="danger" onClick={deleteDeposit} value={deposit.depositId}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    {pagination.map((page) => (
                        <Pagination.Item key={page} value={page} active={page === pageNum} onClick={handlePageChange}>
                        {page}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>
        </div>
    );
};

export default withAuthenticationRequired(ViewAllDeposit, {
    onRedirecting: () => <Loader />,
})