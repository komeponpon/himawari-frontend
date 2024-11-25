import AppBarComponent from '../components/AppBar';
import { Box, Typography } from '@mui/material';
import BatterySearchField from '../components/BatterySearchField';
export default function BatterySearch() {
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
            蓄電池リースコード検索
          </Typography>
        </Box>
        <BatterySearchField />
      </Box>
    </Box>
  )
}
