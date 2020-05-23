import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import ReactGA from "react-ga";
import StyledLink from "./StyledLink";
import StyledDropdownLink from "./StyledDropdownLink";
import Button from "react-bootstrap/Button";
import "./NavBar.css";

const lastPage = localStorage.getItem("prevUrl");

export default function NavBar(props) {
  const [page, setPage] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (e, { name }) => setActiveItem(name);

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

  const printTing = (e) => {
    console.log(e.target.name);
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
                <Nav.Link>
                  <StyledLink
                    name="/leaderboard"
                    onClick={handleNavChange}
                    to="/leaderboard"
                  >
                    Leaderboard
                  </StyledLink>
                </Nav.Link>
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

      {/* <NavLink to="/">
        <button
          onClick={handleActiveBtnChange}
          name="/"
          className={page === "/" ? "nav-btn active" : "nav-btn"}
        >
          Home
        </button>
      </NavLink>
      {currentUser && userData && userData.coach && (
        <NavLink to="/createclass">
          <button
            onClick={handleActiveBtnChange}
            name="/createclass"
            className={page === "/createclass" ? "nav-btn active" : "nav-btn"}
          >
            Create Class
          </button>
        </NavLink>
      )}
      {currentUser && userData && userData.coach && (
        <NavLink to="/createptsession">
          <button
            onClick={handleActiveBtnChange}
            name="/createptsession"
            className={
              page === "/createptsession" ? "nav-btn active" : "nav-btn"
            }
          >
            Create PT Session
          </button>
        </NavLink>
      )}
      {currentUser && userData && userData.coach && (
        <NavLink to="/clients">
          <button
            onClick={handleActiveBtnChange}
            name="/clients"
            className={page === "/clients" ? "nav-btn active" : "nav-btn"}
          >
            Clients
          </button>
        </NavLink>
      )}
      {currentUser && userData && !userData.coach && (
        <NavLink to="/classes">
          <button
            onClick={handleActiveBtnChange}
            name="/classes"
            className={page === "/classes" ? "nav-btn active" : "nav-btn"}
          >
            Book Class
          </button>
        </NavLink>
      )}
      {currentUser && userData && !userData.coach && (
        <NavLink to="/buypasses">
          <button
            onClick={handleActiveBtnChange}
            name="/buypasses"
            className={page === "/buypasses" ? "nav-btn active" : "nav-btn"}
          >
            Buy Passes
          </button>
        </NavLink>
      )}
      {currentUser && userData && !userData.coach && (
        <NavLink to="/leaderboard">
          <button
            onClick={handleActiveBtnChange}
            name="/leaderboard"
            className={page === "/leaderboard" ? "nav-btn active" : "nav-btn"}
          >
            Leaderboard
          </button>
        </NavLink>
      )}
      {currentUser && (
        <NavLink to="/profile">
          <button
            onClick={handleActiveBtnChange}
            name="/profile"
            className={page === "/profile" ? "nav-btn active" : "nav-btn"}
          >
            Profile
          </button>
        </NavLink>
      )}
      {currentUser ? (
        <button className="nav-btn" onClick={props.logout}>
          Log Out
        </button>
      ) : (
        <NavLink to="/login">
          <button
            onClick={handleActiveBtnChange}
            name="/login"
            className={page === "/login" ? "nav-btn active" : "nav-btn"}
          >
            Log In
          </button>
        </NavLink>
      )}
      <h3 className="logo-2">WOD WITH FARIS</h3> */}
    </div>
  );
}
