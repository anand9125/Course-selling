import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

interface Category {
  id: string,
  name: string,
  categoryId: string,
  image: string,
  index: number;
}

interface CategoryCardProps {
  categories: Category[];
}

const ImgMediaCard: React.FC<Category & { onClick?: () => void }> = ({ name, image, onClick }) => (
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
    <CardMedia component="img" alt={name} height="200" image={image} sx={{ objectFit: 'cover' }} />
    <CardContent>
      <Typography gutterBottom variant="h5">{name}</Typography>
    {/* <Typography variant="body2" color="text.secondary">{description}</Typography> */}
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

const CategoryCardComponent: React.FC<CategoryCardProps> = ({ categories }) => {
  const navigate = useNavigate();

  const handleCardClick = (categoryId: string) => {
    navigate(`/learn/${categoryId}`);
  };

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
        {categories.map((category) => (
          <ImgMediaCard key={category.id} {...category} onClick={() => handleCardClick(category.id)} />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryCardComponent;
