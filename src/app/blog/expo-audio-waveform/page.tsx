import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
} from "@mui/material";
import FadeIn from "@/app/utils/fadeIn";
import Script from "next/script";
import Image from "next/image";

// --- Types & Interfaces ---
interface BlogImage {
  src: string;
  alt: string;
}

interface BlogSection {
  id: string;
  title: string;
  content?: string;
  codeSnippet?: string;
  listItems?: string[];
  images?: BlogImage[];
}

enum BlogSections {
  TheProblem = "the-problem",
  Install = "install",
  Config = "expo-audio-config",
  RecorderHook = "recorderHook",
  Waveform = "waveform",
  MainApp = "mainApp",
  WhyThisWorks = "whyThisWorks",
}

// --- Blog Data ---
const blogSections: BlogSection[] = [
  {
    id: BlogSections.TheProblem,
    title: "1. The Elephant in the Room: expo-av vs. expo-audio",
    content:
      "If you've been looking up React Native audio tutorials, you've probably hit a wall of guides using `expo-av`. Here is the truth: for modern audio recording and visualization, `expo-av` is outdated. `expo-audio` is the modern standard provided by Expo. It gives us granular control and features that the older library struggles with, specifically:",
    listItems: [
      "**Live decibel metering** out-of-the-box (crucial for our waveform visualizer).",
      "**Modern hooks** like `useAudioRecorder` that drastically reduce boilerplate.",
      "**Better native performance** for low-latency audio streams.",
    ],
  },
  {
    id: BlogSections.Install,
    title: "2. Getting Started: Installation",
    content:
      "Let's ditch the old methods and bring in the right tool for the job. Run this in your terminal to install the modern `expo-audio` library:",
    codeSnippet: "npx expo install expo-audio",
  },
  {
    id: BlogSections.Config,
    title: "3. Configuring Permissions in app.json",
    content:
      "Before we can visualize audio, we need permission to capture it. We handle this inside the app.json file. The expo-audio plugin simplifies this process across both iOS and Android platforms.",
    codeSnippet: `{
  "expo": {
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff",
          "dark": {
            "backgroundColor": "#000000"
          }
        }
      ],
      [
        "expo-audio",
        {
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone."
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}`,
    listItems: [
      "The **microphonePermission** string is exactly what iOS users will see when the system prompt appears.",
      "For **Android**, the plugin automatically injects the necessary microphone entries into your manifest layout.",
    ],
  },
  {
    id: BlogSections.RecorderHook,
    title: "4. The Engine: Building a Custom Recorder Hook",
    content:
      "Instead of cluttering our UI components with audio logic, we extract the brains of the operation into a custom hook. This hook handles permissions, starts/stops recording, and safely captures decibel readings.",
    codeSnippet: `import { useEffect, useRef, useState } from "react";
import { useAudioRecorder, useAudioRecorderState, RecordingPresets, AudioModule, setAudioModeAsync } from "expo-audio";
import { Alert } from "react-native";

export default function useAudioRecorderHook() {
  const [audioUri, setAudioUri] = useState<string | null>(null);

  const recorder = useAudioRecorder({
    ...RecordingPresets.HIGH_QUALITY,
    isMeteringEnabled: true,
  });

  const recorderState = useAudioRecorderState(recorder);
  const latestDecibel = useRef<number | null>(null);

  useEffect(() => {
    if (recorderState.metering != null) {
      latestDecibel.current = recorderState.metering;
    }

    if (!recorderState.isRecording && recorderState.uri) {
      setAudioUri(recorderState.uri);
    }
  }, [recorderState.metering, recorderState.isRecording, recorderState.uri]);

  const startOrStopRecording = async () => {
    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission required");
        return;
      }

      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });

      if (recorderState.isRecording) {
        await recorder.stop();
      } else {
        await recorder.prepareToRecordAsync();
        recorder.record();
      }
    } catch (e) {
      console.error("Failed to start or stop recording:", e);
      Alert.alert("Recording Error", "An error occurred while managing the recording.");
    }
  };

  return {
    recordingInProgress: recorderState.isRecording,
    currentDecibel: recorderState.metering ?? null,
    audioUri,
    startOrStopRecording,
    latestDecibel,
  };
}`,
    listItems: [
      "**isMeteringEnabled: true** is the magic switch that gives us real-time visual streams.",
      "**Performance Secret:** We store the decibel reading inside a \`useRef\`. Because decibels update dozens of times per second, state would cause endless, laggy re-renders.",
      "**Clean Cleanup:** The state only locks in the final URI when the recording has successfully finalized.",
    ],
  },
  {
    id: BlogSections.Waveform,
    title: "5. The Visuals: Building the WhatsApp-Style Waveform",
    content:
      "Now for the visual payoff. We want a smooth, scrolling set of bars that react to voice input. To make it look natural, we apply a mathematical normalization and a slight random variance (the 'WhatsApp wiggle').",
    codeSnippet: `import { useEffect, useState } from "react";
import { View } from "react-native";

export default function WaveformDisplay({
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
            height: Math.max(4, height * 2),
            backgroundColor: "#007AFF",
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );
}`,
    listItems: [
      "**Normalization:** Raw decibel values range from -60 (silence) to 0 (max). The formula maps this cleanly into a \`0.0\` to \`1.0\` scale.",
      "**The Buffer Array:** Pushing into an array and using \`.shift()\` caps it at 50 bars, creating that infinite scrolling illusion.",
      "**Organic Variation:** Multiplying by a small random range produces the subtle flickering animation found in modern voice message layouts.",
    ],
  },
  {
    id: BlogSections.MainApp,
    title: "6. Stitching It Together in the UI",
    content:
      "Because we isolated our logic and visuals into clean subsystems, your master implementation layout remains simple, beautiful, and maintainable.",
    codeSnippet: `import { Text, TouchableOpacity, View } from "react-native";
import useAudioRecorderHook from "./useAudioRecorderHook";
import WaveformDisplay from "./waveForm";

export default function AudioRecorderWithWaveform() {
  const { recordingInProgress, currentDecibel, startOrStopRecording, latestDecibel } =
    useAudioRecorderHook();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ marginBottom: 20, fontSize: 18, fontWeight: "bold" }}>Expo-Audio/WaveForm</Text>

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
  },
  {
    id: BlogSections.WhyThisWorks,
    title: "7. Why This Architecture Wins",
    listItems: [
      "**Separation of Concerns:** The engine hook, visual components, and dashboard maintain cleanly defined boundaries.",
      "**No Laggy Overhead:** Relying on references for high-frequency polling streams leaves user frames fully fluid.",
      "**Future-Proof Execution:** Migrating to modern framework modules frees you from deprecation errors completely.",
    ],
  },
];

// --- Image Grid Component ---
function SectionImageGrid({ images }: { images: BlogImage[] }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        gap: 3,
        mt: 4,
        mb: 2,
      }}
    >
      {images.map((img, idx) => (
        <Box
          key={idx}
          sx={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 10",
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "var(--background)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
          />
        </Box>
      ))}
    </Box>
  );
}

// --- Blog Page Component ---
export default function BlogPage() {
  return (
    <>
      <Script type="application/ld+json" id="blog-schema">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: "Expo Audio Waveform Tutorial",
          description:
            "Step-by-step guide to build a WhatsApp-style audio waveform using expo-audio in React Native.",
          author: { "@type": "Person", name: "Arian Khademolghorani" },
          publisher: {
            "@type": "Organization",
            name: "Arian.my",
            logo: {
              "@type": "ImageObject",
              url: "https://arian.my/assets/logo.png",
            },
          },
          datePublished: "2025-09-16",
          dateModified: "2025-09-16",
        })}
      </Script>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
        <article>
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: "2.25rem", sm: "3.5rem" },
              lineHeight: 1.2,
              fontWeight: 800,
            }}
          >
            Building an Audio Waveform in Expo Audio: iOS & Android
          </Typography>

          <Typography 
            variant="subtitle1" 
            sx={{ mb: 6, color: "text.secondary", fontSize: { xs: "1.1rem", sm: "1.25rem" } }}
          >
            Ditch the deprecated expo-av API. Build a highly fluid, live-metered audio track recorder with custom visual buffers.
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 6 }}>
            <Box sx={{ position: "relative", width: "100%", height: 700, borderRadius: 3, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <Image
                src="/EXPO/expo-audio-soundwave.jpg"
                alt="Expo Audio Waveform visualization"
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>
          </Box>

          {blogSections.map((section, i) => (
            <FadeIn key={section.id} delay={i * 150}>
              <Paper
                elevation={0}
                sx={{
                  py: { xs: 3, sm: 4 },
                  px: { xs: 3, sm: 5 },
                  mb: { xs: 3, sm: 4 },
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: 3,
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1.35rem", sm: "1.75rem" },
                    color: "var(--card-color, #1a1a1a)",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  {section.title}
                </Typography>

                {section.content && (
                  <Typography
                    sx={{ 
                      fontSize: "1.1rem", 
                      lineHeight: 1.7, 
                      color: "var(--tech-color, #4a4a4a)",
                      mb: section.codeSnippet || section.listItems || section.images ? 3 : 0 
                    }}
                  >
                    {section.content}
                  </Typography>
                )}

                {section.codeSnippet && (
                  <Box
                    component="pre"
                    sx={{
                      background: "#1e1e1e",
                      color: "#d4d4d4",
                      p: { xs: 2, sm: 3 },
                      borderRadius: 2,
                      fontFamily: "'Fira Code', 'Courier New', monospace",
                      fontSize: "0.9rem",
                      overflowX: "auto",
                      mb: section.listItems || section.images ? 3 : 0,
                      boxShadow: "inset 0 0 10px rgba(0,0,0,0.5)"
                    }}
                  >
                    <code>{section.codeSnippet}</code>
                  </Box>
                )}

                {section.listItems && (
                  <List sx={{ pl: 2, listStyleType: "disc", mb: section.images ? 2 : 0 }}>
                    {section.listItems.map((item, index) => {
                      const parts = item.split(/\*\*(.*?)\*\*/g);
                      return (
                        <ListItem
                          key={index}
                          sx={{
                            display: "list-item",
                            pl: 0,
                            py: 0.75,
                            color: "var(--tech-color, #4a4a4a)",
                            fontSize: "1.05rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {parts.map((part, i) => 
                            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                )}

                {section.images && <SectionImageGrid images={section.images} />}
              </Paper>
            </FadeIn>
          ))}

          <Box sx={{ mt: 6, p: 4, borderRadius: 2, backgroundColor: "rgba(0, 122, 255, 0.05)", borderLeft: "4px solid #007AFF" }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
              Wrapping Up
            </Typography>
            <Typography sx={{ fontSize: "1.1rem", lineHeight: 1.7, color: "#4a4a4a" }}>
              And that is it! You now have a smooth, responsive audio recorder with a cool waveform visualizer built on the right APIs. Using a fixed buffer loop keeps your production workspace clean, fast, and light.
            </Typography>
          </Box>
        </article>
      </Container>
    </>
  );
}

// --- Metadata ---
export const metadata = {
  title: "Expo Audio Waveform Tutorial | React Native Audio Recording Guide",
  description:
    "Step-by-step guide to build a WhatsApp-style audio waveform using expo-audio in React Native. Live decibel readings, smooth animations, and recording hooks explained.",
  keywords: [
    "expo-audio",
    "react native audio recorder",
    "audio waveform",
    "expo tutorial",
    "React Native recording",
    "audio visualization",
  ],
  authors: [{ name: "Arian Khademolghorani", url: "https://arian.my" }],
  openGraph: {
    title: "Expo Audio Waveform Tutorial",
    description: "Learn how to build a live audio waveform in React Native using expo-audio.",
    url: "https://arian.my/blog/waveform",
    siteName: "Arian.my Dev Blog",
    type: "article",
    images: [
      {
        url: "https://arian.my/assets/EXPO/expo-audio-soundwave.jpg",
        width: 1200,
        height: 630,
        alt: "Expo Audio Waveform Tutorial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expo Audio Waveform Tutorial",
    description: "Learn how to build a live audio waveform in React Native using expo-audio.",
    images: [
      {
        url: "https://arian.my/assets/EXPO/expo-audio-soundwave.jpg",
        alt: "Expo Audio Waveform Tutorial",
        width: 1200,
      },
    ],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://arian.my/blog/waveform",
    languages: {
      "en-US": "https://arian.my/en/blog/waveform",
      "tr-TR": "https://arian.my/tr/blog/waveform",
    },
  },
};
