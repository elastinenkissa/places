import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Links = (props) => {
  return (
    <List>
      <li>
        <NavLink to="/" exact>ALL USERS</NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">ADD PLACE</NavLink>
      </li>
      <li>
        <NavLink to="/auth">LOGIN</NavLink>
      </li>
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

  & a:hover,
  & a:active {
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

  & button:hover,
  & button:active {
    background: #292929;
    color: white;
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

    & button:hover,
    & button:active {
      background: #f8df00;
      color: #292929;
    }
  }
`;

export default Links;
