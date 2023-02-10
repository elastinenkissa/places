import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';
import PlaceItem from './PlaceItem';

const PlaceList = (props) => {
  const auth = useContext(AuthContext);
 
  if (props.items.length === 0 && !props.loading) {
    return (
      <NoPlaces>
        <h2>No places found.</h2>
        {auth.user?.id === props.uid && (
          <Link to="/places/new">
            <Button>Add a place</Button>
          </Link>
        )}
      </NoPlaces>
    );
  }

  return (
    <Container>
      <List>
        {props.items?.map((place) => {
          return (
            <PlaceItem
              key={place.id}
              id={place.id}
              image={place.image}
              title={place.title}
              description={place.description}
              address={place.address}
              poster={place.poster}
              coordinates={place.location}
              onDelete={() => props.onDelete(place.id)}
            />
          );
        })}
      </List>
      {auth.user?.id === props.uid && (
        <Link style={{ marginBottom: 15 }} to="/places/new">
          <Button>ADD MORE</Button>
        </Link>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.ul`
  list-style: none;
  margin: 1rem auto;
  padding: 0;
  width: 90%;
  max-width: 40rem;
`;

const NoPlaces = styled.div`
  margin: 7rem auto 0 auto;
  text-align: center;
  width: 25rem;

  & h2 {
    color: white;
  }
`;

export default PlaceList;
