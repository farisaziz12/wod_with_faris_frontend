import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import ReactGA from "react-ga";
import StyledLink from "./StyledLink";
import StyledDropdownLink from "./StyledDropdownLink";
import Button from "react-bootstrap/Button";

const lastPage = localStorage.getItem("prevUrl");

export default function NavBar(props) {
  // eslint-disable-next-line
  const [page, setPage] = useState(null);

  useEffect(() => {
    setPage(lastPage ? lastPage : "/");
  }, []);

  const handleNavChange = (e) => {
    setPage(e.target.name);
    if (e.target.name === "/") {
      props.setHome(true);
      localStorage.setItem("prevUrl", "/");
    } else {
      localStorage.setItem("prevUrl", e.target.name);
      props.setHome(false);
    }
    props.userData &&
      ReactGA.event({
        category: "User",
        action: `${
          props.userData.first_name + " " + props.userData.last_name
        } looked at ${e.target.name}`,
      });
  };

  const { currentUser, userData } = props;
  return (
    <div className="nav-bar">
      <Navbar collapseOnSelect expand="lg" bg="#243b55" variant="dark">
        <Navbar.Brand>WOD-WITH-FARIS</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <StyledLink name="/" onClick={handleNavChange} to="/">
                Home
              </StyledLink>
            </Nav.Link>
            <Nav.Link>
              <StyledLink name="/about" onClick={handleNavChange} to="/about">
                About
              </StyledLink>
            </Nav.Link>
            {currentUser && (
              <Nav.Link>
                <StyledLink
                  name="/profile"
                  onClick={handleNavChange}
                  to="/profile"
                >
                  Profile
                </StyledLink>
              </Nav.Link>
            )}
            {currentUser && userData && userData.coach && (
              <>
                <Nav.Link>
                  <StyledLink
                    name="/clients"
                    onClick={handleNavChange}
                    to="/clients"
                  >
                    Clients
                  </StyledLink>
                </Nav.Link>
                <NavDropdown title="Create" id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <StyledDropdownLink
                      name="/createclass"
                      onClick={handleNavChange}
                      to="/createclass"
                    >
                      Class
                    </StyledDropdownLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <StyledDropdownLink
                      name="/createptsession"
                      onClick={handleNavChange}
                      to="/createptsession"
                    >
                      PT Session
                    </StyledDropdownLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {currentUser && userData && !userData.coach && (
              <>
                <NavDropdown title="Classes" id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <StyledDropdownLink
                      name="/classes"
                      onClick={handleNavChange}
                      to="/classes"
                    >
                      Book Class
                    </StyledDropdownLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <StyledDropdownLink
                      name="/buypasses"
                      onClick={handleNavChange}
                      to="/buypasses"
                    >
                      Buy Passes
                    </StyledDropdownLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <Nav.Link>
                <Button onClick={props.logout} variant="secondary">
                  Log Out
                </Button>
              </Nav.Link>
            ) : (
              <Nav.Link>
                <StyledLink name="/login" to="/login">
                  <Button variant="primary" onClick={handleNavChange}>
                    Log In
                  </Button>
                </StyledLink>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
