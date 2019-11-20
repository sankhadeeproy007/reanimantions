import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { withOffset } from 'react-native-redash';

const { width: containerWidth, height: containerHeight } = Dimensions.get(
  'window'
);

const { event, diffClamp, Value } = Animated;

export default function App() {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);

  const onGestureEvent = event([
    {
      nativeEvent: {
        state,
        translationX,
        translationY
      }
    }
  ]);

  const translateX = diffClamp(
    withOffset(translationX, state, new Value(50)),
    0,
    containerWidth - 280
  );
  const translateY = diffClamp(
    withOffset(translationY, state, new Value(200)),
    0,
    containerHeight - 300
  );

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onGestureEvent}
      >
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ translateY }, { translateX }]
            }
          ]}
        />
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50
  },
  card: {
    height: 200,
    width: 280,
    backgroundColor: '#9757EE',
    borderRadius: 7
  }
});
