import React from "react";
import ReactDOM from "react-dom";

import styled from "styled-components";

const Backdrop = (props) => {
  const content = <StyledBackdrop onClick={props.onClick}></StyledBackdrop>;

  return ReactDOM.createPortal(content, document.querySelector("#backdrop"));
};

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;

export default Backdrop;
