import React, { useEffect, useMemo, useState } from 'react';
import { Container } from 'react-bootstrap';
import { SelectColumnFilter } from './Filter';
import TableContainer from './TableContainer';
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react';
import { useEnv } from '../../context/env.context';

const ViewAllUsersTable = () => {

    const { user, getAccessTokenSilently } = useAuth0()
    const { audience, apiServerUrl } = useEnv()
    const role = `${audience}/roles`

    const [data, setData] = useState([]);

    const fetchAllUsers = async () => {
        const token = await getAccessTokenSilently()
        const response = await axios.get(`${apiServerUrl}/api/v1/users`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        setData(response.data);
    }

    console.log(data)
    useEffect(() => {
        fetchAllUsers();
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'userId',
                Filter: SelectColumnFilter,
                filter: 'equals',
            },
            {
                Header: 'Name',
                accessor: 'fullName',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Phone Number',
                accessor: 'phoneNumber',
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

export default ViewAllUsersTable;