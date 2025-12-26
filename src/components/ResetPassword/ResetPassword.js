import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useParams, useNavigate } from 'react-router-dom';

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
        color: '#A9A9A9',
        padding: '12px 20px',
    },
});

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            return toast.error("Please fill in all fields");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const response = await fetch(`${API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Password reset successful! Please login.");
                navigate('/');
            } else {
                toast.error(data.message || "Failed to reset password");
            }
        } catch (error) {
            console.error('Reset Password Error:', error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <StyledWrapper>
            <StyledCard>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'black', mb: 4 }}>
                    Set New Password
                </Typography>

                <Typography variant="h6" sx={{ color: 'black', mb: 6, fontWeight: 500, lineHeight: 1.5, maxWidth: '80%' }}>
                    Enter your new password below.
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                    <StyledInput
                        fullWidth
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ maxWidth: '400px' }}
                    />

                    <StyledInput
                        fullWidth
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Reset Password
                    </Button>
                </Box>
            </StyledCard>
        </StyledWrapper>
    );
};

export default ResetPassword;
