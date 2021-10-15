import React, {useState} from 'react'

class Task{
	constructor(title,energyCost,timeCost,deadline,priority){
		this.title = title;
		this.energyCost = energyCost;
		this.timeCost = timeCost;
		this.deadline = deadline;

//		"Priority is something that the user should not be able to directly set. Unsure yet how it will be calculated, will modify later."
		this.priority = priority

	}

	getTitle(){
		return this.title;
	}
	getEnergyCost(){
		return this.energyCost;
	}
	getTimeCost(){
		return this.timeCost;
	}
	getDeadline(){
		return this.deadline
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

// "Comparison methods for checking if two tasks match."
	compareTasks(task){
/*		console.log(this.title == task.title);
		console.log(this.title == task.title);
		console.log(this.title == task.title);
		console.log(this.title == task.deadline);
		console.log(this.priority == task.priority);*/
		return( this.title  == task.title
			&& this.energyCost == task.energyCost 
			&& this.timeCost == task.timeCost 
			&& this.deadline == task.deadline 
			&& this.priority == task.priority)
	}

}

export default Task;

