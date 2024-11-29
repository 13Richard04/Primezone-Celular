import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, FlatList } from 'react-native';
import Footer from '../../components/Footer/Footer';

const materias = [
  { nome: 'Português', icone: require('../.././assets/materias/portugues.png') },
  { nome: 'Matemática', icone: require('../.././assets/materias/matematica.png') },
  { nome: 'Química', icone: require('../.././assets/materias/quimica.png') },
  { nome: 'Biologia', icone: require('../.././assets/materias/biologia.png') },
  { nome: 'Geografia', icone: require('../.././assets/materias/geografia.png') },
  { nome: 'Sociologia', icone: require('../.././assets/materias/sociologia.png') },
  { nome: 'Física', icone: require('../.././assets/materias/fisica.png') },
  { nome: 'História', icone: require('../.././assets/materias/historia.png') },
];

const Home = ({ navigation }) => {
  const [materiaSelecionada, setMateriaSelecionada] = useState(materias[1]); // Default: Matemática
  const [modalVisible, setModalVisible] = useState(false);

  const selecionarMateria = (materia) => {
    setMateriaSelecionada(materia);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Parte superior com o texto, ícone, título da matéria e o campo de busca */}
      <View style={styles.header}>
        <Text style={styles.title}>FAÇA SUA PERGUNTA ABAIXO</Text>
        <TouchableOpacity 
          style={styles.subjectContainer} 
          onPress={() => setModalVisible(true)}
        >
          <Image source={materiaSelecionada.icone} style={styles.subjectIcon} />
          <Text style={styles.subjectText}>{materiaSelecionada.nome}</Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput 
            style={styles.searchInput} 
            placeholder="Qual a sua pergunta?" 
            placeholderTextColor="#888" 
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>
        <Image source={require('../.././assets/Icons/student.png')} style={styles.studentIcon} />
      </View>

      {/* Modal para selecionar matéria */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione uma matéria</Text>
            <FlatList
              data={materias}
              keyExtractor={(item) => item.nome}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selecionarMateria(item)}
                >
                  <Image source={item.icone} style={styles.modalIcon} />
                  <Text style={styles.modalText}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Botões na parte central */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quemsomos')}>
          <Image source={require('../.././assets/Icons/livrinho.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Quem Somos?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CentralAjuda')}>
            <Image source={require('../.././assets/Icons/bx--headphone.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Central de Ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PerguntasMaterias')}>
            <Image source={require('../.././assets/Icons/ri--question-fill.png')} style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Perguntas</Text>
        </TouchableOpacity>
      </View>

      {/* Imagem promocional */}
      <View style={styles.promoContainer}>
        <Image source={require ('../.././assets/Images/Banner.png')} style={styles.promoImage}/>
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
    position: 'relative',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    zIndex: 1,
    fontFamily: 'Jomhuria',
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
    zIndex: 1,
  },
  subjectIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  subjectText: {
    color: '#333',
    fontSize: 18,
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
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    zIndex: 1,
  },
  searchIcon: {
    fontSize: 18,
    color: '#888',
  },
  studentIcon: {
    width: 130,
    height: 130,
    position: 'absolute',
    zIndex: 0,
    top: 105,
    right: -10,
    borderBottomRightRadius: 115,
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
    paddingTop: 50,
  },
  buttonIcon: {
    width: 40,
    height: 40,
    marginTop: 4,
    zIndex: 1,
    position: 'absolute',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  promoContainer: {
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 70,
  },
  promoImage: {
    width: '98%',
    height: 140,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    maxHeight: '100%',
    height: '100%',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    backgroundColor: '#7faac2',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Home;
