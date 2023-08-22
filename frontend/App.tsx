import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect, createContext } from 'react'
import Intro from './components/intro/Intro';
import AppRouter from './components/appRouter/AppRouter';
import { Provider } from 'react-redux';
import store from './redux/redux_store';

export const MyContext = createContext(null)

export default function App() {
  const [intro, setIntro] = useState(true)

  useEffect(() => {
    setTimeout(() => setIntro(false), 2900); // имитация загрузки данных
  }, []);

  return (
    <Provider store={store}>
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
    </Provider>
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
