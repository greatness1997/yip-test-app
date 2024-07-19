import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';



export default function ({ onPress, isSubmitting, title, style }) {
 

  return (
    <TouchableOpacity style={[styles.container, style]}
        primary
        onPress={onPress}
        disabled={isSubmitting}
        title={title}
        >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.text}> {title} </Text>
        )}
      
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: 'green',
    width: "100%",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 13,
    color: 'white',
  },
});
