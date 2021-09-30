import React, {useState} from 'react'

class Task{
	constructor(title,energyCost,timeCost,deadline){
		this.title = title;
		this.energyCost = energyCost;
		this.timeCost = timeCost;
		this.deadline = deadline;

//		"Priority is something that the user should not be able to directly set. Unsure yet how it will be calculated, will modify later."
		this.priority = 0
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

}

export default Task;

