import { Box, Container, Typography, Stack, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Telegram } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 6,
                borderTop: '1px solid var(--border-color)',
                background: 'transparent',
            }}
        >
            <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={4}
                    sx={{
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", md: "center" }
                    }}
                >
                    <Box>
                        <Typography className="mono" sx={{ fontSize: "12px", fontWeight: 700, mb: 1 }}>
                            Arian Khademolghorani
                        </Typography>
                        <Typography sx={{ fontSize: "14px", color: "var(--tech-color)", maxWidth: 500 }}>
                            Software Engineer architecting and building solutions - applications.
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1}>
                        <IconButton
                            component="a"
                            href="https://github.com/calledarian"
                            target="_blank"
                            rel="noopener"
                            sx={{ color: 'var(--foreground)', border: '1px solid var(--border-color)', borderRadius: 0, p: 1 }}
                        >
                            <GitHub fontSize="small" />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://linkedin.com/in/arian-khademolghorani"
                            target="_blank"
                            rel="noopener"
                            sx={{ color: 'var(--foreground)', border: '1px solid var(--border-color)', borderRadius: 0, p: 1 }}
                        >
                            <LinkedIn fontSize="small" />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://t.me/calledarian"
                            target="_blank"
                            rel="noopener"
                            sx={{ color: 'var(--foreground)', border: '1px solid var(--border-color)', borderRadius: 0, p: 1 }}
                        >
                            <Telegram fontSize="small" />
                        </IconButton>
                    </Stack>
                </Stack>

                <Box sx={{ mt: 6, pt: 3, borderTop: '1px solid var(--border-color)' }}>
                    <Typography className="mono" sx={{ fontSize: "11px", color: "var(--tech-color)" }}>
                        © 2026 Arian
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
