import styled from "styled-components";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <>
        <Card>No places found.</Card>
        <button>Add a place</button>
      </>
    );
  }

  return (
    <List>
      {props.items.map((place) => {
        return (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imgUrl}
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

export default PlaceList;
