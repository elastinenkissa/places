import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import Nav from './shared/components/Navigation/Nav';
import UserPlaces from './places/pages/UserPlaces';
import EditPlace from './places/pages/EditPlace';
import Login from './user/pages/Login';
import { AuthContext } from './shared/context/auth-context';
import React, { useCallback, useState } from 'react';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <BrowserRouter>
        <Main>
          <Nav onLogout={logout} />
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/places/new" element={<NewPlace />} />
            <Route path="/:uid/places" element={<UserPlaces />} />
            <Route path="/places/:placeid" element={<EditPlace />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

const Main = styled.main`
  margin-top: 5rem;
`;

export default App;
