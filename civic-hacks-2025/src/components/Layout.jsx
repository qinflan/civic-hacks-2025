import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  background-color: #282c34;
  padding: 20px 0;
  text-align: center;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
`;

const Nav = styled.nav`
  background-color: #20232a;
  padding: 10px 0;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
`;

const NavItem = styled.li`
  margin: 0 15px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <Title>Species Explorer</Title>
      </Header>
      <Nav>
        <NavList>
          <NavItem>
            <StyledLink to="/">Home</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/search">Search</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/about">About</StyledLink>
          </NavItem>
        </NavList>
      </Nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
