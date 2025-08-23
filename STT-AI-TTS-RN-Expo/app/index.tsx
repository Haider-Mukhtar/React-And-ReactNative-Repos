import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { AudioModule, RecordingPresets, useAudioRecorder } from "expo-audio";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as Speech from "expo-speech";

const Index = () => {
  // State management
  const [transcript, setTranscript] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "listening" | "processing" | "speaking"
  >("idle");

  // Refs for controlling async operations
  const endOfSpeechTimeout = useRef<NodeJS.Timeout | null>(null);
  const transcriptController = useRef<AbortController | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio recorder setup
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  // Speech recognition event handlers
  useSpeechRecognitionEvent("result", (event) => {
    const newTranscript = event.results?.[0]?.transcript || "";
    setTranscript(newTranscript);

    // Reset end-of-speech detection timer
    if (endOfSpeechTimeout.current) {
      clearTimeout(endOfSpeechTimeout.current);
    }
    //@ts-ignore
    endOfSpeechTimeout.current = setTimeout(detectEndOfSpeech, 1500);
  });

  useSpeechRecognitionEvent("error", (event) => {
    console.error("Speech Recognition Error:", event.error);
    Alert.alert(
      "Speech Error",
      event.error.toString() || "Speech-to-text failed"
    );
    setStatus("idle");
  });

  // Timer management
  useEffect(() => {
    if (status === "listening") {
      //@ts-ignore
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (status !== "processing") setSeconds(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Speech.stop();
      if (transcriptController.current) {
        transcriptController.current.abort();
      }
      stopAllActivities();
    };
  }, []);

  const detectEndOfSpeech = () => {
    if (status === "listening" && transcript.trim()) {
      stopListening();
      sendTranscript();
    }
  };

  const startListening = async () => {
    try {
      // Stop any ongoing speech
      if (status === "speaking") {
        Speech.stop();
      }

      // Reset previous state
      setTranscript("");
      setSeconds(0);

      // Request permissions
      const [audioPerm, speechPerm] = await Promise.all([
        AudioModule.requestRecordingPermissionsAsync(),
        ExpoSpeechRecognitionModule.requestPermissionsAsync(),
      ]);

      if (!audioPerm.granted || !speechPerm.granted) {
        Alert.alert(
          "Permissions Required",
          "Microphone and Speech permissions are required."
        );
        return;
      }

      // Prepare and start recording
      await recorder.prepareToRecordAsync({
        android: {
          outputFormat:
            AudioModule.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
          audioEncoder: AudioModule.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        },
        ios: {
          audioQuality: AudioModule.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        },
      });
      await recorder.record();

      // Start speech recognition
      await ExpoSpeechRecognitionModule.start({
        lang: "en-US",
        interimResults: true,
        continuous: true,
      });

      setStatus("listening");
    } catch (err) {
      console.error("Recording Error:", err);
      Alert.alert("Error", "Could not start voice recording.");
      setStatus("idle");
    }
  };

  const stopListening = async () => {
    try {
      await recorder.stop();
      await ExpoSpeechRecognitionModule.stop();
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const stopAllActivities = () => {
    if (endOfSpeechTimeout.current) {
      clearTimeout(endOfSpeechTimeout.current);
      endOfSpeechTimeout.current = null;
    }
    Speech.stop();
    recorder.stop();
    ExpoSpeechRecognitionModule.abort();
  };

  const sendTranscript = async () => {
    if (!transcript.trim()) {
      setStatus("idle");
      return;
    }

    // Abort any ongoing request
    if (transcriptController.current) {
      transcriptController.current.abort();
    }

    transcriptController.current = new AbortController();
    setStatus("processing");

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzODU2MjE2LCJpYXQiOjE3NTM3Njk4MTYsImp0aSI6IjYzZTNmNGQ5ZGY4OTRkMmNiNDFkZjY1NmEyZjNlNTc0IiwidXNlcl9pZCI6Nn0.poK4pmmj9RKYPRw6gLDXhjwnyMusToH6WAe0Z372j_U";

      const response = await axios.post(
        "https://chef-quilo.vercel.app/api/chat-with-chef/",
        {
          question: transcript,
          userId: "6",
          session_key: "4f6c5476-0f31-414b-b986-20e860aff414",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal: transcriptController.current.signal,
        }
      );

      const responseText = response.data.data.assistant_response;
      console.log("API Response:", responseText);

      if (!isMuted) {
        setStatus("speaking");
        Speech.speak(responseText, {
          language: "en-US",
          onDone: () => setStatus("idle"),
          onError: () => setStatus("idle"),
        });
      } else {
        setStatus("idle");
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.log("API Error:", error);
        Alert.alert("Error", "Failed to get response from server");
      }
      setStatus("idle");
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && status === "speaking") {
      Speech.stop();
      setStatus("idle");
    }
  };

  const handleCancel = () => {
    stopAllActivities();
    setStatus("idle");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.timer}>
        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
      </Text>

      <Text style={styles.transcript}>
        {status === "listening"
          ? transcript || "Speak now..."
          : status === "processing"
            ? "Processing..."
            : transcript}
      </Text>

      <View style={styles.buttonRow}>
        <Pressable
          onPress={handleCancel}
          style={[styles.button, { backgroundColor: "#ff4444" }]}
        >
          <Ionicons name="close" size={24} color="white" />
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={startListening}
          disabled={status === "processing"}
          style={[
            styles.button,
            {
              backgroundColor: status === "listening" ? "#4CAF50" : "#ccc",
              opacity: status === "processing" ? 0.6 : 1,
            },
          ]}
        >
          <Ionicons
            name={status === "listening" ? "mic" : "mic-outline"}
            size={24}
            color="black"
          />
          <Text style={styles.buttonText}>Mic</Text>
        </Pressable>

        <Pressable
          onPress={toggleMute}
          style={[
            styles.button,
            { backgroundColor: isMuted ? "#ff6666" : "#66cc66" },
          ]}
        >
          <Ionicons
            name={isMuted ? "volume-mute" : "volume-high"}
            size={24}
            color="black"
          />
          <Text style={styles.buttonText}>{isMuted ? "Unmute" : "Mute"}</Text>
        </Pressable>
      </View>

      {status === "processing" && (
        <ActivityIndicator size="large" color="#23d" style={styles.loader} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  timer: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
    color: "#333",
  },
  transcript: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
    minHeight: 60,
    color: "#555",
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 12,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    minWidth: 100,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
});

export default Index;
