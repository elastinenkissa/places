import styled from "styled-components";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

const UserItem = (props) => {
  return (
    <ListItem>
        <Card>
          <Link to={`/${props.id}/places`} >
            <Image>
              <Avatar image={props.image} alt={props.name} />
            </Image>
            <Info>
              <h2>{props.name}</h2>
              <h3>
                {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
              </h3>
            </Info>
          </Link>
        </Card>
    </ListItem>
  );
};

const ListItem = styled.li`
  margin: 1rem;
  width: calc(45% - 2rem);
  min-width: 17.5rem;

  & a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    padding: 1rem;
    color: white;
    background: #292929;
  }

  &:hover a,
  &:active a {
    background: #ffd900;
  }
`;

const Image = styled.div`
  width: 4rem;
  height: 4rem;
  margin-right: 1rem;
`;

const Info = styled.div`
  & h2 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
    font-weight: normal;
    color: #ffd900;
  }

  & h3 {
    margin: 0;
  }

  &:hover h2,
  &:hover h3,
  &:active h2,
  &:active h3 {
    color: #292929;
  }
`;

export default UserItem;
