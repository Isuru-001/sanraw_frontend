import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Optional: Redirect to login if no user found (client-side protection)
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h3" gutterBottom>
                Welcome to the Dashboard
            </Typography>
            {user && (
                <Typography variant="h5" gutterBottom>
                    Hello, {user.name} ({user.role})
                </Typography>
            )}
            <Button variant="contained" color="primary" onClick={handleLogout} sx={{ mt: 2 }}>
                Logout
            </Button>
        </Box>
    );
};

export default Dashboard;
