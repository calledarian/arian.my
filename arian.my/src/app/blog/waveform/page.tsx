
import React from "react";
import { Container, Typography, Box, Paper, List, ListItem } from "@mui/material";
import FadeIn from "@/app/utils/fadeIn";
import Script from "next/script";

// --- Types & Interfaces ---
interface BlogSection {
    id: string;
    title: string;
    content?: string | React.ReactNode;
    codeSnippet?: string;
    listItems?: string[];
}

enum BlogSections {
    Install = "install",
    RecorderHook = "recorderHook",
    Waveform = "waveform",
    MainApp = "mainApp",
    WhyThisWorks = "whyThisWorks",
}

// --- Blog Data ---
const blogSections: BlogSection[] = [
    {
        id: BlogSections.Install,
        title: "1. First, You&apos;ll Need to Install `expo-audio`",
        content: "We&apos;re using `expo-audio` because it&apos;s a huge help. It gives you things that other libraries just don&apos;t:",
        codeSnippet: "expo install expo-audio",
        listItems: [
            "1. Live decibel readings (super important for that cool visualizer)",
            "2. Handy hooks for recording, like `useAudioRecorder`",
            "3. Full control over your recording settings and quality",
        ],
    },
    {
        id: BlogSections.RecorderHook,
        title: "2. The Recorder Hook: How to Start, Stop & Get Metering",
        content: "This is the brain of the whole thing. We&apos;re building a custom hook to handle the recording, grab those decibel readings, and give us the finished audio file&apos;s link.",
        codeSnippet: `function useAudioRecorderHook() {
  const [recordingInProgress, setRecordingInProgress] = useState(false);
  const [currentDecibel, setCurrentDecibel] = useState<number | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const recorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
  });

  const recorderState = useAudioRecorderState(recorder);
  const latestDecibel = useRef<number | null>(null);

  useEffect(() => {
    setRecordingInProgress(recorderState.isRecording);
    setCurrentDecibel(recorderState.metering ?? null);
    if (recorderState.metering != null) latestDecibel.current = recorderState.metering;
  }, [recorderState.metering, recorderState.isRecording]);

  const startOrStopRecording = async () => {
    const permission = await AudioModule.requestRecordingPermissionsAsync();
    if (!permission.granted) return Alert.alert("Permission required");

    await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });

    if (recordingInProgress) {
      await recorder.stop();
      setAudioUri(recorder.uri);
    } else {
      await recorder.prepareToRecordAsync();
      recorder.record();
    }
  };

  return { recordingInProgress, currentDecibel, audioUri, startOrStopRecording, latestDecibel };
}`,
        listItems: [
            "1. isMeteringEnabled: true is the magic switch that lets us create the waveform.",
            "2. We&apos;re using a ref for the latest decibel reading. This is a pro tip, it lets us update the value without causing a bunch of pointless re-renders.",
            "3. The useEffect is just there to update our state so the UI knows what&apos;s up.",
        ],
    },
    {
        id: BlogSections.Waveform,
        title: "3. Building That Awesome WhatsApp-Style Waveform",
        content:
            "This is the fun part. We want a smooth, scrolling waveform that looks like a real-time voice message. We&apos;ll even add a little bit of randomness to make it feel more alive, just like the real WhatsApp animation.",
        codeSnippet: `function WaveformDisplay({
  recordingInProgress,
  latestDecibel,
}: {
  recordingInProgress: boolean;
  latestDecibel: React.MutableRefObject<number | null>;
}) {
  const [waveformHeights, setWaveformHeights] = useState<number[]>([]);
  const maxBars = 50;

  useEffect(() => {
    if (!recordingInProgress) return;
    setWaveformHeights([]);

    let waveformBuffer: number[] = [];
    const interval = setInterval(() => {
      if (latestDecibel.current != null) {
        const normalized = Math.max(0, Math.min(1, (latestDecibel.current + 60) / 60));
        const variation = 0.6 + Math.random() * 0.1; // WhatsApp wiggle
        const height = normalized * 40 * variation;

        waveformBuffer.push(height);
        if (waveformBuffer.length > maxBars) waveformBuffer.shift();

        setWaveformHeights([...waveformBuffer]);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [recordingInProgress]);

  return (
    <View style={{
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      width: "100%",
      marginBottom: 20,
    }}>
      {waveformHeights.map((height, index) => (
        <View
          key={index}
          style={{
            width: 4,
            height: height * 2,
            backgroundColor: "#007AFF",
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );
}`,
        listItems: [
            "Here's the logic, broken down:",
            "1. We take the latest decibel reading and normalize it (convert the -60 to 0 dB range into a 0 to 1 value).",
            "2. Then, we multiply that value by 40 and add a tiny bit of random variation--this is the secret to that cool 'wiggle' effect.",
            "3. We push the new bar height into a buffer array, making sure it never gets bigger than 50 bars.",
            "4. Finally, we render the array as a bunch of vertical bars in a row, which gives you that smooth scrolling effect.",
        ],
    },
    {
        id: BlogSections.MainApp,
        title: "4. Putting It All Together in the Main App",
        content: "Now for the easy part. We&apos;ll combine our custom hook and the waveform component into a clean, simple UI. No extra fluff, just the core functionality.",
        codeSnippet: `export default function AudioRecorderWithWaveform() {
  const { recordingInProgress, currentDecibel, audioUri, startOrStopRecording, latestDecibel } =
    useAudioRecorderHook();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ marginBottom: 20, fontSize: 18, fontWeight: "bold" }}>Waveform + Playback</Text>

      <WaveformDisplay recordingInProgress={recordingInProgress} latestDecibel={latestDecibel} />

      {currentDecibel != null && <Text style={{ marginBottom: 10 }}>{currentDecibel.toFixed(1)} dB</Text>}

      <TouchableOpacity
        onPress={startOrStopRecording}
        style={{
          padding: 10,
          backgroundColor: recordingInProgress ? "#FF3B30" : "#007AFF",
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "white" }}>{recordingInProgress ? "Stop" : "Record"}</Text>
      </TouchableOpacity>
    </View>
  );
}`,
        listItems: [
            "Your UI is pretty straightforward:",
            " - [A container for the scrolling waveform bars]",
            " - [A little text display for the exact decibel number]",
            " - [A simple Record/Stop button]",
        ],
    },
    {
        id: BlogSections.WhyThisWorks,
        title: "5. So, Why Does This Work So Well?",
        listItems: [
            "You get live decibel readings, which is what makes a real-time waveform even possible.",
            "The `ref` and `buffer` make sure your app runs smoothly, with no excessive re-renders.",
            "The scrolling waveform feels natural because we&apos;re using a fixed buffer and a timed interval.",
            "And that tiny bit of random variation? It&apos;s what gives the animation that perfect, WhatsApp-like wiggle.",
        ],
    },
];

