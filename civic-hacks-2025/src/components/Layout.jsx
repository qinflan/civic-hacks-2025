import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchPage from './SearchPage';
import { IoMenu } from "react-icons/io5";
import { SiTreehouse } from "react-icons/si";


const Header = styled.header`
  background-color: #3A2F27;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #FFECDB;
  margin: 0;
  display: flex;
  align-items:center;
  gap: 8px;
`;

const Hamburger = styled.div`
  color: #FFECDB;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 999;
  background-color: #3A2F27;
  position: fixed;  // Change to fixed
  border-radius: 20px;
  top: 110px;  // Add top positioning
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
  color: #FFECDB;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2em;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    text-decoration: underline;
    opacity: 60%;
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
        <Title>ecoquest<SiTreehouse /></Title>
        <SearchPage/>
        <Hamburger><IoMenu size={36} onClick={toggleMenu} isOpen={isOpen}/></Hamburger>
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
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;
