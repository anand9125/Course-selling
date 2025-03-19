import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useCategoryStore } from '../store/useCategoryStore';

interface Category {
  id: string;
  name: string;
  categoryId: string;
  image: string;
  index: number;
}

interface CategoryCardProps {
  categories: Category[];
}

const ImgMediaCard: React.FC<Category & { onClick?: () => void; loading?: boolean }> = ({ name, image, onClick, loading }) => (
  <Card
    onClick={onClick}
    sx={{
      width: '100%',
      maxWidth: 240,
      height: 'auto',
      transition: 'transform 0.3s ease-in-out',
      cursor: loading ? 'default' : 'pointer',
      zIndex: 1,
      '&:hover': {
        transform: loading ? 'none' : 'scale(1.03) translateY(-5px)',
        zIndex: 10,
        backgroundColor: '#f7f7f7',
      },
    }}
  >
    {loading ? (
      <>
        <Skeleton variant="rectangular" width="100%" height={250} />
        <CardContent sx={{ textAlign: 'center', paddingTop: '20px' }}>
          <Skeleton variant="text" width="80%" height={30} />
        </CardContent>
      </>
    ) : (
      <>
        <CardMedia
          component="img"
          loading="lazy"
          alt={name}
          image={image}
          sx={{
            width: '90%',
            height: 210,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            margin: '0px auto',
          }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h6">{name}</Typography>
        </CardContent>
      </>
    )}
  </Card>
);

const AllCategoryCardComponent: React.FC<CategoryCardProps> = ({ categories }) => {
  const { loading } = useCategoryStore();
  const navigate = useNavigate();

  const handleCardClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const sortedCategories = [...categories].sort((a, b) => a.index - b.index);

  return (
    <Box sx={{ maxWidth: '1400px', margin: 'auto', padding: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 1,
          justifyContent: 'center',
          '@media (min-width: 600px)': { gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' },
          '@media (min-width: 900px)': { gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' },
          "@media (min-width: 1024px)": { gridTemplateColumns: "repeat(4, 1fr)" }, // Ensures 3 cards on big screens
        }}
      >
        {sortedCategories.map((category) => (
          <ImgMediaCard key={category.id} {...category} onClick={() => handleCardClick(category.categoryId)} loading={loading} />
        ))}
      </Box>
    </Box>
  );
};

export default AllCategoryCardComponent;
