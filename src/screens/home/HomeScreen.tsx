import {Button, Text, View} from 'react-native';
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
  EventType,
  TimestampTrigger,
  TriggerType,
  AuthorizationStatus,
} from '@notifee/react-native';
import React, {useEffect} from 'react';
// import AlarmScreen from '../alarm-screen/AlarmScreen';

async function requestUserPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission settings:', settings);
  } else {
    console.log('User declined permissions');
  }
}

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  console.log(notification);

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction!.id === 'mark-as-read') {
    // Update external API
    // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
    //   method: 'POST',
    // });
    // Remove the notification
    // await notifee.cancelNotification(notification.id);
  }
});

const HomeScreen = () => {
  //
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);

  const scheduleAlarm = async () => {
    //   Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      vibration: true,
      //   vibrationPattern: [200, 300, 500],
      lights: true,
    });

    const date = new Date(Date.now());

    date.setSeconds(date.getSeconds() + 12);

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
      alarmManager: {
        allowWhileIdle: true,
      },
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',

        android: {
          channelId,
          category: AndroidCategory.CALL,
          importance: AndroidImportance.HIGH,
          lightUpScreen: true,
          visibility: AndroidVisibility.PUBLIC,
          asForegroundService: true,
          pressAction: {
            id: 'alarm-screen',
            mainComponent: 'alarm-screen',
          },
          fullScreenAction: {
            id: 'alarm-screen',
            mainComponent: 'alarm-screen',
          },
        },
      },
      trigger,
    );
    console.log('Alarm scheduled');
  };

  return (
    <View style={{backgroundColor: '#2D3848', height: '100%'}}>
      <Text>Extreme Alarm</Text>
      <Button
        title="Schedule Alarm"
        onPress={async () => {
          await scheduleAlarm();
        }}
      />
      <Button
        title="Grant Permission"
        onPress={async () => {
          await requestUserPermission();
        }}
      />
    </View>
  );
};

export default HomeScreen;
