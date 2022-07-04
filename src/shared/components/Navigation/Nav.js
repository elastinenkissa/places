import styled from "styled-components";
import { Link } from "react-router-dom";

import Main from "./Main";
import Links from "./Links";
import Side from "./Side";

const Nav = (props) => {
  return (
    <>
    <Side>
        <nav>
            <Links />
        </nav>
    </Side>
    <Main>
      <Button>
        <span />
        <span />
        <span />
      </Button>
      <Title>
        <Link to="/">Places</Link>
      </Title>

      <Links />
    </Main>
    </>
  );
};

const Button = styled.button`
  width: 3rem;
  height: 3rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 2rem;
  cursor: pointer;

  & span {
    display: block;
    width: 3rem;
    height: 2.5px;
    background: white;

    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const Title = styled.h1`
  color: white;

  & a {
    text-decoration: none;
    color: white;
  }
`;

// const Header = styled.nav`
// display: block;

//  & @media (min-width: 768px) {
//     display: none;
//   }
// `;


export default Nav;
