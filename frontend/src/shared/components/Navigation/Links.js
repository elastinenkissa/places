import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import React, { useContext } from "react";

const Links = (props) => {
  const auth = useContext(AuthContext);

  const activeStyle = {
    background: "#f8df00",
    borderColor: "#292929",
    color: "#292929",
  };

  const activeLink = ({ isActive }) => (isActive ? activeStyle : undefined);

  const logoutHandler = () => {
    auth.logout();
  };

  return (
    <List desktop={props.isDesktop}>
      <CloseButton onClick={props.onCloseDrawer}>X</CloseButton>
      <li onClick={props.onCloseDrawer}>
        <NavLink to="/" exact="true" style={activeLink}>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li onClick={props.onCloseDrawer}>
          <NavLink to="/u1/places" style={activeLink}>
            MY PLACES
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li onClick={props.onCloseDrawer}>
          <NavLink to="/places/new" style={activeLink}>
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li onClick={props.onCloseDrawer}>
          <NavLink to="/login" style={activeLink}>
            LOGIN
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li onClick={props.onCloseDrawer}>
          <Link onClick={logoutHandler} to="/">
            LOGOUT
          </Link>
        </li>
      )}
    </List>
  );
};

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & li {
    margin: 1rem;
  }

  & a {
    border: 1px solid transparent;
    color: #292929;
    text-decoration: none;
    padding: 0.5rem;
  }

  & a:hover {
    background: #f8df00;
    border-color: #292929;
    color: #292929;
  }

  & button {
    cursor: pointer;
    border: 1px solid #292929;
    color: #292929;
    background: transparent;
    padding: 0.5rem;
    font: inherit;
  }

  & button:focus {
    outline: none;
  }

  & button:hover {
    background: #292929;
    color: white;
  }

  @media (max-width: 768px) {
    display: ${(props) => (props.desktop ? `none` : `flex`)};
  }

  @media (min-width: 768px) {
    flex-direction: row;

    & li {
      margin: 0 0.5rem;
    }

    & a {
      color: white;
      text-decoration: none;
    }

    & button {
      border: 1px solid white;
      color: white;
      background: transparent;
    }

    & button:hover {
      background: #f8df00;
      color: #292929;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

export default Links;
