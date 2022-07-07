import styled from "styled-components";
import Card from "../../shared/components/UIElements/Card";

const PlaceItem = (props) => {
  return (
    <ListItem>
      <StyledCard>
        <Image>
          <img src={props.image} alt={props.title} />
        </Image>
        <Info>
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </Info>
        <Actions>
          <button>VIEW ON MAP</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </Actions>
      </StyledCard>
    </ListItem>
  );
};

const ListItem = styled.li`
  margin: 1rem 0;
`;

const Image = styled.div`
  width: 100%;
  height: 12.5rem;
  margin-right: 1.5rem;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    height: 20rem;
  }
`;

const Info = styled.div`
  padding: 1rem;
  text-align: center;

  & h2,
  & h3,
  & p {
    margin: 0 0 0.5rem 0;
  }
`;

const Actions = styled.div`
  padding: 1rem;
  text-align: center;
  border-top: 1px solid #ccc;

  & button,
  & a {
    margin: 0.5rem;
  }
`;

const StyledCard = styled(Card)`
  padding: 0;
`;

export default PlaceItem;
