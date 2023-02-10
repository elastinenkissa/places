import React from 'react';
import styled from 'styled-components';

import UserItem from './UserItem';
 
const UsersList = (props) => {
  return (
    <List>
      {props.items?.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            placeCount={user.places.length}
          />
        );
      })}
    </List>
  );
};

const List = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export default UsersList;
