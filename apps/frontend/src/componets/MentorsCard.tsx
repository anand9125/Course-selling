import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useMentorStore } from '../store/useMentorStore';

interface Mentors {
  id: string;
  mentorId: string;
  name: string;
  image: string;
  index: number;
}

interface MentorsCardProps {
  mentors: Mentors[];
  categoryId: string | undefined;
}

const ImgMediaCard: React.FC<Mentors & { onClick?: () => void; loading?: boolean }> = ({ name, image, onClick, loading }) => (
  <Card
    onClick={onClick}
    sx={{
      width: '100%',
      maxWidth: 270,
      height: 330,
      transition: 'transform 0.3s ease-in-out',
      cursor: loading ? 'default' : 'pointer',
      zIndex: 1,
      borderRadius: 3,
      boxShadow: 3,
      '&:hover': {
        transform: loading ? 'none' : 'scale(1.03) translateY(-5px)',
        zIndex: 10,
        backgroundColor: '#f0f0f0',
      },
    }}
  >
    {loading ? (
      <>
        <Skeleton variant="circular" width={250} height={250} sx={{ margin: 'auto' }} />
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
            width: '100%',
            maxWidth: 250,
            height: 250,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            margin: '10px auto',
          }}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h6" fontWeight="bold">
            {name}
          </Typography>
        </CardContent>
      </>
    )}
  </Card>
);

const MentorsCard: React.FC<MentorsCardProps> = ({ mentors, categoryId }) => {
  const { isLoading } = useMentorStore();
  const navigate = useNavigate();

  const handleCardClick = (mentorId: string) => {
    const trimmedCategoryId = categoryId?.trim();
    navigate(`/mentors/${trimmedCategoryId}/${mentorId}`);
  };

  // Sort mentors by index before rendering
  const sortedMentors = [...mentors].sort((a, b) => a.index - b.index);

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
             "@media (min-width: 1024px)": { gridTemplateColumns: "repeat(3, 1fr)" }, // Ensures 3 cards on big screens
           }}
         >
        {sortedMentors.map((mentor) => (
          <ImgMediaCard key={mentor.id} {...mentor} onClick={() => handleCardClick(mentor.mentorId)} loading={isLoading} />
        ))}
      </Box>
    </Box>
  );
};

export default MentorsCard;
