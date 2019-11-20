import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity
} from 'react-native';
import Animated, { Transitioning, Transition } from 'react-native-reanimated';

import { StyleGuide } from './src/components';
import { useTransition } from 'react-native-redash';

const { not, multiply, interpolate, Extrapolate } = Animated;

const cards = [
  {
    name: 'Salah',
    color: '#C11F3E',
    textColor: '#FFF'
  },
  {
    name: 'Aguero',
    color: '#40D2F3',
    textColor: '#000'
  },
  {
    name: 'Mane',
    color: '#C11F3E',
    textColor: '#FFF'
  },
  {
    name: 'Mahrez',
    color: '#40D2F3',
    textColor: '#000'
  },
  {
    name: 'Firmino',
    color: '#C11F3E',
    textColor: '#FFF'
  }
];

const transformOrigin =
  -Dimensions.get('window').width - StyleGuide.spacing * 1.5;

export default function App() {
  const [toggle, setToggle] = useState<boolean>(false);
  const ref = useRef(null);
  const transition = (
    <Transition.Together>
      <Transition.In type='fade' durationMs={400} />
      <Transition.Out type='fade' durationMs={400} />
    </Transition.Together>
  );
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.overlaying]}>
        <Transitioning.View
          ref={ref}
          transition={transition}
          style={[styles.card, { backgroundColor: 'white' }]}
        >
          {toggle && (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'black'
              }}
            />
          )}
          <Animated.Text
            style={{
              ...StyleGuide.typography.title3,
              textAlign: 'center',
              color: toggle ? 'white' : 'black'
            }}
          >
            HAHA
          </Animated.Text>
        </Transitioning.View>
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (ref.current) {
            ref.current.animateNextTransition();
          }
          setToggle(prevToggle => (prevToggle ? false : true));
        }}
      >
        <Text>Toggle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: StyleGuide.spacing * 3,
    justifyContent: 'flex-end'
  },
  overlaying: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    padding: StyleGuide.spacing,
    height: 200,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden'
  },
  button: {
    height: 50,
    backgroundColor: '#ED8AE9',
    width: '60%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
