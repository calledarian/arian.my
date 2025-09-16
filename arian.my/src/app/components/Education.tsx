import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import FadeIn from '../utils/fadeIn';

export default function Education() {
    const timelineData = [
        {
            title: 'Khan Academy',
            desc: (
                <>
                    Computer programming -
                    <span style={{ fontWeight: 600 }}> JavaScript and the web </span>
                </>
            ),
            icon: <SchoolIcon />,
            type: 'education'
        },
        {
            title: 'Harvard Univeristy',
            desc: (
                <>
                    CS50: Introduction to Computer Science |{""}
                    <span style={{ fontWeight: 600 }}> Harvard University </span>
                </>
            ),
            icon: <MilitaryTechIcon />,
            type: 'certificate'
        },
        {
            title: 'Postman',
            desc: (
                <>
                    <span style={{ fontWeight: 600 }}> Postman </span>
                    API Fundamentals Student Expert
                </>
            ),
            icon: <MilitaryTechIcon />,
            type: 'certificate'
        },
        {
            title: 'Web Developer',
            desc: (
                <>
                    <span style={{ fontWeight: 600 }}> ReactJs - NestJs - PostgreSQL </span>
                    Stack Freelance Web Developer
                </>
            ),
            icon: <WorkIcon />,
            type: 'job'
        },
        {
            title: 'Software Developer Intern',
            desc: (
                <>
                    Cross-Platform Software Developer at{" "}
                    <span style={{ fontWeight: 600 }}>Web Essentials Co., Ltd.</span>
                    <br />
                    <Typography
                        variant="body2"
                        component="span" // <-- fix here
                        sx={{
                            color: "var(--tech-color)",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.25rem",
                            alignItems: "center",
                        }}
                    >
                        Currently learning:{" "}
                        <span style={{ fontWeight: 600 }}>TAEF: Artificial Intelligence</span>{" "}
                        & <span style={{ fontWeight: 600 }}>CS50: Cybersecurity</span>
                    </Typography>
                </>
            ),

            icon: <WorkIcon />,
            type: 'job',
        },

    ];

    return (
        <Box sx={{ maxWidth: 700, margin: '0 auto' }}>
            <Timeline position="alternate">
                {timelineData.map((item, i) => (
                    <FadeIn key={i} delay={i * 400}>
                        <TimelineItem key={i}>
                            <TimelineSeparator>
                                {i !== 0 && <TimelineConnector />}
                                <TimelineDot
                                    sx={{
                                        bgcolor:
                                            item.type === 'job'
                                                ? 'var(--timeline-job)'
                                                : item.type === 'education'
                                                    ? 'var(--timeline-education)'
                                                    : item.type === 'certificate'
                                                        ? 'var(--timeline-certificate)'
                                                        : 'var(--timeline-learning)',
                                        color: 'var(--card-text)',
                                    }}
                                >
                                    {item.icon}
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>

                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h6" component="span" sx={{ color: "var(--tech-color)" }}>
                                    {item.title}
                                </Typography>
                                <Typography sx={{ color: "var(--card-color)" }}>{item.desc}</Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </FadeIn>
                ))}
            </Timeline>
        </Box>
    );
}
