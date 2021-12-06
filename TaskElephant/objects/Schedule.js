import React, {useState} from 'react'



import Task from './Task';
import Alarms from './Alarms';

// "Important note: A date-time 'second' has a value of 1000."

class Schedule{

	constructor(startTime = Date.now()){
		let tempTime = new Date(startTime);

//		"Setting 'startTime' to 9:00 AM of current day by default, should be user-set config"		
		tempTime.setHours(9,0);
		this.startTime = tempTime.getTime();
//		"Setting 'endTime' to 10:00 PM of current day by default, should be user-set config
		tempTime.setHours(24,0);
		this.endTime=tempTime.getTime();


//		this.endTime = tempTime - (tempTime%dayTime) + 1000*60*60*22;

//		"availableTime is an array of available timeblocks, timeblock = [start-time, end-time]"
		this.availableTime = [[this.startTime,this.endTime]];

//		"scheduledTasks is an array of scheduled tasks, scheduledTask = [task,start-time]"
		this.scheduledTasks = [];
		this.totalEnergy = 0;

//		"Temporary fix for time blocks prior to current time, need to find fix"
		console.log(this.availableTime);
		this.checkTimeBlocks();
		this.trimTimeBlock();

	}
	getStartTime(){
		return this.startTime;
	}
	getTimeText(date){
		date = new Date(date);
		return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
      + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
	}
	getStartTimeText(){
		var date = new Date(this.startTime);
		return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
      + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
	}
	setStartTime(time){
		this.startTime = time;
	}
	getEndTime(){
		return this.endTime;
	}
	getEndTimeText(){
		var date = new Date(this.endTime);
		return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
      + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
	}
	setEndTime(time){
		this.endTime = time;
	}

	insertTask(task){
//	"Boolean function, returns true on successful task insertion otherwise false"
//		Sanity check for duplicate tasks 
		for (const scheduledTask of this.scheduledTasks){
			if (task.compareTasks(scheduledTask[0])) {
				alert("Error: Duplicate task inputted to schedule.");
				return false;
			}
		}

//		Search through available time blocks, if block is available insert task.
		let timeCost = task.getTimeCost() * 1000 * 60 + 1000*60*10;
		for (const timeBlock of this.availableTime){
			let time = timeBlock[1] - timeBlock[0];
			console.log(timeCost + " - " + time);
			if (timeCost <= time){
				
				this.createAlarm(task,timeBlock[0]);
				console.log("Task inserted");
				this.scheduledTasks.push([task,timeBlock[0]]);
				this.totalEnergy += task.getEnergyCost();
				timeBlock[0] += time;
				if (timeBlock[0] == timeBlock[1]){
					this.availableTime.splice(this.availableTime.indexOf(timeBlock),1);
				}
				return true;
			}
		}
		return false; 
	}

	completeTask(task){
//	"Boolean function, returns true on successful task removal otherwise false"
//	"Task completion implies time/energy was spent, meaning time/energy is not returned."
		for (const scheduledTask of this.scheduledTasks){
			if (task.compareTasks(scheduledTask[0])) {
				
				this.removeAlarm(scheduledTask[0],scheduledTask[1]);

				this.scheduledTasks.splice(this.avaiableTime.indexOf(scheduledTask),1);
				/*** Insert 'remove task from GoogleCalendar' function here ***/
				return true;
			}
		}
		alert("Error: Task not scheduled.");
		return false;				
	}

	deleteTask(task){
//	"Boolean function, returns true on successful task removal otherwise false"
		for (const scheduledTask of this.scheduledTasks){
			if (task.compareTasks(scheduledTask[0])) {
				let timeCost = task.getTimeCost() + 1000*60*10;
				let taskStartTime = scheduledTask[1];

//				"Add to front of adjacent time-block if possible"
				let foundAdjacentTime = false;
				for (var timeBlock of this.availableTime){
					if (taskStartTime == timeBlock[0]){
						timeBlock[0] -= timeCost;
						foundAdjacentTime = true;
						break;
					}
				}
				if (!foundAdjacentTime){
					this.availableTime.push([taskStartTime,taskStartTime+timeCost]);
				}

				this.removeAlarm(scheduledTask[0],scheduledTask[1]);

				this.scheduledTasks.splice(this.availableTime.indexOf(scheduledTask),1);
				/*** Insert 'remove task from GoogleCalendar' function here ***/

				this.totalEnergy -= task.getEnergyCost();
				return true;
			}
		}
		alert("Error: Task not scheduled.");
		return false;				
	}

	initTaskAlarms(){
//	"This should be run to ensure all alarms for this schedule are active."

		Alarms.clearAllScheduledNotifications();
		for (const schedeuledTask in this.scheduledTasks){
			this.createAlarm(scheduledTask[0],scheduledTask[1]);
		}		
	}

	async createAlarm(task,alarmTime){
		/*** Insert alarm insertion here ***/
		await Alarms.createScheduledNotification(task,alarmTime);

//debug
		Alarms.displayNotification(task);		
	}

	async removeAlarm(task,alarmTime = 0){
		/*** Insert alarm removal here ***/
		await Alarms.clearScheduledNotification(task);
		console.log("Alarm removal successful");

	}

	getSchedule(){
//	"Reminder: scheduledTasks is in the form [Task,Start-Date]"		
		return this.scheduledTasks;
	}

	getEnergyCost(){
		return this.totalEnergy;
	}

	sortTimeBlocks(){
//	"Ensure the time blocks are ordered such that the 'start' time is ascending."
//	"This should happen naturally just by how time blocks are created, but this is just to make sure."

//		Selection sort
		for (var i = 1; i < this.availableTime.length-1; i++){
			var currTime = this.availableTime[i];
			for (var j = i -1; j >= 0; j--){
				if (currTime[0] < this.availableTime[j][0]){
					this.availableTime[j+1] = this.availableTime[j];
				}
				else if (this.availableTime[j][0] > currTime[0]){
					this.availableTime[j+1] = currTime;
					break;
				}
			}
		}
//debug checkTimeBlocks();

	}
	timeBlockSplice(){
//	"Search through the time blocks to merge adjacent blocks."	
		for (var i = this.availableTime.length-1; i>= 1; i--){
			var timeBlock = this.avaiableTime[i];
			var priorTimeBlock = this.avaiableTime[i-1];
			
			if (timeBlock[0] == priorTimeBlock[1]){
				this.availableTime[i][0] = this.availableTime[i-1][0];
				this.availableTime.splice(i-1,1);
				continue;
			}
			else if (timeBlock[1] == priorTimeBlock[0]){
				this.availableTime[i-1][0] = this.avaialableTime[i][0];
				this.avialableTime.splice(i,1);
				continue;
			}
		}
	}
	trimTimeBlock(){
//	"Remove/Adjust time blocks that have a start-time before current time."
		let currTime = Date.now() + 1000 * 60 * 5;
		console.log("ii" +  currTime);
		for (var i = this.availableTime.length-1; i >= 0; i--){
			var timeBlock = this.availableTime[i];
			if (currTime > timeBlock[0]){
				if (currTime > timeBlock[1]){
					this.availableTime.splice(i,1);
				}
				else{
					this.availableTime[i][0] = currTime;
					console.log("**" + this.availableTime[i][1]);
				}
			}  
		}
		this.checkTimeBlocks();	
	}

	checkTimeBlocks(){
		var i = 1;
		for(var timeBlock of this.availableTime){
			console.log("Block " + i + ": " + this.getTimeText(timeBlock[0]) + " - " + this.getTimeText(timeBlock[1]));
			i++;
		}
	}


}
export default Schedule;


