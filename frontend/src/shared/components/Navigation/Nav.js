import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import Main from "./Main";
import Links from "./Links";
import Side from "./Side";
import Backdrop from "../UIElements/Backdrop";

const Nav = (props) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      {drawerOpen && <Backdrop onClick={closeDrawer}></Backdrop>}
      <Side show={drawerOpen}>
        <StyledNav>
          <Links onClickLink={closeDrawer} onCloseDrawer={closeDrawer} />
        </StyledNav>
      </Side>

      <Main>
        <Button onClick={setDrawerOpen}>
          <span />
          <span />
          <span />
        </Button>
        <Title>
          <Link to="/">Places</Link>
        </Title>
        <Links isDesktop={true} onClick={props.onLogout} />
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
  }

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

const StyledNav = styled.nav`
  background: white;
  height: 100%;
  width: 15rem;
`;

export default Nav;
