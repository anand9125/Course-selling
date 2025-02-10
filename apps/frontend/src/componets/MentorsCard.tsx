import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useMentorStore } from '../store/useMentorStore';

interface Mentors{
  id: string,
  mentorId:string,
  name: string,
  image: string,
  index: number   
}




interface MentorsCardProps {
  mentors: Mentors[];
  categoryId :string|undefined
}

const ImgMediaCard: React.FC<Mentors & { onClick?: () => void; loading?: boolean }> = ({ name, image, onClick, loading }) => (
  <Card
    onClick={onClick}
    sx={{
      width: '100%',
      maxWidth: 300,
      height: 370,
      transition: 'transform 0.3s ease-in-out',
      cursor: loading ? 'default' : 'pointer',
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
        <CardMedia component="img" alt={name}   image={image} sx={{ objectFit: 'cover',
        height:300
          
        }} />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h5">{name}</Typography>
        </CardContent>
      </>
    )}
  </Card>
);

const MentorsCard: React.FC<MentorsCardProps> = ({ mentors , categoryId }) => {
  const { isLoading } = useMentorStore();
  
  const navigate = useNavigate();
  console.log( categoryId)
  const handleCardClick = (mentorId: string) => {
    const trimmedCategoryId = categoryId?.trim(); // Remove extra spaces
    navigate(`/mentors/${trimmedCategoryId}/${mentorId}`);
  };

  // Sort categories by index before rendering
  const sortedMentors = [...mentors].sort((a, b) => a.index - b.index);

  return (
    <Box sx={{ maxWidth: '1300px', margin: 'auto', padding: 2 }}>
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 3,
          justifyContent: 'center' 
        }}
      >
        {sortedMentors.map((mentor) => (
          <ImgMediaCard 
            key={mentor.id} 
            {...mentor}  
            onClick={() => handleCardClick(mentor.mentorId)} 
            loading={isLoading} 
          />
        ))}
      </Box>
    </Box>
  );
};

export default MentorsCard;
