import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import Nav from "./shared/components/Navigation/Nav";
import UserPlaces from "./places/pages/UserPlaces";
import Place from "./places/pages/Place";

const App = () => {
  return (
    <BrowserRouter>
      <Main>
        <Nav />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/new" element={<NewPlace />} />
          <Route path="/:uid/places" exact element={<UserPlaces />} />
          <Route path="/places/:placeid" exact element={<Place />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.main`
  margin-top: 5rem;
`;

export default App;
