import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react'
import Intro from './components/intro/Intro';
import AppRouter from './components/appRouter/AppRouter';

export default function App() {
  const [intro, setIntro] = useState(true)

  useEffect(() => {
    setTimeout(() => setIntro(false), 2900); // имитация загрузки данных
  }, []);

  return (
      <View 
        style={{
          ...styles.container,
        }}
      >
        {intro?
        <Intro/>
        :
          <AppRouter/>
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
