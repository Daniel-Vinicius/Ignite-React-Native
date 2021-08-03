import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  styleAdditional?: StyleProp<ViewStyle>;
};

export function Button({ title, styleAdditional, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, styleAdditional]} activeOpacity={0.7} {...rest}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#a370f7',
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  }
});
