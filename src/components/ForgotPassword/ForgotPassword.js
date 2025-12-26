import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Typography, Button, Link, TextField } from '@mui/material';
import { styled } from '@mui/system';

const StyledWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
    fontFamily: 'sans-serif',
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

    const StyledCard = styled(Box)(({ theme }) => ({
        width: '100%',
        maxWidth: '1200px', // Increased width for side-by-side
        display: 'flex',
        flexDirection: 'row', // Side by side
        alignItems: 'stretch',
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    }));

    const Section = styled(Box)({
        flex: 1,
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRight: '1px solid #eee',
        '&:last-child': {
            borderRight: 'none',
        },
    });

    const ForgotPassword = () => {
        // Reset Password State
        const [email, setEmail] = useState('');

        // Change Password State
        const [changeEmail, setChangeEmail] = useState('');
        const [currentPassword, setCurrentPassword] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [confirmNewPassword, setConfirmNewPassword] = useState('');

        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

        const handleResetSubmit = async (e) => {
            e.preventDefault();

            if (!email) {
                return toast.error("Please enter your email address");
            }

            try {
                const response = await fetch(`${API_URL}/auth/request-reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success(data.message || "Reset instructions sent to your email!");
                } else {
                    toast.error(data.message || "Failed to send reset email");
                }
            } catch (error) {
                console.error('Reset Password Error:', error);
                toast.error("An error occurred. Please try again.");
            }
        };

        const handleChangePasswordSubmit = async (e) => {
            e.preventDefault();

            if (!changeEmail || !currentPassword || !newPassword || !confirmNewPassword) {
                return toast.error("Please fill in all fields");
            }

            if (newPassword !== confirmNewPassword) {
                return toast.error("New passwords do not match");
            }

            try {
                const response = await fetch(`${API_URL}/auth/change-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: changeEmail, 
                        currentPassword, 
                        newPassword 
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    toast.success("Password changed successfully!");
                    // Clear form
                    setChangeEmail('');
                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmNewPassword('');
                } else {
                    toast.error(data.message || "Failed to change password");
                }
            } catch (error) {
                console.error('Change Password Error:', error);
                toast.error("An error occurred. Please try again.");
            }
        };

        return (
            <StyledWrapper>
                <StyledCard>
                    {/* Left Side: Forgot Password */}
                    <Section>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'black', mb: 3 }}>
                            Forgot Password?
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'gray', mb: 4, maxWidth: '80%' }}>
                            Enter your email to receive reset instructions.
                        </Typography>

                        <Box component="form" onSubmit={handleResetSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                            <StyledInput
                                fullWidth
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ maxWidth: '350px' }}
                            />
                            <Button
                                type="submit"
                                sx={{
                                    bgcolor: '#98FB98',
                                    color: 'white',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    py: 1.5,
                                    px: 4,
                                    borderRadius: '9999px',
                                    textTransform: 'none',
                                    width: 'fit-content',
                                    minWidth: '200px',
                                    '&:hover': { bgcolor: '#7ddba4' }
                                }}
                            >
                                Send Reset Email
                            </Button>
                        </Box>
                        <Link href="/" underline="hover" sx={{ mt: 4, color: '#2E8B57', fontWeight: 600 }}>
                            Back to Login
                        </Link>
                    </Section>

                    {/* Right Side: Change Password */}
                    <Section sx={{ bgcolor: '#f9f9f9' }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'black', mb: 3 }}>
                            Change Password
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'gray', mb: 4, maxWidth: '80%' }}>
                            Know your password? Change it here.
                        </Typography>

                        <Box component="form" onSubmit={handleChangePasswordSubmit} sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                            <StyledInput
                                fullWidth
                                placeholder="Email Address"
                                value={changeEmail}
                                onChange={(e) => setChangeEmail(e.target.value)}
                                sx={{ maxWidth: '350px' }}
                            />
                            <StyledInput
                                fullWidth
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                sx={{ maxWidth: '350px' }}
                            />
                            <StyledInput
                                fullWidth
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                sx={{ maxWidth: '350px' }}
                            />
                            <StyledInput
                                fullWidth
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                sx={{ maxWidth: '350px' }}
                            />
                            <Button
                                type="submit"
                                sx={{
                                    bgcolor: '#98FB98',
                                    color: 'white',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    py: 1.5,
                                    px: 4,
                                    borderRadius: '9999px',
                                    textTransform: 'none',
                                    width: 'fit-content',
                                    minWidth: '200px',
                                    '&:hover': { bgcolor: '#7ddba4' }
                                }}
                            >
                                Change Password
                            </Button>
                        </Box>
                    </Section>
                </StyledCard>
            </StyledWrapper>
        );
    };

export default ForgotPassword;
