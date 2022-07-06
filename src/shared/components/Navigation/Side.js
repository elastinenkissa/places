import styled from "styled-components";
import ReactDOM from "react-dom";

const Side = (props) => {
  const content = <SideContainer>{props.children}</SideContainer>;

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
