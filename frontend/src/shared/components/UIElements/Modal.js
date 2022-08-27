import ReactDOM from "react-dom";
import styled from "styled-components";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

const ModalOverlay = (props) => {
  const content = (
    <StyledModal style={props.style}>
      <Header style={props.headerStyle}>
        <h2>{props.header}</h2>
      </Header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <Form style={props.contentStyle}>{props.children}</Form>
        <Footer style={props.footerStyle}>{props.footer}</Footer>
      </form>
    </StyledModal>
  );
  return ReactDOM.createPortal(content, document.querySelector("#modal"));
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

const Form = styled.div`
  padding: 1rem 0.5rem;
`;

const Footer = styled.footer`
  padding: 1rem 0.5rem;
`;

const Header = styled.header`
  width: 100%;
  padding: 1rem 0.5rem;
  background: #ff0055;
  color: white;

  & h2 {
    margin: 0.5rem;
  }
`;

const StyledModal = styled.div`
  z-index: 100;
  position: fixed;
  top: 22vh;
  left: 10%;
  width: 80%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 8px;

  @media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }
`;

export default Modal;
