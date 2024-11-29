import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../../components/Footer/Footer';
import { Button } from 'react-native';
import { getAuth } from 'firebase/auth'; 
import { db } from '../../DB/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Perfil = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(true);

  // Busca as informações do usuário logado
  useEffect(() => {
    const fetchUserProfile = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name || 'Usuário Anônimo');
            setProfileImage(userData.photoURL || 'https://via.placeholder.com/80');
          } else {
            setUserName('Usuário Anônimo');
            setProfileImage('https://via.placeholder.com/80');
          }
        } catch (error) {
          console.error('Erro ao buscar o perfil do usuário:', error);
        }
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handlePress = () => {
    Alert.alert('Botão pressionado!');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <>
          {/* Cabeçalho */}
          <View style={styles.headerp}>
            <View style={styles.profileSection}>
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.userName}>{userName}</Text>
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
              color="red"
            />
          </View>
        </>
      )}

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
