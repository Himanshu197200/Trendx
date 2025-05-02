import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import "./animations.css"; // Import animations

// Enhanced TypewriterText component with new animation
const TypewriterText = ({ texts, delay = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timeout;
    const currentText = texts[currentTextIndex];
    
    if (isTyping && !isDeleting) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, 100);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
      }
    } else if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsTyping(true);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isTyping, isDeleting, texts, delay]);
  
  return (
    <Typography 
      variant="h6" 
      component="div" 
      className="enhanced-typewriter"
      sx={{ 
        fontWeight: "bold",
        color: "#fff",
        textShadow: "0 0 10px rgba(0,0,0,0.3)",
        height: "1.5em"
      }}
    >
      {displayText}
    </Typography>
  );
};

const HomeBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  
  // Enhanced banner items with more content and effects
  const bannerItems = [
    {
      title: "Market Insights",
      subtitle: "Real-time Data Analysis",
      texts: [
        "Discover trading opportunities",
        "Track market movements",
        "Get personalized alerts"
      ],
      icon: <TrendingUpIcon sx={{ fontSize: 60 }} className="bounce-animation" />,
      buttonText: "Explore Markets",
      buttonLink: "/stocks",
      color: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
      secondaryButton: {
        text: "Learn More",
        link: "/education"
      }
    },
    {
      title: "Stock Analysis Tools",
      subtitle: "Advanced Technical Analysis",
      texts: [
        "Powerful charting capabilities",
        "Custom technical indicators",
        "AI-powered predictions"
      ],
      icon: <CandlestickChartIcon sx={{ fontSize: 60 }} className="scale-animation" />,
      buttonText: "Analyze Stocks",
      buttonLink: "/stock-analysis",
      color: "linear-gradient(135deg, #009688 0%, #4CAF50 100%)",
      secondaryButton: {
        text: "Try Demo",
        link: "/demo"
      }
    }
  ];

  const handleBannerClick = (link) => {
    navigate(link);
  };

  const handleNextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % bannerItems.length);
  };

  const handlePrevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + bannerItems.length) % bannerItems.length);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startAutoScroll();
  };

  const startAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(handleNextBanner, 6000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentItem = bannerItems[currentBanner];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "380px",
        mb: 4,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        background: currentItem.color,
      }}
      className="background-pulse"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)",
        }}
      />
      
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100%",
          padding: { xs: 3, md: 6 },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "60%" }, zIndex: 2 }}>
          <Typography
            variant="h3"
            component="div"
            className="text-reveal text-reveal-1"
            sx={{
              fontWeight: 800,
              color: "#fff",
              mb: 1,
              fontSize: { xs: "2rem", md: "2.5rem" },
              textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            {currentItem.title}
          </Typography>
          
          <Typography
            variant="h5"
            component="div"
            className="text-reveal text-reveal-2"
            sx={{
              fontWeight: 600,
              color: "rgba(255,255,255,0.9)",
              mb: 2,
              fontSize: { xs: "1.5rem", md: "1.75rem" },
            }}
          >
            {currentItem.subtitle}
          </Typography>
          
          <Box className="text-reveal text-reveal-3" sx={{ mb: 4 }}>
            <TypewriterText texts={currentItem.texts} />
          </Box>
          
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              className="button-hover-effect"
              onClick={() => handleBannerClick(currentItem.buttonLink)}
              sx={{
                px: 3,
                py: 1.2,
                borderRadius: "8px",
                fontWeight: 600,
                backgroundColor: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.3)",
                },
              }}
            >
              {currentItem.buttonText}
            </Button>
            
            {currentItem.secondaryButton && (
              <Button
                variant="outlined"
                className="button-hover-effect"
                onClick={() => handleBannerClick(currentItem.secondaryButton.link)}
                sx={{
                  px: 3,
                  py: 1.2,
                  borderRadius: "8px",
                  fontWeight: 600,
                  backgroundColor: "transparent",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.5)",
                  },
                }}
              >
                {currentItem.secondaryButton.text}
              </Button>
            )}
          </Box>
        </Box>
        
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            width: "40%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            className="glow-effect"
          >
            {currentItem.icon}
          </Box>
        </Box>
      </Box>
      
      {/* Pagination indicators */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
        }}
      >
        {bannerItems.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentBanner(index)}
            sx={{
              width: index === currentBanner ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: index === currentBanner ? "#fff" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </Box>
      
      {/* Navigation arrows */}
      <IconButton
        onClick={handlePrevBanner}
        sx={{
          position: "absolute",
          left: 16,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.3)",
          },
        }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      
      <IconButton
        onClick={handleNextBanner}
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.3)",
          },
        }}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  );
};

export default HomeBanner; 