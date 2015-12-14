//for realtime update inboxe's
var reciverGlobal = $("#currentUser").text();
var messageGlobal = 0;
var lengthMess = 0;
var currentUser = "";
var message = "";

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

	currentUser = $("#currentUser").text();
        //alert(currentUser);
	message = $("#message").val();

	//call funtion sendMessage from /messenger/ajax.py
	//take myCallback in request argument
	//second parameter is dictinary with other argument's
	Dajaxice.messenger.sendMessage(myCallback,{'activeUserName':currentUser,'reciver':reciverGlobal,'message':message});
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
	setTimeout(" timer();",1000);		
};


$('document').ready(function(){
	
	showAllUsers();
	timer();
	
	$('#spisokUsers').on('click', '.user', function(){
		reciverGlobal = $(this).text();
		$("#spisokUsers .user").css("background-color", "#fff");
		$(this).css("background-color", "#777");
	});
	
	$('#sendMess').on('submit', {
		event: ''
	}, send);
});
