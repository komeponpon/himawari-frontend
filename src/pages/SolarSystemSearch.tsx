import AppBarComponent from '../components/AppBar';
import { Box, Typography } from '@mui/material';
import SolarSearchField from '../components/SolarSearchField';
export default function SolarSystemSearch() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
       <AppBarComponent /> 
      <Box sx={{
        paddingTop: '64px',
        minHeight: '100vh',
      }}>
        <Box sx={{
          padding: '1rem',
          display: 'flex',
        }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontWeight: 600,
              color: '#444444',
              letterSpacing: '0.1em'
            }}
          >
            太陽光リースコード検索
          </Typography>
        </Box>
        <SolarSearchField />
      </Box>
    </Box>
  )
}
