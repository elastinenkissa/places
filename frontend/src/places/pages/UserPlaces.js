import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttp } from '../../shared/hooks/useHttp';
import styled from 'styled-components';
import { AuthContext } from '../../shared/context/auth-context';

const UserPlaces = () => {
  const { uid } = useParams();
  const [places, setPlaces] = useState([]);
  const { loading, error, sendRequest, clearError } = useHttp();
  const auth = useContext(AuthContext);

  const fetchPlaces = async () => {
    try {
      const data = await sendRequest(`/api/places/user/${uid}`);
      setPlaces(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [uid]);

  const deleteHandler = async (id) => {
    try {
      await sendRequest(`/api/places/${id}`, 'DELETE', null, {
        Authorization: `Bearer ${auth.user.token}`,
      });
      setPlaces(places.filter((place) => place.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <PlaceList uid={uid} items={places} onDelete={deleteHandler} />
    </>
  );
};

export default UserPlaces;

const NoPlaces = styled.div`
  margin: 7rem auto 0 auto;
  text-align: center;
  width: 25rem;

  & h2 {
    color: white;
  }
`;
