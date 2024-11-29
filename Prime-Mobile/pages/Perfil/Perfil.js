import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Modal,
  Button,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../../components/Footer/Footer';

const Perfil = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    nome: 'RICHARD ORELHA DA SILVINHA',
    escolaridade: 'Ensino Médio',
    dataNascimento: '02/02/2004',
    lingua: 'Português',
  });

  const handleEditProfile = () => {
    setModalVisible(true);
  };

  const handleSaveProfile = () => {
    setModalVisible(false);
    Alert.alert('Perfil atualizado!', 'Suas alterações foram salvas com sucesso.');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerp}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.userName}>{profileData.nome}</Text>
            <Text style={styles.userBirthDate}>{profileData.dataNascimento}</Text>
          </View>
        </View>
      </View>

      {/* Menu de opções */}
      <View style={styles.menu}>
        {/* Editar Perfil */}
        <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
          <Icon name="pencil-outline" size={24} color="#FFF" />
          <Text style={styles.menuText}>EDITAR PERFIL</Text>
        </TouchableOpacity>

        {/* Minhas Perguntas */}
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="book-open-outline" size={24} color="#FFF" />
          <Text style={styles.menuText}>MINHAS PERGUNTAS</Text>
        </TouchableOpacity>

        {/* Minhas Respostas */}
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="message-text-outline" size={24} color="#FFF" />
          <Text style={styles.menuText}>MINHAS RESPOSTAS</Text>
        </TouchableOpacity>
      </View>

      {/* Botão "Sair da conta" */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Sair da conta"
          onPress={() => Alert.alert('Botão Sair pressionado!')}
          color="red"
        />
      </View>

      <Footer navigation={navigation} />

      {/* Modal de Edição de Perfil */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome"
              value={profileData.nome}
              onChangeText={(text) =>
                setProfileData({ ...profileData, nome: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Escolaridade"
              value={profileData.escolaridade}
              onChangeText={(text) =>
                setProfileData({ ...profileData, escolaridade: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Data de Nascimento (DD/MM/AAAA)"
              value={profileData.dataNascimento}
              keyboardType="numeric" // Permite apenas números no teclado
              maxLength={10} // Limita o campo a 10 caracteres (formato DD/MM/YYYY)
              onChangeText={(text) => {
                // Remove todos os caracteres que não são números
                let formattedText = text.replace(/\D/g, '');
                if (formattedText.length > 2) {
                  formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
                }
                if (formattedText.length > 5) {
                  formattedText = `${formattedText.slice(0, 5)}/${formattedText.slice(5, 10)}`;
                }
                setProfileData({ ...profileData, dataNascimento: formattedText });
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="Língua Preferida"
              value={profileData.lingua}
              onChangeText={(text) =>
                setProfileData({ ...profileData, lingua: text })
              }
            />

            <View style={styles.buttonRow}>
              <Button
                title="Cancelar"
                onPress={() => setModalVisible(false)}
                color="#999"
              />
              <Button
                title="Salvar"
                onPress={handleSaveProfile}
                color="#1F4B63"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F4B63',
    paddingTop: StatusBar.currentHeight || 20,
  },
  headerp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1F4B63',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  userName: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userBirthDate: {
    color: '#FFF',
    fontSize: 14,
    marginTop: 4,
  },
  menu: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1F4B63',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2F6D87',
  },
  menuText: {
    color: '#FFF',
    marginLeft: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginBottom: 15,
    fontSize: 16,
    padding: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default Perfil;