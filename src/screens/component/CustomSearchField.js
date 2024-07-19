import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomSearchField = ({ value, onChangeText, onSearch, placeholder }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onSearch} style={styles.iconContainer}>
        <Icon name="search" size={20} color="#888" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 16,
    color: '#000',
  },
  iconContainer: {
    padding: 10,
  },
});

export default CustomSearchField;
