

function processWord(x,y,string,colour,time){
	if(string[0] == "/"){
		let newString = string.slice(1).split(" ")
		let command = newString[0]
		let parameters = newString.slice(1)
		processCommand(command, parameters)
	}
	else{
		addWord(x,y,string,colour,time)
	}
}

function addWord(x,y,string,colour,time){
	words.push({"x":x,"y":y,"string":string,"colour":colour,"time":time});
}

function processCommand(command, parameters) {
	switch(command){
		case "background":
			bCol = color(parameters[0], parameters[1]||360, parameters[2]||360);
			break;

		default:
			
	}
}


function keyPressed(){
	if(keyCode != ENTER){
		if(keyCode != 16){ // Allow shift
			if(keyCode != 8){ // Implement backspace
				string += key;
			}
			else{
				string = string != "" ? string.slice(0,-1) : ""
			}
		}
	}
	else{
		if(string != ""){
			x = random(width);
			y = random(height);
			time = new Date().toLocaleTimeString().slice(0,-3)
			processWord(x,y,string,myColour,time);
			socket.emit('drawing',x,y,string,myColour, time);
			string = "";
		}
	}
	if(keyCode == 191){return false} // "/" is used for quickfind, so this disables that
}

