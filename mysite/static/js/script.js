//for realtime update inboxe's
var reciverGlobal = 0;
var messageGlobal = 0;
var lengthMess = 0;

//all callback functions used for retrive data from server
//insted sending all whole page we send only one callback function
function myCallback(data){
	if (data.status!="done"){
	alert(data.status);
	}		
};

function send(event){
	event.preventDefault();
	//if user changing input value, use it.
	//else use default

	if(reciverGlobal!=0){
		valReciver=reciverGlobal;
	}else{
		valReciver = "{{activeUserName}}";	
	}
	
	valMessage = $("#message").val();

	//call funtion sendMessage from /messenger/ajax.py
	//take myCallback in request argument
	//second parameter is dictinary with other argument's
	Dajaxice.messenger.sendMessage(myCallback,{'activeUserName':'{{activeUserName}}','reciver':valReciver,'message':valMessage});
};

function myCallbackUpdateHistory(data){
	if(data.m.length != lengthMess){
		$("#allMess div").remove();
		for (var mm in data.m){
			$("#allMess").append('<div class="user">' + data.m[mm][1] + ':</div>' );
			$("#allMess").append('<div class="mess">' + data.m[mm][0] + '</div>' );
		}
	}
	lengthMess = data.m.length;
};

function updateHistory(){
	activeUserName = $("#currentUser").text();
	Dajaxice.messenger.updateHistory(myCallbackUpdateHistory,{'activeUserName':activeUserName});
};

//вывод всех пользователей
function callbackOnUsers(data){
	for (var mm in data.m){
		$("#spisokUsers").append('<li class="user">' + data.m[mm] + '</li>' );
	}
};	

//запрос на вывод всех пользователей
function showAllUsers(){
	Dajaxice.messenger.showAllUsers(callbackOnUsers);
};

//timer for autoupdate message's history
function timer(){
	updateHistory();
	setTimeout(" timer();",100);		
};


$('document').ready(function(){
	
	showAllUsers();
	timer();
	
	$('#spisokUsers').on('click', '.user', function(){
		reciverGlobal = $(this).text();
	});
	
	$('#sendMess').on('submit', {
		event: ''
	}, send);
});