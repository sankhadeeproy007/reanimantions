import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity
} from 'react-native';
import Animated from 'react-native-reanimated';

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
  const [toggle, setToggle] = useState<0 | 1>(1);
  const transition = useTransition(toggle, not(toggle), toggle);
  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        const direction = interpolate(index, {
          inputRange: [0, 1, 2, 3, 4],
          outputRange: [-2, -1, 0, 1, 2],
          extrapolate: Extrapolate.CLAMP
        });
        const rotate = multiply(
          direction,
          interpolate(transition, {
            inputRange: [0, 1],
            outputRange: [0, Math.PI / 15]
          })
        );
        return (
          <Animated.View
            style={[
              styles.overlaying,
              {
                transform: [
                  { translateX: transformOrigin },
                  { rotate },
                  { translateX: -transformOrigin }
                ]
              }
            ]}
          >
            <Animated.View
              style={[styles.card, { backgroundColor: card.color }]}
            >
              <Text
                style={{
                  ...StyleGuide.typography.title3,
                  textAlign: 'center',
                  color: card.textColor
                }}
              >
                {card.name}
              </Text>
            </Animated.View>
          </Animated.View>
        );
      })}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setToggle(prevToggle => (prevToggle ? 0 : 1))}
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
    borderRadius: 12
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
