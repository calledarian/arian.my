import { Box, Container, Typography, Stack, IconButton, Link } from '@mui/material';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

export default function Footer() {
    return (
        <Box component="footer" sx={{ py: 4, mt: 'auto' }}>
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography variant="body1">
                        © 2025 Arian Khademolghorani. All rights reserved.
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        {/* Use CSS variable for icon color */}
                        <IconButton component={Link} href="https://github.com/arian" target="_blank" rel="noopener" sx={{ color: 'var(--icon-color)' }}>
                            <GitHub />
                        </IconButton>
                        <IconButton component={Link} href="https://linkedin.com/in/arian" target="_blank" rel="noopener" sx={{ color: 'var(--icon-color)' }}>
                            <LinkedIn />
                        </IconButton>
                        <IconButton component={Link} href="https://twitter.com/arian" target="_blank" rel="noopener" sx={{ color: 'var(--icon-color)' }}>
                            <Twitter />
                        </IconButton>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
