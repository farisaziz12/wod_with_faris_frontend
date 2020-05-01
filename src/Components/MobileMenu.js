import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import StyledLink from './StyledLink.js';
import './NavBar.css'

export default function MobileMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    
    if (e.target.textContent === 'Create Class'){
      localStorage.setItem('prevUrl', '/createclass')
    } else if(e.target.textContent === 'Clients') {
      localStorage.setItem('prevUrl', '/clients')
    } else if(e.target.textContent === 'Book Class') {
      localStorage.setItem('prevUrl', '/classes')
    } else if(e.target.textContent === 'Buy Passes') {
      localStorage.setItem('prevUrl', '/buypasses')
    } else if(e.target.textContent === 'Leaderboard') {
      localStorage.setItem('prevUrl', '/leaderboard')
    } else if(e.target.textContent === 'Profile') {
      localStorage.setItem('prevUrl', '/profile')
    } else if(e.target.textContent === 'Home') {
      localStorage.setItem('prevUrl', null)
    }
  };

  const { currentUser, userData, logout } = props

  return (
    <div className='menu'>
      <Button  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <h3 className='menu-h3'>Menu</h3>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledLink  to='/'><MenuItem onClick={handleClose}>Home</MenuItem></StyledLink>
        {currentUser&& userData&& userData.coach&&
            <StyledLink  to='/createclass'><MenuItem onClick={handleClose}><p>Create Class</p></MenuItem></StyledLink>
        }
        {currentUser&& userData&& userData.coach&&
            <StyledLink  to='/clients'><MenuItem onClick={handleClose}>Clients</MenuItem></StyledLink>
        }
        {currentUser&& userData&& !userData.coach&&
            <StyledLink  to='/classes'><MenuItem onClick={handleClose}>Book Class</MenuItem></StyledLink>
        }
        {currentUser&& userData&& !userData.coach&&
            <StyledLink  to='/buypasses'><MenuItem onClick={handleClose}>Buy Passes</MenuItem></StyledLink>
        }
        {currentUser&& userData&& !userData.coach&&
            <StyledLink  to='/leaderboard'><MenuItem onClick={handleClose}>Leaderboard</MenuItem></StyledLink>
        }
        {currentUser&&
            <StyledLink  to='/profile'><MenuItem onClick={handleClose}>Profile</MenuItem></StyledLink>
        }
        {currentUser?
            <MenuItem onClick={logout}>Logout</MenuItem>
            :
            <StyledLink  to='/login'><MenuItem onClick={handleClose}>Login</MenuItem></StyledLink>
        }
      </Menu>
    </div>
  );
}