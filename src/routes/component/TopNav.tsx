import styled from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom } from "../../atoms";
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Moon } from '@styled-icons/bootstrap/Moon'
import { SunFill } from '@styled-icons/bootstrap/SunFill'
import { Link } from "react-router-dom";

const Title = styled(Link)`
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const DardMode = styled(SunFill)`
  height: 20px;
  color: black;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`
const LightMode = styled(Moon)`
  height: 20px;
  color: white;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`

function TopNav() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);

  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Navbar sticky="top" bg={isDark ? "light" : "dark"} expand="lg" variant={isDark ? "light" : "dark"} >
      <Container>
        <Navbar.Brand><Title to={`/coin_tracker`}>Coin Tracker</Title></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* <Nav.Link href="#home">Home</Nav.Link> */}
          {/* <Nav.Link href="#link">Link</Nav.Link> */}
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown"> */}
          {/* <NavDropdown.Item href="#action/3.1">Not</NavDropdown.Item> */}
          {/* <NavDropdown.Item href="#action/3.2">working</NavDropdown.Item> */}
          {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
          {/* <NavDropdown.Divider /> */}
          {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
          {/* </NavDropdown> */}
        </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {isDark ? <DardMode onClick={toggleDarkAtom} /> : <LightMode onClick={toggleDarkAtom} /> }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;