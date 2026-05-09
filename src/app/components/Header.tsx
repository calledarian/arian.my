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
    minHeight: '1.5em',

    '& .cursor': {
        display: 'inline-block',
        width: '2px',
        height: '1em',
        backgroundColor: 'var(--accent-color)',
        marginLeft: '3px',
        animation: `${blink} 1s infinite`,
    },
});

const AnimatedContainer = styled(Box)({
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--background)',
    transition: 'background 0.3s, color 0.3s',
});

// Business-focused rotating services
enum Skill {
    CMS = 'CMS platforms for organizations',
    Booking = 'booking & reservation systems',
    Dashboards = 'management dashboards',
    Automation = 'automation workflows',
    APIs = 'API-driven business systems',
}

// Technologies
enum Tech {
    TypeScript = 'TypeScript',
    NodeJS = 'Node.js',
    React = 'React',
    NextJS = 'Next.js',
    NestJS = 'NestJS',
    PostgreSQL = 'PostgreSQL',
    MaterialUI = 'Material UI',
}

export default function Header() {
    const theme = useTheme();

    const isMobile = useMediaQuery(
        theme.breakpoints.down('md')
    );

    const skills = Object.values(Skill);

    const techStack = Object.values(Tech);

    const [currentSkillIndex, setCurrentSkillIndex] =
        useState(0);

    const [displayText, setDisplayText] =
        useState('');

    const [isDeleting, setIsDeleting] =
        useState(false);

    const [showGreeting, setShowGreeting] =
        useState(false);

    const me = "Hi, I'm Arian";

    const greeting =
        'I develop operational software for businesses and organizations — from CMS platforms and booking systems to dashboards, automation workflows, and scalable full-stack applications.';

    useEffect(() => {
        const greetingTimer = setTimeout(
            () => setShowGreeting(true),
            300
        );

        return () => clearTimeout(greetingTimer);
    }, []);

    useEffect(() => {
        const currentSkill = skills[currentSkillIndex];

        let timeout: NodeJS.Timeout;

        if (!isDeleting) {
            if (displayText.length < currentSkill.length) {
                timeout = setTimeout(() => {
                    setDisplayText(
                        currentSkill.slice(
                            0,
                            displayText.length + 1
                        )
                    );
                }, 70);
            } else {
                timeout = setTimeout(
                    () => setIsDeleting(true),
                    2200
                );
            }
        } else {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(
                        displayText.slice(0, -1)
                    );
                }, 35);
            } else {
                setIsDeleting(false);

                setCurrentSkillIndex(
                    (prev) => (prev + 1) % skills.length
                );
            }
        }

        return () => clearTimeout(timeout);
    }, [
        displayText,
        isDeleting,
        currentSkillIndex,
        skills,
    ]);

    return (
        <AnimatedContainer>
            <Container
                component="header"
                maxWidth="lg"
            >
                <Box
                    textAlign="center"
                    px={2}
                >
                    {/* Name */}
                    <Fade
                        in={showGreeting}
                        timeout={1000}
                    >
                        <Typography
                            variant={isMobile ? 'h3' : 'h1'}
                            sx={{
                                fontWeight: 800,
                                color: 'var(--foreground)',
                                mb: 2,
                                letterSpacing: '-0.04em',
                                lineHeight: 1,
                            }}
                        >
                            {me}
                        </Typography>
                    </Fade>

                    {/* Main positioning */}
                    <Fade
                        in={showGreeting}
                        timeout={1500}
                    >
                        <Typography
                            variant={isMobile ? 'h5' : 'h3'}
                            sx={{
                                color: 'var(--foreground)',
                                fontWeight: 500,
                                mb: 4,
                                lineHeight: 1.2,
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: 1,
                            }}
                        >
                            <span>I build</span>

                            <TypewriterBox>
                                <span
                                    style={{
                                        color: 'var(--tech-color)',
                                        fontWeight: 700,
                                    }}
                                >
                                    {displayText}
                                </span>

                                <span className="cursor" />
                            </TypewriterBox>
                        </Typography>
                    </Fade>

                    {/* Supporting description */}
                    <Fade
                        in={showGreeting}
                        timeout={2000}
                    >
                        <Typography
                            variant={isMobile ? 'body1' : 'h6'}
                            sx={{
                                color: 'var(--foreground)',
                                fontWeight: 300,
                                maxWidth: 850,
                                mx: 'auto',
                                lineHeight: 1.8,
                                opacity: 0.85,
                            }}
                        >
                            {greeting}
                        </Typography>
                    </Fade>

                    {/* Tech stack */}
                    <Fade
                        in={showGreeting}
                        timeout={2500}
                    >
                        <Box
                            sx={{
                                mt: 5,
                                display: 'flex',
                                gap: 1.2,
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                            }}
                        >
                            {techStack.map((tech) => (
                                <Box
                                    key={tech}
                                    sx={{
                                        px: 2,
                                        py: 0.9,
                                        borderRadius: '999px',

                                        border:
                                            '1px solid rgba(255,255,255,0.08)',

                                        background:
                                            'rgba(255,255,255,0.03)',

                                        backdropFilter:
                                            'blur(10px)',

                                        fontSize: '0.95rem',
                                        fontWeight: 500,

                                        color: 'var(--tech-color)',

                                        transition:
                                            'all 0.2s ease',

                                        '&:hover': {
                                            transform:
                                                'translateY(-2px)',
                                        },
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
