import React, {useState} from 'react'

// "Important note: A date-time 'second' has a value of 1000."

class Task{
	constructor(title,energyCost,timeCost,deadline,priority,key = Math.random() * 100000,startDate = Date.now()){
		this.title = title;
		this.energyCost = energyCost;
//		"Time Cost should be a positive integer of minutes."
		this.timeCost = timeCost
//		"Unless a prior start date is supplied, the start date will be Task creation date."
		this.startDate = startDate;
//		"Until a Date picker is implemented, this will be set to a 'default' deadline 1 week away."		
		if (deadline == 'NaN') this.deadline = 'NaN';
		else this.deadline = deadline;

//		"Priority is something that the user should not be able to directly set. Unsure yet how it will be calculated, will modify later."
		this.basePriority = priority;
		this.key = key;

	}

	getTitle(){
		return this.title;
	}
	getEnergyCost(){
		return this.energyCost;
	}
	getTimeCost(){
//		"Due to timeCost being stored in miliseconds, it must be converted back to minutes.
//		 Depending on API usage, may change to return miliseconds instead of minutes later."
		return (this.timeCost / 1000 / 60);
	}
	getDeadline(){
		return this.deadline;
	}

	getDeadlineText(){
		var date = new Date(this.deadline);
		return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().slice(-2) + " - " 
      + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);
	}

	getBasePriority(){
		return this.basePriority;
	}

	getPriority(){
//		"c_XXX values are constants to be modified."
		var priority = this.basePriority;
//debug		console.log("basePriority: " + priority);
		const timeElapsed = Date.now() - this.startDate;

		if (this.deadline == 'NaN'){
			const c_Day1 = 1000 * 60 * 60 * 24 * 2;
			const c_Prio1 = 2
			priority += Math.round(timeElapsed / c_Day1 * c_Prio1)
			return priority; 
		} 

		const totalTime = parseFloat((this.deadline - this.startDate).toFixed(2));
		const timeRemaining = parseFloat((totalTime - timeElapsed).toFixed(2));


		var elapsePriority = 0;
		var timeCostPriority = 0;
		const c_Prio2 = 8;
		
		if (timeRemaining <= 0) elapsePriority = c_Prio2;
		else elapsePriority = Math.round((timeElapsed / totalTime) * c_Prio2)
		


		const c_Prio3 = 10
		if (timeRemaining <= 0) timeCostPriority = c_Prio3 * 2
		timeCostPriority = Math.round(c_Prio3 / ((timeRemaining) / this.timeCost / 2))
		
		if (elapsePriority > timeCostPriority) priority = priority + elapsePriority;
		else priority = priority + timeCostPriority;

//debug		console.log("totalTime: " + totalTime);
//debug		console.log("timeElapsed: " + timeElapsed);
//debug		console.log("timeRemaining: " + timeRemaining);

//debug		console.log("timeCostPriority: " + timeCostPriority);
//debug		console.log("elapsePriority: " + elapsePriority);
		
//debug		console.log("final priority: " + priority);

		return priority;
	}
	getKey(){
		return this.key;
	}

//	"Set methods should be used for editing values, either from user choice or by partial task completion."
	setTitle(title){
		this.title = title;
	}
	setEnergyCost(energyCost){
		this.energyCost = energyCost;
	}
	setTimeCost(timeCost){
		this.timeCost = timeCost;
	}
	setDeadline(deadline){
		this.deadline = deadline
	}
	setBasePriority(basePriority){
		this.basePriority = basePriority
	}
	setKey(key){
		this.key = key;
	}

// "Comparison methods for checking if two tasks match."
	compareTasks(task){
		/*console.log(this.title == task.title);
		console.log(this.energyCost == task.energyCost);
		console.log(this.timeCost == task.timeCost);
		console.log(this.deadline == task.deadline);
		console.log(this.basePriority == task.basePriority);*/
		return(this.title  == task.title
			&& this.energyCost == task.energyCost 
			&& this.timeCost == task.timeCost 
			&& this.deadline == task.deadline 
			&& this.basePriority == task.basePriority)
	}
	compareTaskKeys(task){
		return (this.key == task.key);
	}
	compareKeys(key){
		return (this.key == key);
	}

}

export default Task;

