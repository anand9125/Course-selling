import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMentorStore } from "../store/useMentorStore";
import useCartAction from "./useCartAction"; // Import cart actions

interface Courses {
  id: string;
  title: string;
  courseId: string;
  price: number;
  actualPrice: number;
  description: string;
  categoryId: string;
  mentorId: string;
  image: string;
  index: number;
}

interface Mentor {
  id: string;
  mentorId: string;
  name: string;
  image: string;
  index: number;
}

interface CoursesCardProps {
  courses: Courses[];
  mentor: Mentor | null;
}

const ImgMediaCard: React.FC<
  Courses & { onClick?: () => void; loading?: boolean; addToCart: (course: Courses) => void; navigate: any }
> = ({ title, navigate, image, price, actualPrice, id, description, onClick, loading, addToCart, ...course }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        width: "100%",
        maxWidth: 320,
        height: "auto",
        transition: "transform 0.3s ease-in-out",
        cursor: loading ? "default" : "pointer",
        zIndex: 1,
        borderRadius: 3,
        boxShadow: 3,
        "&:hover": {
          transform: loading ? "none" : "scale(1.03) translateY(-5px)",
          zIndex: 10,
          backgroundColor: "#f7f7f7",
        },
      }}
    >
      {loading ? (
        <>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <CardContent sx={{ textAlign: "center" }}>
            <Skeleton variant="text" width="80%" height={30} />
            <Skeleton variant="text" width="60%" height={20} />
          </CardContent>
        </>
      ) : (
        <>
          <CardMedia
            component="img"
            loading="lazy"
            alt={title}
            image={image}
            sx={{
              objectFit: "cover",
              height: 200,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
            }}
          />
          <CardContent sx={{ textAlign: "left", padding: 2 }}>
            <Typography
              gutterBottom
              variant="h6"
              fontWeight="bold"
              sx={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {description}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 1 }}>
              <Box>
                <Typography variant="h6" color="primary" fontWeight="bold" sx={{ display: "inline" }}>
                  ₹{price}
                </Typography>
                {actualPrice > price && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through", marginLeft: 1 }}
                  >
                    ₹{actualPrice}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ borderRadius: 5, textTransform: "none", fontWeight: "bold" }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click event from triggering
                  addToCart({
                    id,
                    title,
                    courseId: course.courseId,
                    price,
                    actualPrice,
                    description,
                    categoryId: course.categoryId,
                    mentorId: course.mentorId,
                    image,
                    index: course.index,
                  });
                  navigate("/cart");
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </CardContent>
        </>
      )}
    </Card>
  );
};

const CoursesCard: React.FC<CoursesCardProps> = ({ courses, mentor }) => {
  const { addToCart } = useCartAction();
  const { isLoading } = useMentorStore();
  const navigate = useNavigate();

  const handleCardClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };

  // Sort courses by index before rendering
  const sortedCourses = [...courses].sort((a, b) => a.index - b.index);

  return (
    <div>
      <div className="text-3xl font-semibold pt-3 md:text-4xl">{mentor?.name}</div>
      <Box sx={{ maxWidth: "1400px", margin: "auto", padding: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 2, // Reduce spacing slightly
          justifyContent: "center",
          "@media (min-width: 600px)": { gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" },
          "@media (min-width: 1024px)": { gridTemplateColumns: "repeat(3, 1fr)" }, // Ensures 3 cards on big screens
        }}
      >

          {sortedCourses.map((course) => (
            <ImgMediaCard
              key={course.id}
              {...course}
              onClick={() => handleCardClick(course.courseId)}
              loading={isLoading}
              addToCart={addToCart}
              navigate={navigate}
            />
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default CoursesCard;
