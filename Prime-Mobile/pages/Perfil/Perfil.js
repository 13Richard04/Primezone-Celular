import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../../components/Footer/Footer';
import { Button } from 'react-native'; // Importação correta do Button

const Perfil = ({ navigation }) => {
  const handlePress = () => {
    Alert.alert('Botão pressionado!');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerp}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/80' }} // Substitua pelo link ou imagem local
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.userName}>RICHARD ORELHA DA SILVINHA</Text>
            <Text style={styles.date}>02/02/2024</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="cog-outline" size={24} color="#FFF" />
          <Text style={styles.configText}>config</Text>
        </TouchableOpacity>
      </View>

      {/* Menu de opções */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="pencil-outline" size={24} color="#FFF" />
          <Text style={styles.menuText}>MINHAS PERGUNTAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="checkbox-multiple-outline" size={24} color="#FFF" />
          <Text style={styles.menuText}>MINHAS RESPOSTAS</Text>
        </TouchableOpacity>
      </View>

      {/* Botão "Sair da conta" */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Sair da conta"
          onPress={handlePress}
          color="red" // Definindo a cor do botão como vermelho
        />
      </View>

      <Footer navigation={navigation} />
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
  date: {
    color: '#FFF',
    fontSize: 12,
  },
  configText: {
    color: '#FFF',
    fontSize: 10,
    textAlign: 'center',
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
});

export default Perfil;
