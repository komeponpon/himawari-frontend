import { Card, CardContent, CardMedia, Typography, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import solarImage from '../assets/images/solar.png';
import batteryImage from '../assets/images/battery.jpg';
import installationImage from '../assets/images/installation.jpg';

const navigationCards = [
  {
    title: '太陽光リースコード検索',
    description: '太陽光のリースコードを検索できます',
    path: '/solar-system-search',
    image: solarImage
  },
  {
    title: '蓄電池リースコード検索',
    description: '蓄電池のリースコードを検索できます',
    path: '/battery-search',
    image: batteryImage
  },
  {
    title: '施工リースコード検索',
    description: '施工のリースコードを検索できます',
    path: '/installation-search',
    image: installationImage
  }
];

export default function NavigationCards() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 24 }}>
      <Grid container spacing={8}>
        {navigationCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.path}>
            <Card 
              sx={{ 
                height: 320,
                cursor: 'pointer',
                background: 'linear-gradient(45deg, #FF8E53 30%, #FFDD55 90%)',
                '&:hover': { 
                  transform: 'scale(1.02)', 
                  transition: 'transform 0.2s',
                  boxShadow: '0 8px 16px rgba(255, 221, 85, 0.3)'
                }
              }}
              onClick={() => navigate(card.path)}
            >
              <CardMedia
                component="img"
                sx={{
                  height: '60%',
                  objectFit: 'cover'
                }}
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="div"
                  sx={{ color: 'white', fontWeight: 600 }}
                >
                  {card.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}