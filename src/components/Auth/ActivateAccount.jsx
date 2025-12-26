import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button, Container, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ActivateAccount = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('');
    const effectCalled = React.useRef(false);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const activate = async () => {
            if (effectCalled.current) return;
            effectCalled.current = true;

            try {
                const response = await fetch(`${API_URL}/auth/activate/${token}`);
                const data = await response.json();

                if (response.ok) {
                    setStatus('success');
                    setMessage(data.message);
                    // Redirect to login after 3 seconds
                    setTimeout(() => navigate('/'), 3000);
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Activation failed');
                }
            } catch (error) {
                setStatus('error');
                setMessage('An error occurred during activation');
            }
        };

        if (token) activate();
    }, [token, navigate, API_URL]);

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: '20px' }}>
                {status === 'loading' && (
                    <Box>
                        <CircularProgress size={60} sx={{ mb: 2, color: '#2E8B57' }} />
                        <Typography variant="h6">Activating your account...</Typography>
                    </Box>
                )}

                {status === 'success' && (
                    <Box>
                        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#2E8B57', mb: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#2E8B57' }}>
                            Activation Successful!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            {message}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Redirecting to login page...
                        </Typography>
                        <Button 
                            variant="contained" 
                            onClick={() => navigate('/')}
                            sx={{ mt: 3, bgcolor: '#2E8B57', '&:hover': { bgcolor: '#1b5e20' } }}
                        >
                            Go to Login
                        </Button>
                    </Box>
                )}

                {status === 'error' && (
                    <Box>
                        <ErrorOutlineIcon sx={{ fontSize: 80, color: '#d32f2f', mb: 2 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#d32f2f' }}>
                            Activation Failed
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3 }}>
                            {message}
                        </Typography>
                        <Button 
                            variant="contained" 
                            onClick={() => navigate('/')}
                            sx={{ mt: 3, bgcolor: '#2E8B57', '&:hover': { bgcolor: '#1b5e20' } }}
                        >
                            Go to Login
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default ActivateAccount;
