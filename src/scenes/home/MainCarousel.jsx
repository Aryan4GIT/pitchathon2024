import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

// Imports all images from the assets folder
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      autoPlay={true}
      interval={3000} // Increased time interval for smoother experience
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              transition: "0.3s",
            },
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              transition: "0.3s",
            },
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`} position="relative">
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "600px",
              objectFit: "cover",
              filter: "brightness(80%)", // Darker for better text visibility
              transition: "transform 1s ease-in-out",
            }}
          />
          <Box
            color="white"
            padding="40px"
            borderRadius="8px"
            textAlign="left"
            backgroundColor="rgba(0, 0, 0, 0.7)" // Enhanced opacity for clearer text visibility
            boxShadow="0 8px 16px rgba(0, 0, 0, 0.3)" // Stronger shadow for elevation
            position="absolute"
            top="46%"
            left={isNonMobile ? "10%" : "0"}
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? "500px" : "240px"} // Adjusted text box width
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)', // Scale effect on hover
              },
            }}
          >
            <Typography color={shades.secondary[200]} fontSize={14}>
              -- NEW JOBS
            </Typography>
            <Typography
              fontFamily="Cinzel" // Updated font for modern look
              fontSize={36}
              color="#F0F0F0"
              mb={2} // Margin bottom for spacing
            >
              Apply Fast
            </Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}
            >
              Find What Suits You
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
