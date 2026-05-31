/**
 * SearchBar Component
 * Styled search input with search icon.
 */
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const SearchBar = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder || '🔍  Search restaurants, cuisines...'}
        placeholderTextColor={Colors.textLight}
        autoCorrect={false}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    fontSize: 15,
    color: Colors.textPrimary,
  },
});

export default SearchBar;
