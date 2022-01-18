import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { SelectColumnFilter } from './Filter';
import TableContainer from './TableContainer';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { useEnv } from '../../context/env.context';
import { UserContext } from '../../App';

const ViewAllRentalsTable = () => {

    const { getAccessTokenSilently, user } = useAuth0()
    const { apiServerUrl } = useEnv()
    const currentUserId = useContext(UserContext)
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const fetchAllRentals = async () => {
            const token = await getAccessTokenSilently()
            // if userid is bigger than 21, they use oauth2
            await axios.get(`${apiServerUrl}/api/v1/rentals/search/byUser/${currentUserId}?pageSize=20000`, {
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

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'rentalId',
                Filter: SelectColumnFilter,
                filter: 'equals',
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
        <Container style={{ marginTop: 50 }}>
            <TableContainer
                columns={columns}
                data={rentals}
            />
        </Container>
    );
};

export default ViewAllRentalsTable;