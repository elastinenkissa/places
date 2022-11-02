import React, { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttp } from '../../shared/hooks/useHttp';
import UsersList from '../components/UsersList';

const Users = () => {
  const [users, setUsers] = useState();
  const { loading, error, sendRequest, clearError } = useHttp();

  const fetchUsers = async () => {
    try {
      const data = await sendRequest('/api/users');
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      <ErrorModal error={error} onClear={clearError} />
      <UsersList items={users} />
    </>
  );
};

export default Users;
