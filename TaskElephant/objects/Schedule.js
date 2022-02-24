import React, {useState} from 'react'



import Task from './Task';
import TaskStore from './TaskStore'
import Alarms from './Alarms';
import Log from './Log.js';

// "Important note: A date-time 'second' has a value of 1000."

class Schedule{

	constructor(startTime = 0, endTime = 0, scheduledTasks = [], availableTime = [], totalEnergy = 0, 
			completedTasks = [], scheduledEvents = [], key = Math.round(Math.random() * 1000000)){
		if (startTime == 0){
			startTime = new Date(Date.now());
	//		"Setting 'startTime' to 9:00 AM of current day by default, should be user-set config"		
			startTime.setHours(9,0);
		}

		this.startTime = startTime;

		if (endTime == 0){
			endTime = new Date(Date.now());
	//		"Setting 'startTime' to 9:00 AM of current day by default, should be user-set config"		
			endTime.setHours(22,0);
		}
		this.endTime = endTime;

//		this.endTime = tempTime - (tempTime%dayTime) + 1000*60*60*22;

//		"availableTime is an array of available timeblocks, timeblock = [start-time, end-time]"
//		console.log(availableTime);
		if (availableTime.length == 0){
			this.availableTime = [[this.startTime,this.endTime]];	
		}
		else{
			this.availableTime = availableTime;
		}
		

//		"scheduledTasks is an array of scheduled tasks, scheduledTask = [task,start-time]"
		this.scheduledTasks = scheduledTasks;

//		"completedTasks is an array of completed tasks, completedTask = [task,start-time]"
//		"Think of this as ShowTasks's 'notSchedule' for greyed out tasks."		
		this.completedTasks = completedTasks;

//		"scheduledEvents is an array of events, no start-time should be necessary."
		this.scheduledEvents = scheduledEvents;

		this.totalEnergy = totalEnergy;

		this.key = key;

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
	getScheduledTasks(){
		return this.scheduledTasks;
	}

	insertTask(task){
//	"Boolean function, returns true on successful task insertion otherwise false"
//		Sanity check for duplicate tasks 
		for (const scheduledTask of this.scheduledTasks){
			if (task.compareTasks(scheduledTask[0])) {
				alert("Error: Duplicate task inputted to schedule.");
				console.log("Error: Duplicate task inputted to schedule.");
				return false;
			}
		}

//		Search through available time blocks, if block is available insert task.
		let timeCost = task.getTimeCost() * 1000 * 60 + 1000*60*10;
		console.log(this.availableTime);
		for (const timeBlock of this.availableTime){
			let time = timeBlock[1] - timeBlock[0];
			console.log(timeCost + " - " + time);
			if (timeCost <= time){
				
				console.log("Task inserted");
				this.scheduledTasks.push([task,timeBlock[0],true]);
				this.totalEnergy += task.getEnergyCost();
				timeBlock[0] += timeCost;
				if (timeBlock[0] == timeBlock[1]){
					this.availableTime.splice(this.availableTime.indexOf(timeBlock),1);
				}
//				console.log(this.scheduledTasks);

			//	"Test code to show notification early"
				Alarms.displayNotification(task,timeBlock[0]);

				return true;
			}
		}
		return false; 
	}

	insertEvent(event){
		let eventStart = event.getStartTime();
		let eventEnd = event.getTimeCost() * 1000 * 60 + eventStart;
		if (eventEnd < Date.now()){
			return;
		}
		if (!this.scheduledEvents.includes(event)){
			this.scheduledEvents.push(event);
		}
		console.log(this.availableTime);
		for (var i = this.availableTime.length-1; i>= 0; i--){
			var timeBlock = this.availableTime[i];
			let time = timeBlock[1] - timeBlock[0];
			
			// Event overlaps with end of timeBlcok
			let cond1 = (timeBlock[1] > eventStart && timeBlock[0] < eventStart);
			// Event overlaps with start of timeBlock
			let cond2 = (timeBlock[0] < eventEnd && timeBlock[1] > eventEnd)
			// Event is inside timeBlock
			let cond3 = (cond1 && cond2);
			console.log("Conditions:");
			console.log(cond1);
			console.log(cond2);
			console.log(cond3);
			if (cond3){
				var newTimeBlock = [timeBlock[0],eventStart];
				var newTimeBlock2 = [timeBlock[1],eventEnd]; 
				this.availableTime.splice(i,1);
				this.availableTime.push(newTimeBlock,newTimeBlock2);
				continue;
			} 
			if (cond1){
				this.availableTime[i][1]=eventStart;
				continue; 
			} 
			if (cond2){
				this.availableTime[i][0]=eventEnd;
				continue;
			} 

		}
		console.log(this.availableTime);
		this.sortTimeBlocks(); 
	}
	

	completeTask(task){
//	"Boolean function, returns true on successful task removal otherwise false"
//	"Task completion implies time/energy was spent, meaning time/energy is not returned."
		for (const scheduledTask of this.scheduledTasks){
			if (!scheduledTask[2]) {continue;}
			if (task.compareTasks(scheduledTask[0])) {
				
				this.removeAlarm(scheduledTask[0],scheduledTask[1]);
				scheduledTask[2] = false;
//				this.scheduledTasks.splice(this.availableTime.indexOf(scheduledTask),1);
				
				var scheduledCount = 0;
				console.log("Fail");
				for (const task of this.scheduledTasks){
					if (task[2]){scheduledCount+= 1;}
				}

				if (scheduledCount == 0){
					Log.addCompletedSchedules();
				}

				TaskStore.removeTask(scheduledTask[0]);
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

	async initTaskAlarms(){
//	"This should be run to ensure all alarms for this schedule are active."

		await Alarms.clearAllScheduledNotifications();
		for (const scheduledTask of this.scheduledTasks){
//			console.log("ScheduledTask: " + scheduledTask[0] + "  -  " + scheduledTask[1]);
			if (scheduledTask[2]){
				this.createAlarm(scheduledTask[0],scheduledTask[1]);	
			}
		}		
	}

	async createAlarm(task,alarmTime){
		/*** Insert alarm insertion here ***/
//		console.log("Alarm created at " + new Date(alarmTime));
		await Alarms.createScheduledNotification(task,alarmTime);

//debug
				
	}

	async removeAlarm(task,alarmTime = 0){
		/*** Insert alarm removal here ***/
//		console.log("Alarm removed");
		await Alarms.clearScheduledNotification(task);
//		console.log("Alarm removal successful");

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
//		console.log("ii" +  currTime);
		for (var i = this.availableTime.length-1; i >= 0; i--){
			var timeBlock = this.availableTime[i];
			if (currTime > timeBlock[0]){
				if (currTime > timeBlock[1]){
					this.availableTime.splice(i,1);
				}
				else{
					this.availableTime[i][0] = currTime;
//					console.log("**" + this.availableTime[i][1]);
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


