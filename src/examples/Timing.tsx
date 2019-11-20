import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Easing } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';

import { StyleGuide } from './src/components';

const {
  useCode,
  Clock,
  set,
  block,
  interpolate,
  Extrapolate,
  Value,
  timing,
  cond,
  not,
  clockRunning,
  startClock,
  stopClock,
  and,
  eq
} = Animated;

const runTiming = (clock: Animated.Clock) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0)
  };

  const config = {
    toValue: new Value(1),
    duration: 800,
    easing: Easing.linear
  };

  return block([
    cond(
      not(clockRunning(clock)),
      startClock(clock),
      timing(clock, state, config)
    ),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, cond(eq(state.position, 1), 0, 1))
    ]),
    state.position
  ]);
};

export default function App() {
  const [playing, setPlaying] = useState<boolean>(false);
  const { isPlaying, progress, clock } = useMemoOne(
    () => ({
      progress: new Value(0),
      clock: new Clock(),
      isPlaying: new Value(0) as Animated.Value<number>
    }),
    []
  );
  isPlaying.setValue(playing ? 1 : 0);
  useCode(
    block([
      cond(and(eq(isPlaying, 1), not(clockRunning(clock))), startClock(clock)),
      cond(and(eq(isPlaying, 0), clockRunning(clock)), stopClock(clock)),
      set(progress, runTiming(clock))
    ]),
    []
  );
  const bubbles = [0, 1, 2];
  const delta = 1 / bubbles.length;
  return (
    <View style={styles.container}>
      <View style={styles.bubbleContainer}>
        {bubbles.map(i => {
          const start = i * delta;
          const end = start + delta;
          const scale = interpolate(progress, {
            inputRange: [start, end],
            outputRange: [1, 1.4],
            extrapolate: Extrapolate.CLAMP
          });
          return (
            <Animated.View
              key={i}
              style={[styles.bubble, { transform: [{ scale }] }]}
            />
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setPlaying(prev => !prev);
        }}
      >
        <Text>{playing ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: StyleGuide.spacing * 3,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  bubble: {
    alignSelf: 'center',
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#EF2E52'
  },
  bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%'
  },
  button: {
    height: 50,
    backgroundColor: '#ED8AE9',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
