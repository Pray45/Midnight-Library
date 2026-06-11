import NewUser from './app/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import './global.css';

export default function App() {
  useEffect(() => {
    NavigationBar.setButtonStyleAsync('dark');
  }, []);
  return (
    <SafeAreaProvider>
      <NewUser></NewUser>
    </SafeAreaProvider>
  );
}
