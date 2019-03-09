var dataList = require("./data.json");		//Event information imported from json file
var already_booked = new Array();		//Array for storing booked events
var available = new Array();		//Array for storing available events

//Loops through event list, adding an object with start and end time to appropriate array
for(i = 0; i < dataList.length; i++) {
	var dateInfo = 	{
		start: new Date(dataList[i].start),
		end: new Date(dataList[i].end)
	}
	
	if(dataList[i].type == "booked") {
		already_booked.push(dateInfo);
	}
	else {
		available.push(dateInfo);
	}
}
//Adds available events that do not have overlap to an array
var canAttend = new Array();	//Array to store available events that can be attended
for(i = 0; i < available.length; i++) {
	if(!checkEvent(already_booked, available[i])) {		//Calls function to check for event overlap
		canAttend.push(available[i]);
	}
}

//Prints all events that can be attended
if(canAttend.length > 0) {
	for(i = 0; i < canAttend.length; i++) {
		console.log("(start = " + canAttend[i].start.toLocaleDateString() + " " + canAttend[i].start.toLocaleTimeString() + ", end = " 
		+ canAttend[i].end.toLocaleDateString() + " " + canAttend[i].end.toLocaleTimeString() + ")");
	}
}
else {
	console.log("There are no available events without overlap");
}

//Function used to check for overlap
function checkEvent(already_booked, eventCheck) {
	var overlap = false;
	
	//Variables storing day, start and end times for event being checked
	var eventDay = eventCheck.start.getDay();
	var eventStart = eventCheck.start.toTimeString();
	var eventEnd = eventCheck.end.toTimeString();
	
	//Compares to each event or until overlap is found
	for(y = 0; y < already_booked.length; y++) {
		var bookedDay = already_booked[y].start.getDay();
		var bookedStart = already_booked[y].start.toTimeString();
		var bookedEnd = already_booked[y].end.toTimeString();
		if(eventDay == bookedDay) {		//Only checks for time overlap if events are on same day
			if((eventStart <= bookedEnd) && (eventEnd >= bookedStart)) {	//Checks overlap based on start and end times of available and booked event
				overlap = true;
				break;	//Stops checking array when overlap has been found
			}
		}
	}
	return overlap;
}