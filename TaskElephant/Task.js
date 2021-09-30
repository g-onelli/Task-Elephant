import React, {useState} from 'react'

class Task{
	constructor(title,energyCost,timeCost,deadline){
		this.title = title;
		this.energyCost = energyCost;
		this.timeCost = timeCost;
		this.deadline = deadline;
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

