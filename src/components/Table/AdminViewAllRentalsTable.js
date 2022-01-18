import React, { useEffect, useMemo, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { SelectColumnFilter } from './Filter';
import TableContainer from './TableContainer';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { useEnv } from '../../context/env.context';
import { useNavigate } from 'react-router-dom';
import * as Icons from "react-icons/fa";

const AdminViewAllRentalsTable = () => {

    const { user, getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()

    const navigate = useNavigate();
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const fetchAllRentals = async () => {
            const token = await getAccessTokenSilently()
            // if userid is bigger than 21, they use oauth2
            await axios.get(`${apiServerUrl}/api/v1/rentals/search?pageSize=20000&orderBy=desc`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
                res.data.content.forEach((rental)=>{
                    setRentals((prevRental)=>[...prevRental,{
                        rentalId: rental.rentalId,
                        houseName: rental.house.name,
                        startDate: rental.startDate,
                        endDate: rental.endDate,
                        depositAmount: rental.depositAmount,
                        monthlyFee: rental.monthlyFee,
                        payableFee: rental.payableFee
                    }])
                })
            })
        }

        fetchAllRentals();
    }, []);

    const renderRowSubComponent = (row) => {
        return (
            <div style={{ width: '18rem', margin: '0 auto' }}>
                <Button variant="primary" onClick={navigate("/auth/admin/editRental/" + row.cells[1].value)}>Edit</Button>
            </div>
        );
    };
    // {/* <Button variant="primary" onClick={Navigate("/EditCategory/" + id)}>edit</Button> */ }
    const columns = useMemo(
        () => [
            {
                Header: () => null,
                id: 'expander', // 'id' is required
                Cell: ({ row }) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? <Icons.FaEdit /> : <Icons.FaEdit />}
                    </span>
                ),
            },
            {
                Header: 'User Name',
                accessor: 'userName',
            },
            {
                Header: 'House Name',
                accessor: 'houseName',
            },
            {
                Header: 'Start Date',
                accessor: 'startDate',
            },
            {
                Header: 'EndDate',
                accessor: 'endDate',
            },
            {
                Header: '($) Deposit Amount',
                accessor: 'depositAmount',
            },
            {
                Header: '($) Monthly Fee',
                accessor: 'monthlyFee',
            },
            {
                Header: '($) Payable Fee',
                accessor: 'payableFee',
            },
        ],
        []
    );

    return (
        <Container style={{ marginTop: 50, marginBottom: 50 }}>
            <TableContainer
                columns={columns}
                data={rentals}
                renderRowSubComponent={renderRowSubComponent}
            />
        </Container>
    );
};


export default AdminViewAllRentalsTable;