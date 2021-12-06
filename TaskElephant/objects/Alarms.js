import notifee, {AndroidImportance,EventType,TimestampTrigger, TriggerType} from '@notifee/react-native';
import NotificationSounds, { playSampleSound , stopSampleSound}  from 'react-native-notification-sounds';


//  "Stores all 'alarm' functions for use/reference elswhere."
//  "The 'task' info itself is stored in data as a JSON string."

export async function createScheduledNotification(task,taskTime) {

    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: taskTime, // fire at 11:10am (10 minutes before meeting)
    };


    const channelId = await notifee.createChannel({
      id: 'taskelephant',
      name: 'Task-Elephant Channel',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: 'Time to start task!',
        body: task.getTitle(),
        data: {
          task: JSON.stringify(task),
        },
        android: {
          channelId,
        },
      },
      trigger,
    );
  }

export async function displayNotification(task) {
    const soundsList = await NotificationSounds.getNotifications('ringtone');
//    console.log(soundsList[0].url)
//    playSampleSound(soundsList[0]);
//    stopSampleSound();

    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'taskelephant',
      name: 'Task-Elephant Channel',
      sound: 'default',
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Time to start task!',
      body: task.getTitle(),
      data: {
        task: JSON.stringify(task),
      },
      android: {
        channelId,
      },
    });
  }  

  export async function clearNotification(task){
//  "This specifically clears a notification from the notifications menu, not scheduled notifications."
    try{
      var notifications = getDisplayedNotifcations();
      for (var notification of notifications){
        var notifTask = JSON.parse(notification.data.task);
        if (task.compareKey(notifTask.key)){
          await cancelNotification(notification.id);
          return true;
        } 
      }
      return false;
    } 
    catch(e){
      console.log(e);
    }   
  }

  export async function clearScheduledNotification(task){
//  "This specifically clears a notification that was scheduled to trigger, not a displayed notification."
    try{
      var notifications = getTriggerNotifications();
      for (var notification of notifications){
        var notifTask = JSON.parse(notification.data.task);
        if (task.compareKey(notifTask.key)){
          await cancelTriggerNotification(notification.id);
          return true;
        }
      }
      return false;
    }
    catch(e){
      console.log(e);
    }
  }



  export async function clearAllScheduledNotifications(){
    try{
      await cancelTriggerNotifications(await getTriggerNotificationIds());
    }
    catch(e){
      console.log(e);
    }
  }

  export default {displayNotification, createScheduledNotification, clearNotification, clearScheduledNotification, clearAllScheduledNotifications}