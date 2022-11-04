import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttp } from '../../shared/hooks/useHttp';
import UsersList from '../components/UsersList';
import styled from 'styled-components';

const Users = () => {
  const [users, setUsers] = useState();
  const { loading, error, sendRequest, clearError } = useHttp();

  const fetchUsers = async () => {
    try {
      const data = await sendRequest('http://localhost:5000/api/users');
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!users && !error) {
    return (
      <NoUsers>
        <h2>No users available.</h2>
      </NoUsers>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <UsersList items={users} />
    </>
  );
};

export default Users;

const NoUsers = styled.div`
  margin: 7rem auto 0 auto;
  text-align: center;
  width: 25rem;

  & h2 {
    color: white;
  }
`;
