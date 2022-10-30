import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const UserPlaces = () => {
  const { uid } = useParams();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/places/user/${uid}`
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setPlaces(responseData);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    fetchPlaces();
  }, [uid]);

  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorModal error={error} onClear={() => setError(null)} />}
      <PlaceList loading={loading} items={places} />
    </>
  );
};

export default UserPlaces;
