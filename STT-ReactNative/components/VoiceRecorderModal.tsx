// DeepSeek
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Audio } from 'expo-audio';
import * as Speech from 'expo-speech-recognition';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import Svg, { Rect } from 'react-native-svg';

interface VoiceRecorderModalProps {
  visible: boolean;
  onClose: () => void;
  onSend: (text: string) => void;
  userLanguage: string; // e.g., 'en-US', 'es-ES'
}

const WAVEFORM_WIDTH = 300;
const MAX_BARS = 30;
const BAR_WIDTH = WAVEFORM_WIDTH / MAX_BARS;

const VoiceRecorderModal: React.FC<VoiceRecorderModalProps> = ({
  visible,
  onClose,
  onSend,
  userLanguage,
}) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const audioRecorder = useRef<Audio.Recording | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const waveformData = useRef<number[]>(Array(MAX_BARS).fill(0));
  const waveformIndex = useRef(0);
  
  // Reanimated values
  const barHeights = useSharedValue<number[]>(Array(MAX_BARS).fill(1));
  const isSpeakingValue = useSharedValue(0);

  // Check and request permissions
  useEffect(() => {
    const checkPermissions = async () => {
      const audioStatus = await Audio.requestPermissionsAsync();
      const speechStatus = await Speech.requestPermissionsAsync();
      
      if (audioStatus.granted && speechStatus.granted) {
        setPermissionGranted(true);
      } else {
        console.warn('Permissions not granted');
        onClose();
      }
    };

    if (visible) checkPermissions();
  }, [visible]);

  // Initialize recorder and speech recognition
  useEffect(() => {
    if (!visible || !permissionGranted) return;

    const initRecorder = async () => {
      try {
        // Configure audio session
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        // Prepare speech recognition
        Speech.startListening({
          language: userLanguage,
          partialResults: true,
        });
        setIsRecording(true);
        startTimer();
      } catch (error) {
        console.error('Initialization error:', error);
        onClose();
      }
    };

    initRecorder();

    return () => {
      Speech.stopListening();
      stopRecording();
    };
  }, [visible, permissionGranted]);

  // Speech recognition handlers
  useEffect(() => {
    Speech.addListener((event) => {
      if (event.type === 'partialResults' && event.value) {
        setTranscript(event.value.join(' '));
      }
      if (event.type === 'speechStart') setIsSpeaking(true);
      if (event.type === 'speechEnd') setIsSpeaking(false);
    });

    return () => Speech.removeAllListeners();
  }, []);

  // Update waveform based on speaking state
  useEffect(() => {
    isSpeakingValue.value = withTiming(isSpeaking ? 1 : 0, { duration: 200 });
  }, [isSpeaking]);

  // Waveform animation
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate audio input (replace with actual audio meter)
      const amplitude = isSpeaking 
        ? 10 + Math.random() * 30 
        : 1 + Math.random() * 5;
      
      // Update waveform data
      waveformData.current[waveformIndex.current] = amplitude;
      waveformIndex.current = (waveformIndex.current + 1) % MAX_BARS;
      
      // Update animated values
      barHeights.value = [...waveformData.current];
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const startTimer = () => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    
    try {
      if (audioRecorder.current) {
        await audioRecorder.current.stopAndUnloadAsync();
      }
      await Speech.stopListening();
    } catch (error) {
      console.error('Stop error:', error);
    }
  };

  const handleCancel = () => {
    stopRecording();
    setTranscript('');
    onClose();
  };

  const handleSend = () => {
    stopRecording();
    onSend(transcript);
    setTranscript('');
    onClose();
  };

  // Animated waveform bar component
  const AnimatedRect = Animated.createAnimatedComponent(Rect);
  
  const renderWaveform = () => {
    return Array(MAX_BARS).fill(0).map((_, i) => {
      const animatedStyle = useAnimatedStyle(() => {
        const height = barHeights.value[(i + waveformIndex.current) % MAX_BARS];
        return {
          height: withTiming(height, { duration: 100 }),
        };
      });

      return (
        <AnimatedRect
          key={i}
          x={i * BAR_WIDTH}
          width={BAR_WIDTH - 2}
          fill="#4A90E2"
          style={animatedStyle}
        />
      );
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          {/* Timer */}
          <Text style={styles.timer}>
            {Math.floor(recordingTime / 60)}:
            {(recordingTime % 60).toString().padStart(2, '0')}
          </Text>
          
          {/* Waveform Visualization */}
          <View style={styles.waveformContainer}>
            <Svg width={WAVEFORM_WIDTH} height={50}>
              {renderWaveform()}
            </Svg>
          </View>
          
          {/* Transcript */}
          <Text style={styles.transcript} numberOfLines={3}>
            {transcript || 'Start speaking...'}
          </Text>
          
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.sendButton]}
              onPress={handleSend}
              disabled={!transcript}
            >
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  timer: {
    fontSize: 48,
    fontWeight: '200',
    marginVertical: 10,
  },
  waveformContainer: {
    height: 50,
    marginVertical: 20,
    justifyContent: 'center',
  },
  transcript: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
    minHeight: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  sendButton: {
    backgroundColor: '#4A90E2',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default VoiceRecorderModal;