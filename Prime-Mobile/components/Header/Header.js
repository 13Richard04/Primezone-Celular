import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native';

const Header = ({ onSearch }) => {
  const handleSearchChange = (text) => {
    onSearch(text); // Chama a função passada para atualizar o texto de pesquisa
  };

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>PERGUNTAS E MATÉRIAS</Text>
      <TextInput
        style={styles.input}
        placeholder="Qual sua matéria favorita?"
        onChangeText={handleSearchChange} // Atualiza o estado de pesquisa conforme o texto muda
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width,
    padding: 20,
    paddingTop: StatusBar.currentHeight || 40,
    backgroundColor: '#054C69',
    alignItems: 'flex-start',
    paddingLeft: 15,
    gap: 12,
    height: 135,
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
  },
});

export default Header;
