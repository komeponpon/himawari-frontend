import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import logoImage from '../assets/images/logo.png';
import { TypographyProps } from '@mui/material/Typography';

const StyledTypography = styled(Typography)<TypographyProps>({
  color: '#FFDD55',
  fontFamily: "'Lato', sans-serif !important",
  fontWeight: 500,
  letterSpacing: '0.1em',
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0)',
});


export default function AppBarComponent() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav"
        sx={{
          backgroundColor: '#fff',
          boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
          height: '56px',
          display: 'block',
        }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link to="/" style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit'
            }}>
              <img
                src={logoImage}
                alt="Logo"
                style={{
                  height: '40px',
                  width: 'auto',
                  marginRight: '12px'
                }}
              />
              <StyledTypography
                variant="h4"
                component="h1"
                className="app-title"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.5rem' },
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#FFE477'
                  }
                }}
              >
                himawari
              </StyledTypography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
