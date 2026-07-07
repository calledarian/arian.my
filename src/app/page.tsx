import { Box } from '@mui/material';
import Header from './components/Header';
import Section from './components/Section';
import BlogsPage from './components/Hero'; // Note: Hero.tsx currently contains the blogs list
import Education from './components/Education';

export default function HomePage() {
  return (
    <Box>
      <Header />

      <Section id="work" title="Selected Work">
        <BlogsPage />
      </Section>

      <Section id="about" title="About & Experience" maxWidth="md">
        <Education />
      </Section>
    </Box>
  );
}
