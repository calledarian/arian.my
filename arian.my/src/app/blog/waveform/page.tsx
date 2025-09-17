
import React from "react";
import { Container, Typography, Box, Paper, List, ListItem } from "@mui/material";
import FadeIn from "@/app/utils/fadeIn";
import Script from "next/script";
import Image from "next/image";

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
  Config = "expo-audio-config",
  RecorderHook = "recorderHook",
  Waveform = "waveform",
  MainApp = "mainApp",
  WhyThisWorks = "whyThisWorks",
}

// --- Blog Data ---
const blogSections: BlogSection[] = [
  {
    id: BlogSections.Install,
    title: "1. First, You will Need to Install `expo-audio`",
    content: "We are using `expo-audio` because it is a huge help. It gives you things that other libraries just do not:",
    codeSnippet: "npx expo install expo-audio",
    listItems: [
      "1. Live decibel readings (super important for that cool visualizer)",
      "2. Handy hooks for recording, like `useAudioRecorder`",
      "3. Full control over your recording settings and quality",
    ],
  },
  {
    id: BlogSections.Config,
    title: "2. Configuring expo-audio in app.json",
    content:
      "When using expo-audio, you need to configure microphone permissions so your app can record or process audio input. This is done inside the app.json file under the plugins section.",
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
      "The `microphonePermission` string is shown to iOS users when microphone access is requested.",
      "On Android, expo-audio automatically adds the correct manifest entries for microphone access.",
    ]
  },
  {
    id: BlogSections.RecorderHook,
    title: "3. The Recorder Hook: How to Start, Stop & Get Metering",
    content: "This is the brain of the whole thing. We are building a custom hook to handle the recording, grab those decibel readings, and give us the finished audio file links.",
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

    // Set audioUri only when recording is no longer active and a uri is available
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
      "1. isMeteringEnabled: true is the magic switch that lets us create the waveform.",
      "2. We&apos;re using a ref for the latest decibel reading. This is a pro tip, it lets us update the value without causing a bunch of pointless re-renders.",
      "3. The useEffect is just there to update our state so the UI knows what is up.",
    ],
  },
  {
    id: BlogSections.Waveform,
    title: "4. Building That Awesome WhatsApp-Style Waveform",
    content:
      "This is the fun part. We want a smooth, scrolling waveform that looks like a real-time voice message. We&apos;ll even add a little bit of randomness to make it feel more alive, just like the real WhatsApp animation.",
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
    title: "5. Putting It All Together in the Main App",
    content: "Now for the easy part. We will combine our custom hook and the waveform component into a clean, simple UI. No extra fluff, just the core functionality.",
    codeSnippet: `import { Text, TouchableOpacity, View } from "react-native";
import useAudioRecorderHook from "./useAudioRecorderHook";
import WaveformDisplay from "./waveForm";

export default function AudioRecorderWithWaveform() {
  const { recordingInProgress, currentDecibel, audioUri, startOrStopRecording, latestDecibel } =
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
      
      {/* This is the corrected footer */}
      <Text style={{ marginTop: 20, fontSize: 14, color: "#888" }}>Made with love by Arian Khademolghorani (https://github.com/calledarian)</Text>
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
    title: "6. So, Why Does This Work So Well?",
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
            Building an Audio Waveform in Expo Audio: IOS & ANDROID
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            justifyContent="center"
            alignItems="center"
            mb={4}
          >
            <Box flex={1} maxWidth={{ xs: "100%", sm: 400 }}>
              <Image
                src="/waveformReal.jpg"
                alt="Real waveform"
                width={400}
                height={150}
                style={{ width: "100%", height: "auto", borderRadius: 8 }}
              />
            </Box>
          </Box>
          <Typography paragraph>

            Most tutorials for audio waveforms rely on outdated expo-av methods that no longer work seamlessly in modern Expo apps. This guide provides a practical, step-by-step approach to implementing a fully functional audio waveform using expo-audio. Perfect for developers who want a working solution for recording, visualizing, and managing audio without the headaches of deprecated APIs.                    </Typography>

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
            And that is it! You now have a smooth, responsive audio recorder with a cool waveform visualizer. This approach is more reliable and gives you the tools you need to build something truly polished.
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
  keywords: ["expo-audio", "react native audio recorder", "audio waveform", "expo tutorial", "React Native recording", "audio visualization"],
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
