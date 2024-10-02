import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton, Typography, TextField, InputAdornment } from "@mui/material";
import { PersonOutline, MenuOutlined, SearchOutlined, RateReviewOutlined, AddOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleAddJob = () => {
    navigate("/add-job");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="80px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
      sx={{ transition: "background-color 0.3s ease" }}
    >
      <Box width="80%" margin="auto" display="flex" justifyContent="space-between" alignItems="center">
        
        {/* Logo Section */}
        <Box onClick={() => navigate("/home")} sx={{ "&:hover": { cursor: "pointer", color: shades.primary[500] }, transition: "color 0.3s ease" }}>
          <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: "bold", color: shades.secondary[500], textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.3s ease" }}>
            GAP STEALER
          </Typography>
        </Box>

        {/* Search Section */}
        <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", alignItems: "center", backgroundColor: shades.neutral[100], borderRadius: "24px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", overflow: "hidden", width: "400px", maxWidth: "100%" }}>
          <TextField
            variant="outlined"
            placeholder="Search for jobs..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
              sx: { padding: "6px 12px", borderRadius: "24px", backgroundColor: "white" },
            }}
            sx={{ border: "none", "& .MuiOutlinedInput-root": { border: "none" }, width: "100%" }}
          />
        </Box>

        {/* Icon Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center" columnGap="20px" zIndex="2">
          {/* Add Job Button */}
          <Box display="flex" alignItems="center" onClick={handleAddJob} sx={{ "&:hover": { cursor: "pointer", color: shades.primary[500] }, transition: "color 0.3s ease" }}>
            <Typography variant="body1" sx={{ color: "black", marginLeft: "8px", fontWeight: "bold" }}>
              Add Job
            </Typography>
            <IconButton aria-label="add job" sx={{ color: "black", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.1)", color: shades.primary[500] } }}>
              <AddOutlined />
            </IconButton>
          </Box>

          {/* User Icon */}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <IconButton aria-label="user login" sx={{ color: "black", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.1)", color: shades.primary[500] } }}>
              <PersonOutline />
            </IconButton>
          </Link>

          {/* Menu Icon */}
          <IconButton aria-label="menu" sx={{ color: "black", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.1)", color: shades.primary[500] } }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
