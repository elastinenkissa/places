import styled from "styled-components";

const Main = (props) => {
  return <Header>
    {props.children}
  </Header>;
};

const Header = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: #ff0055;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
  padding: 0 1rem;
  z-index: 5;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;



export default Main;
