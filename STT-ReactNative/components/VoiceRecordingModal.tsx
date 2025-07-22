// GPT
import { Ionicons } from '@expo/vector-icons';
import { AudioModule, RecordingPresets, useAudioRecorder, useAudioRecorderState } from 'expo-audio';
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent
} from 'expo-speech-recognition';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Waveform } from './Waveform';

interface VoiceRecordingModalProps {
  visible: boolean;
  onCancel: () => void;
  onSend: (transcribedText: string) => void;
  languageCode?: string;
}

export const VoiceRecordingModal: React.FC<VoiceRecordingModalProps> = ({ visible, onCancel, onSend, languageCode = 'en-US' }) => {
  const [transcript, setTranscript] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [recordingStarted, setRecordingStarted] = useState(false);

  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder, 100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results?.[0]?.transcript || '');
  });

  useSpeechRecognitionEvent("error", (event) => {
    console.error('Speech Recognition Error:', event.error);
    Alert.alert('Speech Error', event.error.toString() || 'Speech-to-text failed');
  });

  useEffect(() => {
    if (recordingStarted) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setSeconds(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [recordingStarted]);

  useEffect(() => {
    if (!visible) return;
    const startRecording = async () => {
      try {
        const audioPerm = await AudioModule.requestRecordingPermissionsAsync();
        const speechPerm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();

        if (!audioPerm.granted || !speechPerm.granted) {
          Alert.alert('Permissions Required', 'Microphone and Speech permissions are required.');
          onCancel();
          return;
        }

        await recorder.prepareToRecordAsync({
          android: {
            outputFormat: AudioModule.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: AudioModule.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          },
          ios: { audioQuality: AudioModule.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH },
        });
        await recorder.record();

        await ExpoSpeechRecognitionModule.start({
          lang: languageCode,
          interimResults: true,
          continuous: true,
        });

        setRecordingStarted(true);
      } catch (err) {
        console.error('Recording Error:', err);
        Alert.alert('Error', 'Could not start voice recording.');
        onCancel();
      }
    };

    startRecording();

    return () => {
      recorder.stop();
      ExpoSpeechRecognitionModule.stop();
      setRecordingStarted(false);
      setTranscript('');
    };
  }, [visible]);

  const handleCancel = () => {
    recorder.stop();
    ExpoSpeechRecognitionModule.abort();
    setRecordingStarted(false);
    onCancel();
  };

  const handleSend = async () => {
    try {
      await recorder.stop();
      await ExpoSpeechRecognitionModule.stop();
      setRecordingStarted(false);
      onSend(transcript);
    } catch (err) {
      console.error('Send Error:', err);
      Alert.alert('Error', 'Failed to process voice message.');
    }
  };
  
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.timer}>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</Text>
          <Waveform amplitude={recorderState.metering} />
          <Text style={styles.transcript}>{transcript || 'Speak now...'}</Text>

          <View style={styles.buttonRow}>
            <Pressable onPress={handleCancel} style={[styles.button, { backgroundColor: '#ccc' }]}> 
              <Ionicons name="close" size={24} color="black" />
              <Text>Cancel</Text>
            </Pressable>

            <Pressable onPress={handleSend} style={[styles.button, { backgroundColor: '#4CAF50' }]}> 
              <Ionicons name="send" size={24} color="white" />
              <Text style={{ color: '#fff' }}>Send</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center'
  },
  timer: {
    fontSize: 24,
    marginBottom: 16
  },
  transcript: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8
  }
});
