import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

import Main from './src/containers/Main';

const App = () => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      await Font.loadAsync({
        'montserrat-regular': require('./src/assets/fonts/Montserrat-Regular.ttf'),
        'montserrat-medium': require('./src/assets/fonts/Montserrat-Medium.ttf'),
        'montserrat-bold': require('./src/assets/fonts/Montserrat-Bold.ttf'),
        'numpty-regular': require('./src/assets/fonts/Numpty-Regular.otf'),
        'digital': require('./src/assets/fonts/digital-7.ttf'),
      });
      setFontsLoaded(true);
    })();
  }, []);
  return (
    <View style={styles.container}>
      {fontsLoaded && <Main />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;