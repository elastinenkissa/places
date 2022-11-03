import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);

  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const openMap = () => setShowMap(true);

  const closeMap = () => setShowMap(false);

  const contentStyle = { padding: 0 };

  const footerStyle = { textAlign: 'right' };

  const deleteHandler = () => {
    setShowDelete(true);
  };

  const cancelDeleteHandler = () => {
    setShowDelete(false);
  };

  const confirmDeleteHandler = () => {
    console.log('bazinga');
  };

  const ownedPlace = auth.user?.places?.find((placeId) => placeId === props.id);

  return (
    <>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={props.address}
        contentStyle={contentStyle}
        footerStyle={footerStyle}
        footer={<Button onClick={closeMap}>CLOSE</Button>}
      >
        <MapContainer>
          <Map center={props.coordinates} zoom={16} />
        </MapContainer>
      </Modal>
      <Modal
        show={showDelete}
        onCancel={cancelDeleteHandler}
        header={'Are you sure?'}
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>Deletion is irreversible</p>
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
            <Button inverse onClick={openMap}>
              VIEW ON MAP
            </Button>
            {ownedPlace && (
              <Link to={`/places/${props.id}`}>
                <Button>EDIT</Button>
              </Link>
            )}
            {ownedPlace && (
              <Button danger onClick={deleteHandler}>
                DELETE
              </Button>
            )}
          </Actions>
        </StyledCard>
      </ListItem>
    </>
  );
};

const MapContainer = styled.div`
  height: 15rem;
  width: 100%;
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
