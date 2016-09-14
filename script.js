function Coordinates(width, height, top, left)
{
	this.width = width;
	this.height = height;
	this.top = top;
	this.left = left;
}

function Question()
{
	this.rightAnswerArea = new Coordinates(0,0,0,0);
	this.taskFileName = "";
	this.task = "";
}

function CompleteAnswer()
{
	this.questionsArray = [];
	this.rightAnswerFileName = "";
	this.rightAnswerText = "";
	this.wrongAnswerFileName = "";
	this.wrongAnswerText = "";
	this.backgroundFileName = "";
}

function handleBrowseClick(e)
{	
	target = e.target;
	var fileinput = document.getElementById("browse");
	fileinput.click();
}

function handlechange()
{
	var fileinput = document.getElementById("browse");
	var button = target;
	button.value = fileinput.value.substring(12, fileinput.value.length);   
	
	switch(button.id)
	{
		case "chooseBgFile":
			backgroundInput = button.value;
			setBackground();
			break;
		case "questionAudio":
			taskAudio = button.value;
			break;
		case "goodAnswer":
			goodAnswerAudio = button.value;
			break;
		case "badAnswer":
			wrongAnswerAudio = button.value;
			break;
	}	
}

window.onload = function()
{
	moving = true;
	var div = document.getElementById('div');
	mp = document.getElementById('mainPanel');

	x1 = 0;
	y1 = 0;
	x2 = 0;
	y2 = 0;

	backgroundInput = "";

	taskInput = "";
	taskAudio = "";

	goodAnswerInput = "";
	goodAnswerAudio = "";

	wrongAnswerInput = "";
	wrongAnswerAudio = "";

	coordinates = new Coordinates(0,0,0,0);
	question = new Question();	
	completeAnswer = new CompleteAnswer();

	task = document.getElementById("task");
	good = document.getElementById("goodText");
	bad = document.getElementById("badText");

	task.addEventListener("click", clean);
	good.addEventListener("click", clean);
	bad.addEventListener("click", clean);
}


function setBackground()
{
		var tgt = document.getElementById("browse");
		files = tgt.files;
		
		var name = tgt.value.substring(12, tgt.value.length);
		
	
		if (FileReader && files && files.length)
		{	
			var fr = new FileReader();
			fr.onload = function()
			{
				var panel = document.getElementById("mainPanel");
				panel.style.backgroundImage = "url('" + fr.result + "')";
			}
			fr.readAsDataURL(files[0]);
		}
	
}

function reCalc() 
{
    var x3 = Math.min(x1,x2);
    var x4 = Math.max(x1,x2);
    var y3 = Math.min(y1,y2);
    var y4 = Math.max(y1,y2);
    div.style.left = x3 + 'px';
    div.style.top = y3 + 'px';
    div.style.width = x4 - x3 + 'px';
    div.style.height = y4 - y3 + 'px';
}

mousedown = function(e) 
{
	if(!moving) 
	{ 
		div.hidden = 1; 
		moving = true;  
		drawing = false;
	}
	else
	{
		moving = true;
		drawing = true;
		div.hidden = 0;
   		x1 = e.clientX - mp.offsetLeft;
    		y1 = e.clientY - mp.offsetTop;
    		reCalc();
	}	
}

mousemove = function(e) 
{
	if(moving)
	{
   		x2 = e.clientX - mp.offsetLeft;
    		y2 = e.clientY - mp.offsetTop;
   		reCalc();

	}
}

mouseup = function(e) 
{
	if(drawing)
   	{	
		moving = false;
		coordinates = new Coordinates(parseInt(div.style.width), parseInt(div.style.height), parseInt(div.style.top), 
			parseInt(div.style.left));
	}
}

clean = function(e)
{
	var tgt = e.target;
	tgt.value = "";
	tgt.removeEventListener("click", clean);
}

setTaskInput = function(e)
{
	var elem = document.getElementById("task");
	taskInput = elem.value;
}

setGoodAnswerText = function(e)
{
	var elem = document.getElementById("goodText");
	goodAnswerInput = elem.value;
}

setBadAnswerText = function(e)
{
	var elem = document.getElementById("badText");
	wrongAnswerInput = elem.value;
}

submit = function(e)
{
	question = new Question();
	question.task = taskInput;
	question.taskFileName = taskAudio;
	question.rightAnswerArea = coordinates;
	completeAnswer.questionsArray.push(question);

	task.addEventListener("click", clean);
	task.value = "Enter task...";

	good.addEventListener("click", clean);
	good.value = "Write the correct answer!";

	bad.addEventListener("click", clean);
	bad.value = "Write the incorrect answer!";

	taska = document.getElementById("questionAudio");
	taska.value = "Upload File";

	gooda = document.getElementById("goodAnswer");
	gooda.value = "Upload File";

	bada = document.getElementById("badAnswer");
	bada.value = "Upload File";
}

generate = function(e)
{
	completeAnswer.backgroundFileName = backgroundInput;
	completeAnswer.rightAnswerFileName = goodAnswerAudio;
	completeAnswer.rightAnswerText = goodAnswerInput;
	completeAnswer.wrongAnswerFileName = wrongAnswerAudio;
	completeAnswer.wrongAnswerText = wrongAnswerInput;

	j = JSON.stringify(completeAnswer);
	copyToClipboard(j);	
}

function copyToClipboard(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}
 
