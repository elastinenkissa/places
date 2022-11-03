import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttp } from '../../shared/hooks/useHttp';

const UserPlaces = () => {
  const { uid } = useParams();
  const [places, setPlaces] = useState([]);
  const { loading, error, sendRequest, clearError } = useHttp();

  const fetchPlaces = async () => {
    try {
      const data = await sendRequest(`/api/places/user/${uid}`);
      setPlaces(data);
      console.log(places);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      <PlaceList items={places} />
    </>
  );
};

export default UserPlaces;
