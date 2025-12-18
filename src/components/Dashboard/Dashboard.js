import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    CircularProgress,
    Grid,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    IconButton,
    useTheme,
    useMediaQuery,
    Container,
    Card,
    CardActionArea
} from '@mui/material';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Inventory as InventoryIcon,
    People as PeopleIcon,
    ReceiptLong as ReceiptIcon,
    Assessment as AssessmentIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Charts
import SalesGrowthChart from './charts/SalesGrowthChart';
import PaddyStockChart from './charts/PaddyStockChart';
import InventorySummaryChart from './charts/InventorySummaryChart';

const drawerWidth = 92;

// ---------- Styled ----------
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 0,
    backgroundColor: '#FFFFFF', // Clean white background
    minHeight: '100vh',
    [theme.breakpoints.up('lg')]: {
        marginLeft: `${drawerWidth}px`,
    },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        borderRight: 'none',
        background: 'transparent',
        padding: theme.spacing(2, 1),
    },
}));

const SidebarShell = styled(Paper)(() => ({
    height: 'calc(100vh - 32px)',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 26,
    border: '2px solid #CFF3DD',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 8px 18px rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
}));

const SidebarList = styled(List)(() => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 28,
}));

const IconCircle = styled(Box)(() => ({
    width: 52,
    height: 52,
    borderRadius: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #CFF3DD',
    boxShadow: '0 6px 14px rgba(152, 251, 152, 0.18)',
    background: '#FFFFFF',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.1)',
        backgroundColor: '#f1f8e9'
    }
}));

const ChartsShell = styled(Paper)(() => ({
    borderRadius: 26,
    border: '3px solid #A7EFC3',
    background: '#FFFFFF',
    padding: 28,
    boxShadow: '0 12px 28px rgba(152, 251, 152, 0.30)',
}));

const NavCard = styled(Card)(({ theme }) => ({
    borderRadius: 20,
    background: 'linear-gradient(135deg, #ffffff 0%, #f9fbe7 100%)', // Subtle gradient
    border: '1px solid #CFF3DD',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    height: '100%',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(152, 251, 152, 0.4)',
        borderColor: '#98FB98',
    }
}));

const NavIconBox = styled(Box)(() => ({
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: '#e8f5e9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    color: '#388e3c'
}));

