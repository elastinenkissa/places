import React from 'react';
import styled from 'styled-components';

const Card = (props) => {
  return (
    <CardContainer className={props.className}>{props.children}</CardContainer>
  );
};

const CardContainer = styled.div`
  @media (max-width: 845px) {
    height: 10rem;
  }
  margin: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 6px;
  padding: 1rem;
  overflow: hidden;
  background: white;
  padding: 0;
`;

export default Card;
