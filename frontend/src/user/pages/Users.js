import { useEffect, useState } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import UsersList from '../components/UsersList';

const Users = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users');
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setUsers(responseData);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      <ErrorModal error={error} onClear={() => setError(null)} />
      <UsersList items={users} loading={loading} />
    </>
  );
};

export default Users;
