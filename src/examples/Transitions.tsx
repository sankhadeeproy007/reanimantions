import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ViewStyle,
  ImageStyle,
  TouchableOpacity
} from 'react-native';
import Animated, {
  Transitioning,
  Transition,
  TransitioningView
} from 'react-native-reanimated';

import { StyleGuide } from '../components';

interface Layout {
  id: string;
  name: string;
  layout: {
    container: ViewStyle;
    child?: ImageStyle;
  };
}

const DUARTION = 250;

const { width } = Dimensions.get('window');

const cards = [
  {
    color: 'red'
  },
  {
    color: 'green'
  },
  {
    color: 'blue'
  }
];

const layouts: Layout[] = [
  {
    id: 'column',
    name: 'Column',
    layout: {
      container: {
        flexDirection: 'column',
        justifyContent: 'center'
      },
      child: {
        flex: 1
      }
    }
  },
  {
    id: 'wrap',
    name: 'Wrap',
    layout: {
      container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
      child: {
        height: 200,
        width: width / 2 - StyleGuide.spacing * 2
      }
    }
  }
];

const transition = (
  <Transition.Change durationMs={DUARTION} interpolation='easeOut' />
);

export default function App() {
  const [currentLayout, setCurrentLayout] = useState(0);
  const ref = useRef<TransitioningView>(null);

  const toggle = () => {
    if (ref.current) {
      ref.current.animateNextTransition();
    }
    setCurrentLayout(prev => (prev === 0 ? 1 : 0));
  };

  return (
    <View style={{ flex: 1 }}>
      <Transitioning.View
        ref={ref}
        transition={transition}
        style={[styles.container, layouts[currentLayout].layout.container]}
      >
        <Animated.View
          style={[
            { backgroundColor: 'red' },
            layouts[currentLayout].layout.child
          ]}
        />
        <Animated.View
          style={[
            { backgroundColor: 'green' },
            layouts[currentLayout].layout.child
          ]}
        />
        <Animated.View
          style={[
            { backgroundColor: 'blue' },
            layouts[currentLayout].layout.child
          ]}
        />
      </Transitioning.View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={toggle}
          activeOpacity={0.8}
          style={{
            width: '80%',
            padding: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#972DB5'
          }}
        >
          <Text style={{ color: 'white' }}>Toggle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: StyleGuide.palette.background,
    padding: StyleGuide.spacing * 2
  }
});
