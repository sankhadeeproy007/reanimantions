import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useMemoOne } from 'use-memo-one';
import Animated from 'react-native-reanimated';

const {
  Extrapolate,
  Value,
  Clock,
  useCode,
  set,
  block,
  cond,
  not,
  clockRunning,
  startClock,
  interpolate,
  add,
  eq,
  stopClock
} = Animated;
const DUARTION = 500;

export default function App() {
  const [show, setShow] = useState(true);
  const { clock, time, progress } = useMemoOne(
    () => ({
      clock: new Clock(),
      time: new Value(0),
      progress: new Value(0)
    }),
    []
  );

  const opacity = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: show ? [0, 1] : [1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  useCode(
    block([
      // 1. If clock is not running,
      // start the clock and save the original clock value to time
      cond(not(clockRunning(clock)), [startClock(clock), set(time, clock)]),
      // 2. Calculate the progress of the animation
      set(
        progress,
        interpolate(clock, {
          inputRange: [time, add(time, DUARTION)],
          outputRange: [0, 1],
          extrapolate: Extrapolate.CLAMP
        })
      ),
      // 3. If the animation is over, stop the clock
      cond(eq(progress, 1), stopClock(clock))
    ]),
    []
  );
  return (
    <View style={styles.container}>
      <Animated.View
        style={{ backgroundColor: '#E39AF8', padding: 20, opacity }}
      >
        <Text>Open up App.tsx to start working on your app!</Text>
      </Animated.View>
      <TouchableOpacity
        onPress={() => setShow(prev => !prev)}
        style={{ borderWidth: 1, padding: 20, marginTop: 20 }}
      >
        <Text>Toggle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
