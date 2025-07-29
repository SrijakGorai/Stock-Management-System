import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { isAdmin, logout, getToken } from '../auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isLoggedIn = getToken();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Stock Management
        </Typography>

        {isLoggedIn && (
          <>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>

            {isAdmin() && (
              <>
                <Button color="inherit" onClick={() => navigate('/add')}>
                  Add Material
                </Button>
                <Button color="inherit" onClick={() => navigate('/issue')}>
                  Issue Material
                </Button>
                <Button color="inherit" onClick={() => navigate('/remaining')}>
                  Remaining Material
                </Button>
              </>
            )}

            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
