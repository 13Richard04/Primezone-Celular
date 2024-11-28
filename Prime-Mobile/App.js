import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './DB/firebaseConfig';  // Importe o objeto de autenticação do Firebase
import { onAuthStateChanged } from 'firebase/auth';

// Importando as páginas
import PerguntasMaterias from './pages/PerguntaMateria/PerguntasMaterias';
import LoginPage from './pages/Logar/Logar'; // Substitua pelo caminho correto
import RegisterPage from './pages/Cadastro/Cadastro'; // Substitua pelo caminho correto
import Perfil from './pages/Perfil/Perfil';
import CentralAjuda from './pages/CentralAjuda/CentralAjuda';
import PerguntaPage from './pages/Pergunta/Pergunta';

const Stack = createStackNavigator();

const Rotas = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "PerguntasMaterias" : "Login"} // Direciona para Home ou Login dependendo da autenticação
        screenOptions={{
          headerShown: false, // Oculta o cabeçalho por padrão
        }}
      >
        {/* Página de login */}
        <Stack.Screen name="Login" component={LoginPage} />

        {/* Página de cadastro */}
        <Stack.Screen
          name="Cadastro"
          component={RegisterPage}
          options={{
            headerShown: true, // Exibe o cabeçalho apenas nessa página
            headerTitle: 'Cadastro',
            headerStyle: { backgroundColor: '#003b5a' },
            headerTintColor: '#fff', // Cor do texto do cabeçalho
            headerLeft: null, // Remove o botão de voltar
          }}
        />

        {/* Página inicial após login */}
        <Stack.Screen
          name="PerguntasMaterias"
          component={PerguntasMaterias}
          options={{
            headerShown: false, // Pode personalizar ou ocultar
          }}
        />

        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{
            headerShown: false, // Pode personalizar ou ocultar
          }}
        />

        <Stack.Screen
          name="CentralAjuda"
          component={CentralAjuda}
          options={{
            headerShown: false, // Pode personalizar ou ocultar
          }}
        />

        <Stack.Screen
          name="PerguntaPage"
          component={PerguntaPage}
          options={{
            headerShown: false, // Pode personalizar ou ocultar
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
