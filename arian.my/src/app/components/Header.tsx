'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Fade, useTheme, useMediaQuery } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const blink = keyframes`
  0%, 50% { border-color: transparent; }
  51%, 100% { border-color: var(--accent-color); }
`;

const TypewriterBox = styled(Box)({
    display: 'inline-block',
    position: 'relative',
    minHeight: '1.5em',
    '& .cursor': {
        display: 'inline-block',
        width: '2px',
        height: '1em',
        backgroundColor: 'var(--accent-color)',
        marginLeft: '2px',
        animation: `${blink} 1s infinite`,
    },
});

const AnimatedContainer = styled(Box)({
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--background)',
    transition: 'background 0.3s, color 0.3s',
});

// Enums
enum Skill {
    WebTools = 'web tools',
    MobileApps = 'mobile apps',
    AI = 'automation bots',
    APIs = 'APIs',
    UXUI = 'UX/UI',
    Scalable = 'scalable solutions',
}

enum Tech {
    TypeScript = 'TypeScript',
    NodeJS = 'Node.js',
    React = 'React',
    NextJS = 'Next.js',
    Python = 'Python',
    MaterialUI = 'Material UI',
    Expo = 'Expo.js',
}

export default function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const skills = Object.values(Skill);
    const techStack = Object.values(Tech);

    const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);
    const me = 'Hi, I\'m Arian';
    const greeting = 'Software developer passionate about building innovative solutions that make a difference.';

    useEffect(() => {
        const greetingTimer = setTimeout(() => setShowGreeting(true), 300);
        return () => clearTimeout(greetingTimer);
    }, []);

    useEffect(() => {
        const currentSkill = skills[currentSkillIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting) {
            if (displayText.length < currentSkill.length) {
                timeout = setTimeout(() => setDisplayText(currentSkill.slice(0, displayText.length + 1)), 100);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 2000);
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 50);
            } else {
                setIsDeleting(false);
                setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentSkillIndex, skills]);

    return (
        <AnimatedContainer>
            <Container component="header" maxWidth="lg">
                <Box textAlign="center" px={2}>
                    <Fade in={showGreeting} timeout={1000}>
                        <Typography
                            variant={isMobile ? 'h3' : 'h1'}
                            sx={{ fontWeight: 800, color: 'var(--foreground)', mb: 2, letterSpacing: '-0.02em' }}
                        >
                            {me}
                        </Typography>
                    </Fade>

                    <Fade in={showGreeting} timeout={1500}>
                        <Typography
                            variant={isMobile ? 'h5' : 'h4'}
                            sx={{
                                color: 'var(--foreground)',
                                fontWeight: 400,
                                mb: 4,
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 1,
                                flexWrap: 'wrap',
                            }}
                        >
                            <span>I create</span>
                            <TypewriterBox>
                                <span style={{ color: 'var(--tech-color)', fontWeight: 600 }}>
                                    {displayText}
                                </span>
                                <span className="cursor" />
                            </TypewriterBox>
                        </Typography>
                    </Fade>

                    <Fade in={showGreeting} timeout={2000}>
                        <Typography
                            variant={isMobile ? 'body1' : 'h6'}
                            sx={{
                                color: 'var(--foreground)',
                                fontWeight: 300,
                                maxWidth: 600,
                                mx: 'auto',
                                lineHeight: 1.6,

                            }}
                        >
                            {greeting}
                        </Typography>
                    </Fade>

                    <Fade in={showGreeting} timeout={2500}>
                        <Box sx={{ mt: 4, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                            {techStack.map((tech) => (
                                <Box
                                    key={tech}
                                    sx={{
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: '20px',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: 'var(--tech-color)',
                                        transition: 'background-color 0.3s',
                                    }}
                                >
                                    {tech}
                                </Box>
                            ))}
                        </Box>
                    </Fade>
                </Box>
            </Container>
        </AnimatedContainer>
    );
}
