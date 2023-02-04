import React from 'react';
import {
  AppRegistry,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import AlarmScreen from './src/screens/alarm-screen/AlarmScreen';
// import AlarmScreen from './src/screens/alarm-screen/AlarmScreen';

import HomeScreen from './src/screens/home/HomeScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{height: '100%', display: 'flex'}}>
          <HomeScreen />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

AppRegistry.registerComponent('app', () => App);

AppRegistry.registerComponent('alarm-screen', () => AlarmScreen);

// AppRegistry.registerComponent('alarm-screen', () => AlarmScreen);

export default App;
