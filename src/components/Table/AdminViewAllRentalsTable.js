import React, { useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { SelectColumnFilter } from './Filter';
import TableContainer from './TableContainer';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { useEnv } from '../../context/env.context';

const AdminViewAllRentalsTable = () => {

    const { user, getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()
    const role = `${audience}/roles`

    const [data, setData] = useState([]);

    const fetchAllUsers = async () => {
        const token = await getAccessTokenSilently()
        const response = await axios.get(`${apiServerUrl}/api/v1/rentals/search?pageSize=20000`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        setData(response.data.content);
    }

    console.log(data)
    useEffect(() => {
        fetchAllUsers();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'rentalId',
                Filter: SelectColumnFilter,
                filter: 'equals',
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
                Header: 'Deposit Amount ($)',
                accessor: 'depositAmount',
            },
            {
                Header: 'Monthly Fee ($)',
                accessor: 'monthlyFee',
            },
            {
                Header: 'Payable Fee ($)',
                accessor: 'payableFee',
            },
        ],
        []
    );
    return (
        <Container style={{ marginTop: 50 }}>
            <TableContainer
                columns={columns}
                data={data}
            />
        </Container>
    );
};

export default AdminViewAllRentalsTable;