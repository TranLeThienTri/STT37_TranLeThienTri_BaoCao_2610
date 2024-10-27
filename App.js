import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';

// or any files within the Snack
import Screen from './components/screen.js';

export default function App() {
  return (
    <SafeAreaView>
      <Screen/>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
