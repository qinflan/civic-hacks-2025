import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchPage from './SearchPage';

const Header = styled.header`
  background-color: #3A2F27;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
`;

const HamburgerIcon = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;

  span {
    width: 2rem;
    height: 0.25rem;
    background-color: white;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ isOpen }) => (isOpen ? '0' : '1')};
      transform: ${({ isOpen }) => (isOpen ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #3A2F27;
  position: fixed;  // Change to fixed
  top: 78px;  // Add top positioning
  right: ${({ isOpen }) => (isOpen ? '0' : '-200px')};  // Change left to right
  width: 200px; // Set a smaller width for the menu
  transition: right 0.3s ease-in-out; // Smooth transition for opening/closing
  border-bottom: 5%;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin: 15px 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2em;

  &:hover {
    text-decoration: underline;
    color: #61dafb; /* Change color on hover if desired */
  }
`;

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Header>
        <Title>Species Explorer</Title>
        <SearchPage/>
        <HamburgerIcon onClick={toggleMenu} isOpen={isOpen}>
          <span></span>
          <span></span>
          <span></span>
        </HamburgerIcon>
      </Header>
      <Nav isOpen={isOpen}>
        <NavList>
          <NavItem>
            <StyledLink to="/" onClick={toggleMenu}>Home</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/map" onClick={toggleMenu}>Map</StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink to="/about" onClick={toggleMenu}>About</StyledLink>
          </NavItem>
        </NavList>
      </Nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
