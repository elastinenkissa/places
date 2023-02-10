import styled from "styled-components";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import React from "react";
 
const Side = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <SideContainer onClick={props.onClick}>{props.children}</SideContainer>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.querySelector("#drawer"));
};

const SideContainer = styled.aside`
 position: fixed;
 left: 0;
 top: 0;
 z-index: 100;
 height: 100vh;
 width: 70%
 background: white;
 box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);

 @media (min-width: 768px) {
  display: none;
 }
 }
`;

export default Side;
