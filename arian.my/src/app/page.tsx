import { Box } from '@mui/material';
import Header from './components/Header';
import Hero from './components/Hero';
import Education from './components/Education';

export default function HomePage() {
  return (
    <>
      <Header />
      <Box mt={4}> {/* margin-top 32px */}
        <Hero />
      </Box>
      <Box mt={6}> {/* margin-top 48px */}
        <Education />
      </Box>
    </>
  );
}
