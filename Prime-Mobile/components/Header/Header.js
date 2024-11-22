import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>PERGUNTAS E MATÉRIAS</Text>
      <TextInput
        style={styles.input}
        placeholder='Qual sua matéria favorita?'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width, // Largura de 100%
    padding: 20,
    paddingTop: StatusBar.currentHeight || 40,
    backgroundColor: '#054C69',
    alignItems: 'flex-start',
    paddingLeft: 15,
    gap: 12,
    height: 135, // Altura ajustada para o Header
  },

  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },

  input: {
    height: 40,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 6,
    width: '90%',
    borderRadius: 6,
  }
});

export default Header;
