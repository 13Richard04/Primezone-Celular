import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as páginas
import HomePage from './pages/Home/PagInicial'; // Substitua pelo caminho correto
import LoginPage from './pages/Logar/Logar'; // Substitua pelo caminho correto
import RegisterPage from './pages/Cadastro/Cadastro'; // Substitua pelo caminho correto

const Stack = createStackNavigator();

const Rotas = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Cadastro"
        screenOptions={{
          headerShown: false, // Oculta o cabeçalho por padrão
        }}
      >
        {/* Página inicial (login como ponto de partida) */}
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
          name="Home" 
          component={HomePage} 
          options={{
            headerShown: false, // Pode personalizar ou ocultar
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rotas;
