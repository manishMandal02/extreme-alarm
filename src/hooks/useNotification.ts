import notifee, {
  AndroidCategory,
  AndroidColor,
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';

const useSendNotification = () => {
  const sendNotification = async () => {
    try {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'hollow',
        lights: true,
        lightColor: AndroidColor.RED,
      });

      const date = new Date(Date.now());
      date.setMinutes(date.getMinutes() + 2);

      // Create a time-based trigger
      const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
        alarmManager: {
          allowWhileIdle: true,
        },
      };

      // Display a notification
      await notifee.createTriggerNotification(
        {
          title: 'Extreme Alarm',
          body: 'This is a test alarm trigger',
          android: {
            channelId,
            //   smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            // pressAction is needed if you want the notification to open the app when pressed
            category: AndroidCategory.ALARM,
            importance: AndroidImportance.HIGH,
            fullScreenAction: {
              id: 'default',
            },
            pressAction: {
              id: 'default',
            },
            asForegroundService: true,
          },
        },
        trigger,
      );
    } catch (error) {
      console.log(
        '🚀 ~ file: useNotification.ts:9 ~ sendNotification ~ error',
        error,
      );
    }
  };
  return {sendNotification};
};

export {useSendNotification};
