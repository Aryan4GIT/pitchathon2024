import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';


function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            GAP STEALER
          </Typography>
          <div>
            Stealing gap and bridging opportunities.
          </div>
        </Box>

        <Box>
          <Link to="about-us">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography></Link>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our ---</Typography>
          <Link to="terms-and-condition">
          <Typography mb="30px">Terms & Conditions</Typography></Link>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        <Box>
          <Link to="/customer-care">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography></Link>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your ----</Typography>
          <Typography mb="30px">------</Typography>
          <Typography mb="30px">Payments & Refunds</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            vit chennai, MG auditorium
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: mredwardroh@gmail.com
          </Typography>
          <Typography mb="30px">(222)333-4444</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
