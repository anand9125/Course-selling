import React from 'react';
import { Swiper as SwiperContainer, SwiperSlide } from 'swiper/react';
// @ts-ignore
import 'swiper/css';
import Skeleton from '@mui/material/Skeleton'
// @ts-ignore
import 'swiper/css/pagination';
// @ts-ignore
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
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
      height: 300,
      transition: 'transform 0.3s ease-in-out',
      cursor: loading ? 'default' : 'pointer',
      zIndex: 1,
      '&:hover': {
        transform: loading ? 'none' : 'scale(1.03) translateY(-10px)',
        zIndex: 10,
        backgroundColor: '#f0f0f0', // Light gray on hover
      },
    }}
  >
    {loading ? (
      <>
        <Skeleton variant="rectangular" width="100%" height={200} />
        <CardContent sx={{ textAlign: 'center' }}>
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
                width: 220, // Fixed width to ensure a circle
                height: 220, // Fixed height to ensure a circle
                borderRadius: '50%', // Makes the image circular
                objectFit: 'cover', // Ensures the image fills the circle without distortion
                objectPosition: 'center', // Centers the image within the circle
                display: 'block',
                margin: '10px auto', // Centers the circle within the card
              }}
            />

        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5">{name}</Typography>
        </CardContent>
      </>
    )}
  </Card>
);


const CategoryCardComponent: React.FC<CategoryCardProps> = ({ categories }) => {
  const { loading } = useCategoryStore();
  console.log("Loading state:", loading);
  const navigate = useNavigate();

  const handleCardClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };
    // Sort categories by index before rendering so that we can arrange accoding to what we want
    const sortedCategories = [...categories]
     .filter(cat => cat.index >= 1 && cat.index <= 10)
     .sort((a, b) => a.index - b.index);  //Spreads categories into a new array ([...categories]) to avoid mutating the original array.
  return (
    <Box sx={{ maxWidth: '1300px', margin: 'auto', padding: 2, overflow: "visible", position: "relative", minHeight: '300px' }}>

      {/* @ts-ignore */}
      <SwiperContainer
      style={{ overflow: "visible" }} // Allow hover scaling to be visible
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20} // Spacing between slides
        slidesPerView={3} // Number of cards visible at once
        navigation // Enables navigation arrows
        pagination={{ clickable: true }} // Enables pagination dots
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-scroll
        breakpoints={{
          320: { slidesPerView: 3 }, // 1 slide on mobile
          768: { slidesPerView: 4 }, // 2 slides on tablets
          1024: { slidesPerView: 5 }, // 3 slides on desktops
        }}
      >
        {sortedCategories.map((category) => (
        // @ts-ignore
          <SwiperSlide key={category.id}  style={{ overflow: "visible", display: "flex", justifyContent: "center" }}>
            <ImgMediaCard {...category}  onClick={() => handleCardClick(category.categoryId)} loading={loading} />
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </Box>
  );
};

export default CategoryCardComponent;
