import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {wh, ww} from '../helpers/responsive';

const FabButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.addButton}>+</Text>
    </TouchableOpacity>
  );
};

export default FabButton;

const styles = StyleSheet.create({
  container: {
    width: ww(0.12),
    height: ww(0.12),
    backgroundColor: '#000055',
    position: 'absolute',
    bottom: wh(0.05),
    right: ww(0.05),
    borderRadius: ww(0.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    color: '#fff',

    fontSize: ww(0.1),
  },
});
