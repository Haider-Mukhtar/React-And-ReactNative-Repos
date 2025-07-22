import { VoiceRecordingModal } from "@/components/VoiceRecordingModal";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [transcription, setTranscription] = useState('');

  const handleMicPress = () => {
    setModalVisible(true);
  };

  const handleSend = (text: string) => {
    setTranscription(text);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.micButton} onPress={handleMicPress}>
        <Ionicons name="mic" size={32} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.transcriptionLabel}>Transcription:</Text>
      <Text style={styles.transcriptionText}>{transcription}</Text>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <VoiceRecordingModal
          visible={isModalVisible}
          onSend={handleSend}
          onCancel={handleCancel}
          // language="en-US" // or dynamically selected from app settings
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  micButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 50,
    elevation: 4,
  },
  transcriptionLabel: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'bold',
  },
  transcriptionText: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
});
