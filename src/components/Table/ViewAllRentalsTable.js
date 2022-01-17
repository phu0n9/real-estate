<<<<<<< HEAD
import React, { useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { SelectColumnFilter } from './Filter';
import TableContainer from './TableContainer';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { useEnv } from '../../context/env.context';

const ViewAllRentalsTable = () => {

    const { getAccessTokenSilently, user } = useAuth0()
    const { apiServerUrl, audience } = useEnv()
    const role = `${audience}/roles`

    const currentUserId =
        user.sub.length < 21
            ? user.sub.substring(user.sub.lastIndexOf("|") + 1, user.sub.length)
            : Math.trunc(
                user.sub.substring(
                    user.sub.lastIndexOf("|") + 1,
                    user.sub.length
                ) / 10000
            );
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const fetchAllRentals = async () => {
            let cnt = 0
            const token = await getAccessTokenSilently()
            console.log(token)
            // if userid is bigger than 21, they use oauth2
            await axios.get(`${apiServerUrl}/api/v1/rentals/search/byUser/${currentUserId}?pageSize=20000`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
                Promise.all(res.data.content.map(i =>
                    fetch(`${apiServerUrl}/api/v1/houses/${i.userHouse.houseId}`)
                )).then(res2 => Promise.all(res2.map(r => r.json())))
                    .then(result => {
                        Promise.all(res.data.content.map((it) => {
                            cnt = 0
                            result.map((data, i) => {
                                if (it.userHouse.houseId === result[i].houseId) {
                                    cnt += 1
                                    if (cnt === 1) {
                                        setRentals((prevList) =>
                                            [...prevList, {
                                                rentalId: it.rentalId,
                                                houseName: result[i].name,
                                                startDate: it.startDate,
                                                endDate: it.endDate,
                                                depositAmount: it.depositAmount,
                                                monthlyFee: it.monthlyFee,
                                                payableFee: it.payableFee
                                            }]
                                        )
                                    } else {
                                        cnt = 0
                                    }
                                }
                            })
                        }))
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

=======
import React, { useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { SelectColumnFilter } from './Filter';
import TableContainer from './TableContainer';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { useEnv } from '../../context/env.context';

const ViewAllRentalsTable = () => {

    const { getAccessTokenSilently, user } = useAuth0()
    const { apiServerUrl, audience } = useEnv()
    const role = `${audience}/roles`

    const currentUserId =
        user.sub.length < 21
            ? user.sub.substring(user.sub.lastIndexOf("|") + 1, user.sub.length)
            : Math.trunc(
                user.sub.substring(
                    user.sub.lastIndexOf("|") + 1,
                    user.sub.length
                ) / 10000
            );
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        const fetchAllRentals = async () => {
            let cnt = 0
            const token = await getAccessTokenSilently()
            console.log(token)
            // if userid is bigger than 21, they use oauth2
            await axios.get(`${apiServerUrl}/api/v1/rentals/search/byUser/${currentUserId}?pageSize=20000`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => {
                Promise.all(res.data.content.map(i =>
                    fetch(`${apiServerUrl}/api/v1/houses/${i.userHouse.houseId}`)
                )).then(res2 => Promise.all(res2.map(r => r.json())))
                    .then(result => {
                        Promise.all(res.data.content.map((it) => {
                            cnt = 0
                            result.map((data, i) => {
                                if (it.userHouse.houseId === result[i].houseId) {
                                    cnt += 1
                                    if (cnt === 1) {
                                        setRentals((prevList) =>
                                            [...prevList, {
                                                rentalId: it.rentalId,
                                                houseName: result[i].name,
                                                startDate: it.startDate,
                                                endDate: it.endDate,
                                                depositAmount: it.depositAmount,
                                                monthlyFee: it.monthlyFee,
                                                payableFee: it.payableFee
                                            }]
                                        )
                                    } else {
                                        cnt = 0
                                    }
                                }
                            })
                        }))
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

>>>>>>> dc52a23 (add)
export default ViewAllRentalsTable;