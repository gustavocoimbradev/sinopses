import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PontosProvider from './src/contexts/pontos';

import Home from './src/pages/Home';
import Jogo from './src/pages/Jogo';
import Fim from './src/pages/Fim';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <PontosProvider>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false, default: true }}/>
        <Stack.Screen name="Jogo" component={Jogo} options={{ headerShown: false }}/>
        <Stack.Screen name="Fim" component={Fim} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </PontosProvider>
    </NavigationContainer>
  );
}

export default App;