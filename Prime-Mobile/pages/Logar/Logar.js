import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../DB/firebaseConfig'; // Importe a configuração do Firebase
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Verifica se há informações salvas de login
    const checkRememberedUser = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        const storedPassword = await AsyncStorage.getItem('password');
        const storedRememberMe = await AsyncStorage.getItem('rememberMe');
        
        if (storedRememberMe === 'true') {
          setEmail(storedEmail);
          setPassword(storedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Erro ao recuperar dados armazenados', error);
      }
    };

    checkRememberedUser();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Sucesso", "Login realizado com sucesso!");

      // Se o usuário marcar a opção "Lembrar de mim", salve as credenciais
      if (rememberMe) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
        await AsyncStorage.setItem('rememberMe', 'true');
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.setItem('rememberMe', 'false');
      }

      navigation.navigate('PerguntasMaterias');
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira seu email para recuperação de senha.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Sucesso", "Enviamos um link para redefinição de senha para o seu email.");
        navigation.navigate('PerguntasMaterias');
      })
      .catch((error) => {
        Alert.alert("Erro", error.message);
      });
  };

  const handleGuestLogin = () => {
    // Navegar diretamente para a home como visitante
    navigation.navigate('PerguntasMaterias');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.logo}>PRIMEZONE</Text>
        <Text style={styles.title}>LOGIN</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="@gmail.com"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Insira sua senha"
              placeholderTextColor="#ccc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.options}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkboxContainer}>
            <FontAwesome name={rememberMe ? "check-square" : "square-o"} size={24} color="#333" />
            <Text style={styles.checkboxLabel}>Lembrar de mim</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.registerText}>
            Não tem uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>

        {/* Link "Entrar como visitante" com estilo de botão preto e linha embaixo */}
        <TouchableOpacity onPress={handleGuestLogin}>
          <Text style={styles.guestLoginText}>Entrar como visitante</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003b5a',
    padding: 20,
  },
  box: {
    width: '90%',
    backgroundColor: '#ffeb3b',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003b5a',
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#003b5a',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  registerLink: {
    color: '#f4b400',
  },
  // Estilo para "Entrar como visitante"
  guestLoginText: {
    color: '#000', // texto preto
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 1, // linha embaixo
    borderBottomColor: '#000', // cor da linha
    paddingBottom: 3, // espaço entre o texto e a linha
  },
});
