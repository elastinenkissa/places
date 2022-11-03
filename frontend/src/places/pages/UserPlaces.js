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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [uid]);

  const deleteHandler = async (id) => {
    try {
      await sendRequest(`/api/places/${id}`, 'DELETE');
      setPlaces(places.filter(place => place.id !== id))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorModal error={error} onClear={clearError} />}
      <PlaceList uid={uid} items={places} onDelete={deleteHandler} />
    </>
  );
};

export default UserPlaces;
