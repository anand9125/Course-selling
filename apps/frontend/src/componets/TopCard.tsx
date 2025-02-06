import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import bannerImg from "../assets/banner.png";

// Define types for card props
interface CardProps {
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
}

const ImgMediaCard: React.FC<CardProps> = ({ title, description, image, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      width: '100%',
      maxWidth: 300,
      transition: 'transform 0.3s ease-in-out',
      cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.05) translateY(-10px)',
      },
    }}
  >
    <CardMedia
      component="img"
      alt={title}
      height="200"
      image={image}
      sx={{ objectFit: 'cover' }}
    />
    <CardContent>
      <Typography gutterBottom variant="h5">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Enroll</Button>
      <Button size="small">Learn More</Button>
      <Typography
        sx={{
          marginLeft: 'auto',
          backgroundColor: 'gold',
          padding: '5px 15px',
          borderRadius: '10px',
          fontSize: '18px',
        }}
      >
        *Free
      </Typography>
    </CardActions>
  </Card>
);

const CardComponent: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (title: string) => {
    navigate(`/learn`);
  };

  const cardsData: CardProps[] = [
    { title: 'DSA', description: 'Learn essential DSA concepts.', image: bannerImg },
    { title: 'Java Basics', description: 'Master Java fundamentals.', image: bannerImg },
    { title: 'WebDev', description: 'Build amazing websites.', image: bannerImg },
    { title: 'React', description: 'Learn React for UI development.', image: bannerImg },
   
  ];

  return (
    <Box sx={{ maxWidth: '1300px', margin: 'auto', padding: 2 }}>
     
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {cardsData.map((card, index) => (
          <ImgMediaCard key={index} {...card} onClick={() => handleCardClick(card.title)} />
        ))}
      </Box>
    </Box>
  );
};

export default CardComponent;
