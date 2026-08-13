'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Container,
    Fade,
    useTheme,
    useMediaQuery,
} from '@mui/material';

import { styled, keyframes } from '@mui/material/styles';

const blink = keyframes`
  0%, 50% { opacity: 0; }
  51%, 100% { opacity: 1; }
`;

const TypewriterBox = styled(Box)({
    display: 'inline-block',
    position: 'relative',
    minHeight: '1.2em',

    '& .cursor': {
        display: 'inline-block',
        width: '2px',
        height: '1em',
        backgroundColor: 'var(--foreground)',
        marginLeft: '3px',
        animation: `${blink} 1s infinite`,
        verticalAlign: 'middle',
    },
});

const AnimatedContainer = styled(Box)({
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
});

enum Skill {
    CMS = 'CMS platforms',
    Booking = 'Booking systems',
    Dashboards = 'Management dashboards',
    Automation = 'Automation workflows',
    Ecommerce = 'E-commerce solutions',
    APIs = 'API integrations',
}

const TECH_STACK = [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'Expo',
    'Python',
    'PHP',
    'PostgreSQL',
];

export default function Header() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const skills = Object.values(Skill);

    const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showGreeting, setShowGreeting] = useState(false);

    useEffect(() => {
        const greetingTimer = setTimeout(() => setShowGreeting(true), 100);
        return () => clearTimeout(greetingTimer);
    }, []);

    useEffect(() => {
        const currentSkill = skills[currentSkillIndex];
        let timeout: NodeJS.Timeout;

        if (!isDeleting) {
            if (displayText.length < currentSkill.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentSkill.slice(0, displayText.length + 1));
                }, 50);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), 2000);
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 30);
            } else {
                setIsDeleting(false);
                setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentSkillIndex, skills]);

    return (
        <AnimatedContainer>
            <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
                <Fade in={showGreeting} timeout={1000}>
                    <Box sx={{ maxWidth: 800 }}>
                        <Typography
                            variant={isMobile ? 'h5' : 'h3'}
                            sx={{
                                color: 'var(--foreground)',
                                fontWeight: 500,
                                mb: 4,
                                lineHeight: 1.2,
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 1.5,
                            }}
                        >
                            <span>I build</span>
                            <TypewriterBox>
                                <span style={{ fontWeight: 700 }}>
                                    {displayText}
                                </span>
                                <span className="cursor" />
                            </TypewriterBox>
                        </Typography>

                        <Typography
                            variant={isMobile ? 'body1' : 'h6'}
                            sx={{
                                color: 'var(--tech-color)',
                                fontWeight: 400,
                                maxWidth: 700,
                                lineHeight: 1.7,
                                mb: 6,
                            }}
                        >
                            Software engineer focused on backend systems, distributed architecture, and building tools that handle operational complexity.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                            {TECH_STACK.map((tech) => (
                                <Box
                                    key={tech}
                                    className="mono"
                                    sx={{
                                        px: 1.5,
                                        py: 0.5,
                                        border: '1px solid var(--border-color)',
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        color: 'var(--tech-color)',
                                        background: 'var(--background)',
                                    }}
                                >
                                    {tech}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Fade>
            </Container>
        </AnimatedContainer>
    );
}
