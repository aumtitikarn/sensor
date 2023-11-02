import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import { Gyroscope } from 'expo-sensors';

const GyroscopeComponent = () => {
  const [gyroscopeData, setGyroscopeData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setGyroscopeData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const toggleSwitch = () => {
    if (subscription) {
      _unsubscribe();
      setIsSwitchOn(false);
    } else {
      _subscribe();
      setIsSwitchOn(true);
    }
  };

  useEffect(() => {
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textt}>Gyroscope</Text>
      <View
        style={{
          top:-100,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: 'red',
          transform: [
            { translateX: gyroscopeData.y * 10 },
            { translateY: -gyroscopeData.x * 10 },
          ],
        }}
      />
      <Text style={styles.text}>x: {gyroscopeData.x}</Text>
      <Text style={styles.text}>y: {gyroscopeData.y}</Text>
      <Text style={styles.text}>z: {gyroscopeData.z}</Text>
      <View style={{ top: 150 }}>
        <Switch value={isSwitchOn} onValueChange={toggleSwitch} style={styles.switch} />
        <TouchableOpacity onPress={_slow} style={styles.button}>
          <Text style={{ fontWeight: 'bold' }}>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text style={{ fontWeight: 'bold' }}>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
      };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginVertical: 10,
    top:60 
  },
  textt: {
    top: -200,
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  },
  switch: {
    marginVertical: 10,
  },
  button: {
    margin: 10,
  },
});

export default GyroscopeComponent;