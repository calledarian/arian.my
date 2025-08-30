'use client';

import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Switch, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Link from 'next/link';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': { transform: 'scale(.8)', opacity: 1 },
        '100%': { transform: 'scale(2.4)', opacity: 0 },
    },
}));

export default function NavigationBar() {
    const [darkMode, setDarkMode] = useState(false);

    // Initialize dark mode from localStorage or system preference
    useEffect(() => {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            setDarkMode(saved === 'true');
            document.body.classList.toggle('dark', saved === 'true');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
            document.body.classList.toggle('dark', prefersDark);
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const newMode = !prev;
            localStorage.setItem('darkMode', String(newMode));
            document.body.classList.toggle('dark', newMode);
            return newMode;
        });
    };

    return (
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ top: 0 }}>
            <Container maxWidth="lg">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                    {/* Left: Avatar */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar
                                src="/arian/ariansmily.jpg"
                                alt="Arian Khademolghorani"
                                sx={{ width: { sm: 50, md: 60 }, height: { sm: 50, md: 60 } }}
                            />
                        </StyledBadge>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.6rem' },
                                fontWeight: 500
                            }}
                        >
                            Software Developer
                        </Typography>

                    </Box>

                    {/* Right: Buttons + Switch */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Switch checked={darkMode} onChange={toggleDarkMode} />
                        <Button color="inherit" LinkComponent={Link} href="/">Home</Button>
                        <Button color="inherit" LinkComponent={Link} href="/blog">Blog</Button>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
