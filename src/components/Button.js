import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ww, wh} from '../helpers/responsive';

const Button = ({onPress}) => {
  return (
    <>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
    </>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: ww(0.15),
    height: wh(0.04),
    backgroundColor: '#aad7ef',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ww(0.01),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
