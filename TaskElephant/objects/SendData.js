/*import AsyncStorage from '@react-native-async-storage/async-storage';
import RNSmtpMailer from "react-native-smtp-mailer";
import Log from './Log';
//import Task from './Task';
import getLog from './Log';
import getLogJSON from './Log';

var RNFS = require('react-native-fs');

//four numbers
//3 lists
const gatherData = async()=>{
    let dataGathered = []

    let lifetime = await Log.getLogJSON('taskLifetimes');
    dataGathered.push(lifetime);
    let scheduleLength = await Log.getLogJSON('numTasksInSchedule');
    dataGathered.push(scheduleLength);
    let taskPerWeek = await Log.getLogJSON('weeklyCreatedTasks');
    dataGathered.push(taskPerWeek);

    let numSchedule = await Log.getLog('createdSchedules');
    dataGathered.push(numSchedule);
    let schedulesCompleted = await Log.getLog('completedSchedules');
    dataGathered.push(schedulesCompleted);
    let tasksDeleted = await Log.getLog('deletedTasks');
    dataGathered.push(tasksDeleted);
    let tasksCreated = await Log.getLog('createdTasks');
    dataGathered.push(tasksCreated);

    return dataGathered;    
}

const createFile = ()=>{
    let logData;
    gatherData().then(data=>logData=data);
    

}

function sendEmail() {
    RNSmtpMailer.sendMail({
      mailhost: "smtp.gmail.com",
      port: "465",
      ssl: true,
      username: "gonelli2113@gmail.com",
      password: "459972Go",
      from: "gonelli2113@gmail.com",
      recipients: "taskelephantgroup@gmail.com",
      subject: "Something",
      htmlBody: "<p>testing thing</p>",
      attachmentPaths: [],
      attachmentNames: [],
      attachmentTypes: [],
    })
    console.log(res)
  }
export default sendEmail

//export default sendMail
console.log(gatherData(2,3))*/