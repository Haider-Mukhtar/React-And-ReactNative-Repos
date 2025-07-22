// GPT
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const NUM_BARS = 20;
const BAR_WIDTH = 4;
const SCREEN_WIDTH = Dimensions.get('window').width;
const TOTAL_WIDTH = BAR_WIDTH * NUM_BARS + (NUM_BARS - 1) * 2;

interface WaveformProps {
  amplitude?: number;
}

export const Waveform: React.FC<WaveformProps> = ({ amplitude = -160 }) => {
  const [barHeights, setBarHeights] = useState(new Array(NUM_BARS).fill(2));

  useEffect(() => {
    const newHeight = Math.max(2, 60 + amplitude);
    setBarHeights(prev => {
      const updated = [...prev];
      updated.shift();
      updated.push(newHeight);
      return updated;
    });
  }, [amplitude]);

  return (
    <View style={styles.container}>
      {barHeights.map((height, idx) => (
        <Animated.View
          key={idx}
          style={[
            styles.bar,
            {
              height,
              backgroundColor: '#4CAF50',
              marginLeft: idx === 0 ? 0 : 2,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 80,
    width: TOTAL_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  bar: {
    width: BAR_WIDTH,
    borderRadius: 2,
  },
});
