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

const ViewUserDeposit = () => {
    let pagination = [];
    // const { id } = useParams();
    const { user, getAccessTokenSilently } = useAuth0()
    const [uid, setUID] = useState(0);
    const { apiServerUrl } = useEnv()
    const [deposits, setDeposits] = useState([]);
    const [contentState, setContentState] = useState('');
    const [pageNum, setPageNum] = useState(0);
    const [sortParam, setSortParam] = useState('');
    const [orderParam, setOrderParam] = useState('');

    useEffect(() => {
        // get the calendar data
        const getUserDeposit = async () => {
            let split = (user.sub).split('|')
            let temp_id = Math.trunc(split[1])/10000;
            setUID(temp_id);

            const token = await getAccessTokenSilently();
            await axios.get(`${apiServerUrl}/api/v1/deposits/search/byUser/${temp_id}?pageNo=${pageNum}&sortBy=${sortParam}&orderBy=${orderParam}`, {
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
        getUserDeposit();
    }, []);

    const handlePageChange = async (event) => {
        let page = event.target.getAttribute("value");
        console.log(page);
        const token = await getAccessTokenSilently();
        await axios.get(`${apiServerUrl}/api/v1/deposits/search/byUser/${uid}?pageNo=${page}&sortBy=${sortParam}&orderBy=${orderParam}`, {
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

    // Set Pagination Bar
    for (let number = 0; number <= 5; number++) {
        pagination.push(
            <Pagination.Item key={number} value={number} onClick={handlePageChange}>
            {number}
            </Pagination.Item>,
        );
    }

    return (
        <div style={{ position: "relative", width: "90%", padding: "10px 20px", margin: "0 auto", letterSpacing: "-.2px", boxShadow: "5px 10px 8px #888888" }}>
            <div style={{ paddingLeft: "110px" }}>
                <br/>
                <br/>
                <br/>
                <br/>
                <h2>
                    View My House Deposits
                </h2>
                <br/>
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
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    {pagination}    
                </Pagination>
            </div>
        </div>
    );
};

export default withAuthenticationRequired(ViewUserDeposit, {
    onRedirecting: () => <Loader />,
})