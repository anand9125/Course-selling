import React from 'react';
// @ts-ignore
import 'swiper/css';
import Skeleton from '@mui/material/Skeleton'
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/navigation';

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
        maxWidth: 300,
        height: 360,
        transition: 'transform 0.3s ease-in-out',
        cursor: loading ? 'default' : 'pointer',
        boxShadow:3,
        zIndex: 1,
        '&:hover': {
        transform: loading ? 'none' : 'scale(1.03) translateY(-10px)',
        zIndex: 10,
        },
    }}
  >
     {loading ? (
      <>
        <Skeleton variant="rectangular" width="100%" height={280} />
        <CardContent sx={{ textAlign: 'center' }}>
          <Skeleton variant="text" width="80%" height={30} />
        </CardContent>
      </>
    ) : (
      <>
        <CardMedia component="img" loading="lazy" alt={name}   image={image} sx={{ objectFit: 'cover',
        height:300
          
        }} />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5">{name}</Typography>
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
    // Sort categories by index before rendering so that we can arrange accoding to what we want
    const sortedCategories = [...categories].sort((a, b) => a.index - b.index);  //Spreads categories into a new array ([...categories]) to avoid mutating the original array.
  return (
    <Box sx={{ maxWidth: '1300px', margin: 'auto', padding: 2 }}>
     <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 3,
          justifyContent: 'center' 
        }}>
        {sortedCategories.map((category) => (
            <ImgMediaCard {...category}  onClick={() => handleCardClick(category.categoryId)} loading={loading} />
         ))}
     
        </Box>
    </Box>
  );
};

export default AllCategoryCardComponent;
