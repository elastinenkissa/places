import styled from "styled-components";
import Button from "../../shared/components/FormElements/Button";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return ( 
      <NoPlaces>
        <h2>No places found.</h2>
        <Button>Add a place</Button>
      </NoPlaces>
    );
  }

  return (
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
          />
        );
      })}
    </List>
  );
};

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
