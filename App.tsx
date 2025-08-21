import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { Routes } from "./src/routes";

export default function App() {

  return (
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
  );
}