// --- Blog Page Component ---
export default function BlogPage() {
    return (
        <>
            <Script type="application/ld+json" id="blog-schema">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": "Expo Audio Waveform Tutorial",
                    "description": "Step-by-step guide to build a WhatsApp-style audio waveform using expo-audio in React Native.",
                    "author": { "@type": "Person", "name": "Arian Khademolghorani" },
                    "publisher": { "@type": "Organization", "name": "Arian.my", "logo": { "@type": "ImageObject", "url": "https://arian.my/assets/logo.png" } },
                    "datePublished": "2025-09-16",
                    "dateModified": "2025-09-16"
                })}
            </Script>

            <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
                <article>
                    <Typography variant="h3" component="h1" gutterBottom sx={{ mb: { xs: 2, sm: 4 }, fontSize: { xs: '2rem', sm: '3rem' } }}>
                        Building an Audio Waveform in Expo Audio: A Modern Guide
                    </Typography>

                    <Typography paragraph>
                        Most tutorials for audio waveforms rely on outdated expo-av methods that no longer work seamlessly in modern Expo apps. This guide provides a practical, step-by-step approach to implementing a fully functional audio waveform using expo-audio. Perfect for developers who want a working solution for recording, visualizing, and managing audio without the headaches of deprecated APIs.
                    </Typography>

                    {blogSections.map((section, i) => (
                        <FadeIn key={section.id} delay={i * 400}>
                            <Paper elevation={0} sx={{ py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 4 }, mb: { xs: 3, sm: 4 }, background: "var(--background)", color: "var(--foreground)", borderRadius: 2 }}>
                                <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, color: "var(--card-color)" }}>
                                    {section.title}
                                </Typography>

                                {section.content && (
                                    <Typography paragraph sx={{ mt: 1, color: "var(--tech-color)" }}>
                                        {section.content}
                                    </Typography>
                                )}

                                {section.codeSnippet && (
                                    <Box component="pre" sx={{ background: "var(--tech-color)", color: "var(--background)", p: { xs: 1.5, sm: 2 }, borderRadius: 1, fontFamily: "monospace", mt: 2, mb: 2, overflowX: 'auto' }}>
                                        {section.codeSnippet}
                                    </Box>
                                )}

                                {section.listItems && (
                                    <List sx={{ pl: { xs: 1, sm: 2 } }}>
                                        {section.listItems.map((item, i) => (
                                            <ListItem key={i} sx={{ display: "list-item", py: 0.5, color: "var(--card-color)" }}>
                                                {item}
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Paper>
                        </FadeIn>
                    ))}

                    <Typography paragraph sx={{ mt: 4, fontStyle: 'italic' }}>
                        And that&apos;s it! You now have a smooth, responsive audio recorder with a cool waveform visualizer. This approach is more reliable and gives you the tools you need to build something truly polished.
                    </Typography>
                </article>
            </Container>
        </>
    );
}

// Metadata
export const metadata = {
    title: "Expo Audio Waveform Tutorial | React Native Audio Recording Guide",
    description: "Step-by-step guide to build a WhatsApp-style audio waveform using expo-audio in React Native. Live decibel readings, smooth animations, and recording hooks explained.",
    keywords: ["expo-audio","react native audio recorder","audio waveform","expo tutorial","React Native recording","audio visualization"],
    authors: [{ name: "Arian Khademolghorani", url: "https://arian.my" }],
    openGraph: {
        title: "Expo Audio Waveform Tutorial",
        description: "Learn how to build a live audio waveform in React Native using expo-audio.",
        url: "https://arian.my/blog/waveform",
        siteName: "Your Dev Blog",
        type: "article",
        images: [{ url: "https://arian.my/assets/waveform.jpg", width: 1200, height: 630, alt: "Expo Audio Waveform Tutorial" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Expo Audio Waveform Tutorial",
        description: "Learn how to build a live audio waveform in React Native using expo-audio.",
        images: [{ url: "https://arian.my/assets/waveform.jpg", alt: "Expo Audio Waveform Tutorial", width: 1200 }],
    },
    robots: { index: true, follow: true },
    alternates: {
        canonical: "https://arian.my/blog/waveform",
        languages: { "en-US": "https://arian.my/en/blog/waveform", "tr-TR": "https://arian.my/tr/blog/waveform" },
    },
};
