import React from 'react';
import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react';
import Skeleton from '@mui/material/Skeleton';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useCategoryStore } from '../store/useCategoryStore';
// @ts-ignore
import 'swiper/css';
// @ts-ignore
import 'swiper/css/navigation';
// @ts-ignore
import 'swiper/css/pagination';

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
      maxWidth: 260, // Slightly smaller for better fit on mobile
      height: 280,
      transition: 'transform 0.3s ease-in-out',
      cursor: loading ? 'default' : 'pointer',
      zIndex: 1,
      '&:hover': {
        transform: loading ? 'none' : 'scale(1.05) translateY(-5px)',
        zIndex: 10,
        backgroundColor: '#f7f7f7',
      },
      '@media (max-width: 768px)': { // Adjust for mobile
        maxWidth: 180,
        height: 220,
        '&:hover': { transform: 'none' } // Remove scaling on small screens
      }
    }}
  >
    {loading ? (
      <>
        <Skeleton variant="rectangular" width="100%" height={180} />
        <CardContent sx={{ textAlign: 'center' }}>
          <Skeleton variant="text" width="80%" height={25} />
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
            width: 180,
            height: 180,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            margin: '10px auto',
            '@media (max-width: 768px)': { width: 140, height: 140 }
          }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h6" sx={{ fontSize: { xs: '14px', md: '16px' } }}>
            {name}
          </Typography>
        </CardContent>
      </>
    )}
  </Card>
);

const CategoryCardComponent: React.FC<CategoryCardProps> = ({ categories }) => {
  const { loading } = useCategoryStore();
  const navigate = useNavigate();

  const handleCardClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const sortedCategories = [...categories]
    .filter(cat => cat.index >= 1 && cat.index <= 10)
    .sort((a, b) => a.index - b.index);

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: 2, overflow: 'visible', position: 'relative', minHeight: '280px' }}>
      <SwiperContainer
        style={{ overflow: 'visible' }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={15} // Less spacing for compact layout
        slidesPerView={5} // Default for large screens
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 }, // 2 cards on small devices
          480: { slidesPerView: 3, spaceBetween: 10 }, // 3 cards on slightly bigger screens
          768: { slidesPerView: 4, spaceBetween: 15 }, // 4 cards on tablets
          1024: { slidesPerView: 5, spaceBetween: 20 }, // 5 cards on large screens
        }}
      >
        {sortedCategories.map((category) => (
          <SwiperSlide key={category.id} style={{ overflow: 'visible', display: 'flex', justifyContent: 'center' }}>
            <ImgMediaCard {...category} onClick={() => handleCardClick(category.categoryId)} loading={loading} />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </Box>
  );
};

export default CategoryCardComponent;
