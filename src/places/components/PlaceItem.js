import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ButtonComponent from "../../shared/components/UIElements/ButtonComponent";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);

  const openMap = () => setShowMap(true);

  const closeMap = () => setShowMap(false);

  const contentStyle = { padding: 0 };

  const footerStyle = { textAlign: "right" };

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        contentStyle={contentStyle}
        footerStyle={footerStyle}
        footer={<ButtonComponent onClick={closeMap}>CLOSE</ButtonComponent>}
      >
        <Map>
            <h2>THE MAP!</h2>
        </Map>
      </Modal>
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
            <MapButton onClick={openMap}>VIEW ON MAP</MapButton>
            <Link to={`/places/${props.id}`}>
              <EditButton>EDIT</EditButton>
            </Link>
            <DeleteButton>DELETE</DeleteButton>
          </Actions>
        </StyledCard>
      </ListItem>
    </>
  );
};

const Map = styled.div`
  height: 15rem;
  width: 100%;
`;

const MapButton = styled(ButtonComponent)`
  color: #ff0055;
  border-color: #ff0055;

  &:hover {
    color: white;
    background-color: #ff0055;
  }
`;

const EditButton = styled(ButtonComponent)`
  color: white;
  background: #ff0055;
  border-color: #ff0055;

  &:hover {
    background-color: #ff3377;
    border-color: #ff3377;
  }
`;

const DeleteButton = styled(ButtonComponent)`
  color: white;
  background: #830000;
  border-color: #830000;

  &:hover {
    background-color: #bb0000;
    border-color: #bb0000;
  }
`;

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