// ---------- Component ----------
const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Chart Data States
    const [salesTrend, setSalesTrend] = useState([]);
    const [paddyStock, setPaddyStock] = useState([]);
    const [inventorySummary, setInventorySummary] = useState([]);

    const theme = useTheme();
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            try {
                // Fetch Profile
                const profileRes = await fetch(`${API_URL}/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (profileRes.ok) {
                    const profileData = await profileRes.json();
                    setUser(profileData);
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/');
                    return;
                }

                // Fetch Chart Data
                const [trendRes, paddyRes, summaryRes] = await Promise.all([
                    fetch(`${API_URL}/reports/daily-trend`, { headers: { Authorization: `Bearer ${token}` } }),
                    fetch(`${API_URL}/reports/paddy-stock`, { headers: { Authorization: `Bearer ${token}` } }),
                    fetch(`${API_URL}/reports/inventory-summary`, { headers: { Authorization: `Bearer ${token}` } }),
                ]);

                if (trendRes.ok) setSalesTrend(await trendRes.json());
                if (paddyRes.ok) setPaddyStock(await paddyRes.json());
                if (summaryRes.ok) setInventorySummary(await summaryRes.json());

            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate, API_URL]);

    const handleDrawerToggle = () => setMobileOpen((v) => !v);

    const drawerContent = (
        <SidebarShell elevation={0}>
            <SidebarList>
                <ListItemButton sx={{ p: 0, justifyContent: 'center' }}>
                    <ListItemIcon sx={{ minWidth: 0 }}>
                        <IconCircle>
                            <SearchIcon sx={{ fontSize: 30, color: '#3FAE64' }} />
                        </IconCircle>
                    </ListItemIcon>
                </ListItemButton>

                <ListItemButton sx={{ p: 0, justifyContent: 'center' }}>
                    <ListItemIcon sx={{ minWidth: 0 }}>
                        <IconCircle>
                            <NotificationsIcon sx={{ fontSize: 30, color: '#3FAE64' }} />
                        </IconCircle>
                    </ListItemIcon>
                </ListItemButton>

                <ListItemButton sx={{ p: 0, justifyContent: 'center' }}>
                    <ListItemIcon sx={{ minWidth: 0 }}>
                        <IconCircle>
                            <SettingsIcon sx={{ fontSize: 30, color: '#3FAE64' }} />
                        </IconCircle>
                    </ListItemIcon>
                </ListItemButton>
            </SidebarList>
        </SidebarShell>
    );

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="success" />
            </Box>
        );
    }

    if (!user) return null;

    const navItems = [
        { label: 'Inventory', icon: <InventoryIcon sx={{ fontSize: 32 }} />, path: '/inventory', role: 'all' },
        { label: 'Employees', icon: <PeopleIcon sx={{ fontSize: 32 }} />, path: '/employees', role: 'owner' },
        { label: 'Payments', icon: <ReceiptIcon sx={{ fontSize: 32 }} />, path: '/sales', role: 'all' },
        { label: 'Reports', icon: <AssessmentIcon sx={{ fontSize: 32 }} />, path: '/reports', role: 'all' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#FFFFFF' }}>
            {/* Mobile Hamburger */}
            {!isLg && (
                <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                        position: 'fixed',
                        top: 16,
                        left: 16,
                        zIndex: 1400,
                        color: '#3FAE64',
                        bgcolor: '#FFFFFF',
                        border: '2px solid #CFF3DD',
                        boxShadow: '0 10px 18px rgba(0,0,0,0.08)',
                        borderRadius: 3,
                    }}
                >
                    <MenuIcon sx={{ fontSize: 34 }} />
                </IconButton>
            )}

            {/* Sidebar */}
            <Box component="nav" sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, background: 'transparent' },
                    }}
                >
                    {drawerContent}
                </Drawer>

                <StyledDrawer variant="permanent" sx={{ display: { xs: 'none', lg: 'block' } }} open>
                    {drawerContent}
                </StyledDrawer>
            </Box>

            {/* Main */}
            <Main>
                <Container maxWidth="lg" sx={{ position: 'relative' }}>

                    {/* Header Section */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 6, pt: 2 }}>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: { xs: '2.0rem', md: '2.5rem' },
                                    fontWeight: 800,
                                    color: '#2e7d32', // Darker green for contrast
                                    letterSpacing: '-0.5px'
                                }}
                            >
                                Welcome back, {user.first_name}!
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 1,
                                    fontSize: { xs: '1.0rem', md: '1.2rem' },
                                    color: '#757575',
                                    fontWeight: 500
                                }}
                            >
                                Here's what's happening in your business today.
                            </Typography>
                        </Box>

                        <Box sx={{
                            borderRadius: '50%',
                            p: 0.5,
                            border: '3px solid #4CAF50',
                            boxShadow: '0 4px 14px rgba(76, 175, 80, 0.3)',
                            cursor: 'pointer'
                        }}
                            onClick={() => navigate('/profile')}
                        >
                            <Avatar src={user.profile_image} sx={{ width: 64, height: 64 }} />
                        </Box>
                    </Box>

                    {/* Charts Grid */}
                    <ChartsShell sx={{ mb: 6 }}>
                        <Grid container spacing={4} alignItems="center" sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}>

                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center', height: '100%', width: '100%' }}>
                                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#333' }}>
                                        Sales Growth (This Month)
                                    </Typography>
                                    <Box sx={{ height: 350 }}>
                                        <SalesGrowthChart data={salesTrend} />
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4} sx={{ borderLeft: { md: '1px solid #e0e0e0' }, borderRight: { md: '1px solid #e0e0e0' } }}>
                                <Box sx={{ textAlign: 'center', height: '100%', width: '100%' }}>
                                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#333' }}>
                                        Paddy Stock Levels
                                    </Typography>
                                    <Box sx={{ height: 350 }}>
                                        <PaddyStockChart data={paddyStock} />
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box sx={{ textAlign: 'center', height: '100%', width: '100%' }}>
                                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: '#333' }}>
                                        Inventory Value Summary
                                    </Typography>
                                    <Box sx={{ height: 350 }}>
                                        <InventorySummaryChart data={inventorySummary} />
                                    </Box>
                                </Box>
                            </Grid>

                        </Grid>
                    </ChartsShell>

                    {/* Quick Access Navigation */}
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, color: '#333' }}>
                        Quick Access
                    </Typography>

                    <Grid container spacing={3}>
                        {navItems.map((item) => (
                            (item.role === 'all' || item.role === user.role) && (
                                <Grid item xs={12} sm={6} md={3} key={item.label}>
                                    <NavCard elevation={0}>
                                        <CardActionArea onClick={() => navigate(item.path)} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                            <NavIconBox>
                                                {item.icon}
                                            </NavIconBox>
                                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                                {item.label}
                                            </Typography>
                                        </CardActionArea>
                                    </NavCard>
                                </Grid>
                            )
                        ))}
                    </Grid>

                </Container>
            </Main>
        </Box>
    );
};

export default Dashboard;