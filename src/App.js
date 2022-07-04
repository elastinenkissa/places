import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import Nav from "./shared/components/Navigation/Nav";

const App = () => {
  return (
    <BrowserRouter>
      <Main>
        <Nav />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/new" element={<NewPlace />} />
        </Routes>
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.main`
  margin-top: 5rem;
`;

export default App;
