import React from 'react';
import { Box, Typography, Container} from '@mui/material';
import { shades } from "../../theme";

const Terms = () => {
  return (
    <Container>
      <Box
        sx={{
          marginTop: '80px',
          textAlign: 'left',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{color: shades.secondary[500]}}>
          Terms and Conditions
        </Typography>    
        <ul> 
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        Welcome to GAP STEALER. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, please do not use our website.
        </Typography>
        </li>
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. You agree to use the website only for lawful purposes and in accordance with these terms.
        </Typography>
        </li>
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        All content on the website, including text, images, and logos, is the property of GAP STEALER and its licensors. You may not reproduce, distribute, or otherwise use any content without our express written permission.
        </Typography>
        </li>
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        You may be required to create an account to access certain features. You are responsible for maintaining the security of your account and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.
        </Typography>
        </li>
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        We offer a platform to connect small-time workers with potential employers. We strive to provide accurate and up-to-date information, but we do not guarantee the accuracy or completeness of any content on the website.
        </Typography>
        </li>
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        If applicable, payments for services will be handled through the website. Refunds are subject to our refund policy, which may be updated from time to time. Please review our refund policy for details.
        </Typography>
        </li>
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the website. Our liability is limited to the maximum extent permitted by law.
        </Typography>
        </li>
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        We reserve the right to terminate or suspend your access to the website if you violate these terms or if we believe your actions are harmful to our users or the website.
        </Typography>
        </li>
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        We may update these terms from time to time. Any changes will be posted on this page, and your continued use of the website constitutes your acceptance of the updated terms.
        </Typography>
        </li>
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        These terms are governed by the laws of [Your Jurisdiction]. Any disputes arising from these terms will be resolved in the courts of [Your Jurisdiction].
        </Typography>
        </li>
        <li>
        <Typography sx={{marginBottom : 1, fontSize:'15px'}} paragraph>
        If you have any questions or concerns about these terms, please contact us at (222)333-4444.
        </Typography>
        </li>
        </ul>
      </Box>
    </Container>
  );
};

export default Terms;
