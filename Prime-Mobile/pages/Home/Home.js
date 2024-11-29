import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Footer from '../../components/Footer/Footer';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Parte superior com o texto, ícone, título da matéria e o campo de busca */}
      <View style={styles.header}>
        <Text style={styles.title}>FAÇA SUA PERGUNTA ABAIXO</Text>
        <View style={styles.subjectContainer}>
          <Text style={styles.subjectText}>Matemática</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Qual a sua pergunta?" 
            placeholderTextColor="#888" 
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
        <Image source={require ('../.././assets/Icons/student.png')} style={styles.studentIcon} />
      </View>

      {/* Botões na parte central */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={require ('../.././assets/Icons/livrinho.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Quem Somos?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={{ uri: 'Image' }} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Central de Ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={{ uri: 'Image' }} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Prime</Text>
        </TouchableOpacity>
      </View>

      {/* Imagem promocional */}
      <View style={styles.promoContainer}>
        <Image source={{ uri: 'Image' }} style={styles.promoImage} />
      </View>

      {/* Footer */}
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003b5a',
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: '#7faac2',
    borderBottomRightRadius: 100,
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  subjectIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  subjectText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    width: '90%',
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    fontSize: 18,
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#6fb23e',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '30%',
  },
  buttonIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  promoContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  promoImage: {
    width: '90%',
    height: 100,
    borderRadius: 10,
  },
});

export default Home;
