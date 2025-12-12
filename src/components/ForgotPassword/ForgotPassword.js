import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import { styled } from '@mui/system';

const StyledWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    fontFamily: 'sans-serif',
});

const StyledCard = styled(Box)({
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#fff',
});

const StyledInput = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: '9999px',
        border: '2px solid #98FB98',
        backgroundColor: '#fff',
        '&:hover fieldset': {
            border: 'none',
        },
        '&.Mui-focused fieldset': {
            border: 'none',
        },
        '& fieldset': {
            border: 'none',
        },
        '&:hover': {
            border: '2px solid #4CAF50',
        },
        '&.Mui-focused': {
            border: '2px solid #2E8B57',
        }
    },
    '& input': {
        textAlign: 'center',
        fontSize: '1.25rem',
        color: '#A9A9A9', // Placeholder/text color similar to image
        padding: '12px 20px',
    },
});

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            return toast.error("Please enter your email address");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return toast.error("Invalid email format");
        }

        // Simulate API call
        console.log('Reset Password Request:', email);
        toast.success("Reset instructions sent to your email!");
    };

    return (
        <StyledWrapper>
            <StyledCard>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'black', mb: 4 }}>
                    Reset Your Password
                </Typography>

                <Typography variant="h6" sx={{ color: 'black', mb: 6, fontWeight: 500, lineHeight: 1.5, maxWidth: '80%' }}>
                    Enter Your Email Address below and We will send you instructions on how to reset your password
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <StyledInput
                        fullWidth
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ maxWidth: '400px' }}
                    />

                    <Button
                        type="submit"
                        sx={{
                            bgcolor: '#98FB98',
                            color: 'white',
                            fontSize: '1.25rem',
                            fontWeight: 'bold',
                            py: 1.5,
                            px: 6,
                            borderRadius: '9999px',
                            boxShadow: 'none',
                            textTransform: 'none',
                            width: 'fit-content',
                            minWidth: '250px',
                            '&:hover': {
                                bgcolor: '#7ddba4',
                            }
                        }}
                    >
                        Send Reset Email
                    </Button>

                    <Link href="/" underline="hover" sx={{ color: '#2E8B57', fontSize: '1.25rem', fontWeight: 600 }}>
                        Go Back
                    </Link>
                </Box>
            </StyledCard>
        </StyledWrapper>
    );
};

export default ForgotPassword;
