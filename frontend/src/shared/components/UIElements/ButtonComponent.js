import React from "react";
import styled from "styled-components";
 
const ButtonComponent = (props) => {
  return <Button className={props.className} onClick={props.onClick}>{props.children}</Button>;
};

const Button = styled.button`
    cursor: pointer;
    border: 1px solid #292929;
    color: #292929;
    background: transparent;
    padding: 0.5rem;
    font: inherit;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background: #292929;
    color: white;
  }
`;

export default ButtonComponent;
