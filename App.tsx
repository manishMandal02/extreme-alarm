import React from 'react';
import {Button, SafeAreaView, StatusBar, Text, View} from 'react-native';
import {useSendNotification} from './src/hooks/useNotification';

function App(): JSX.Element {
  const {sendNotification} = useSendNotification();
  const handleAlarm = async () => {
    console.log('🚀 ~ file: App.tsx:9 ~ handleAlarm ~ handleAlarm');

    await sendNotification();
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <View className="flex w-screen h-screen items-center justify-center">
        <Text className="text-3xl font-medium text-orange-500">
          Extreme Alarm
        </Text>
        {/* <Text className="bg-cyan-400 text-white rounded-md text-lg cursor-pointer px-4 py-1">
          Button
        </Text> */}
        <Button title="Set Alarm" onPress={handleAlarm} />
      </View>
    </SafeAreaView>
  );
}

export default App;
