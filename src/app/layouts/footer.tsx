import { Box, Container, Typography, Stack, IconButton, Link } from '@mui/material';
import { GitHub, LinkedIn, Telegram } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 5,
                mt: 8,
                borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            <Container maxWidth="lg">

                <Stack
                    spacing={3}
                    alignItems="center"
                    textAlign="center"
                >

                    {/* Identity statement */}
                    <Typography
                        variant="body2"
                        sx={{
                            maxWidth: 600,
                            opacity: 0.85,
                            lineHeight: 1.7,
                        }}
                    >
                        Building operational software systems — CMS platforms, booking systems,
                        dashboards, and automation tools for businesses through Ariel Solutions.
                    </Typography>

                    {/* Social links */}
                    <Stack direction="row" spacing={1}>
                        <IconButton
                            component={Link}
                            href="https://t.me/calledarian"
                            target="_blank"
                            rel="noopener"
                            sx={{ color: 'var(--icon-color)' }}
                        >
                            <Telegram />
                        </IconButton>

                        <IconButton
                            component={Link}
                            href="https://github.com/calledarian"
                            target="_blank"
                            rel="noopener"
                            sx={{ color: 'var(--icon-color)' }}
                        >
                            <GitHub />
                        </IconButton>

                        <IconButton
                            component={Link}
                            href="https://linkedin.com/in/arian-khademolghorani"
                            target="_blank"
                            rel="noopener"
                            sx={{ color: 'var(--icon-color)' }}
                        >
                            <LinkedIn />
                        </IconButton>
                    </Stack>

                    {/* Bottom line */}
                    <Typography
                        variant="caption"
                        sx={{ opacity: 0.6 }}
                    >
                        © 2026 Ariel Solutions. All systems built and maintained by Arian Khademolghorani.
                    </Typography>

                </Stack>

            </Container>
        </Box>
    );
}