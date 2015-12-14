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

function func_login(){
	var login1 = document.getElementById("username").value;
	var pass1 = document.getElementById("password").value;
	
	$.ajax({
            type: "POST",
            data: "text=" + login1 + "&password=" + pass1,
            url: "/login",
            dataType: "text",
            success: function () {
                location.href = "/login";
            }
        });
}

function func_reg_me() {
    document.getElementById("reg_mail").removeAttribute("hidden");
    document.getElementById("repeat_pass").removeAttribute("hidden");
    document.getElementById("log_in").setAttribute("hidden", "true");
    document.getElementById("reg_me").setAttribute("hidden", "true");
    document.getElementById("submit").removeAttribute("hidden");
}

function pass_check ()
{
    var pass1 = document.getElementById("password").value;
    var pass2 = document.getElementById("repeat_pass").value;
    if(pass1 == pass2){
        return true;
    }
    else {
        return false;
    }
}

function mes(){
    if(pass_check()) {
        var mail = document.getElementById("reg_mail").value;
        var login1 = document.getElementById("username").value;
        var pass1 = document.getElementById("password").value;

        $.ajax({
            type: "POST",
            data: "email=" + mail + "&text=" + login1 + "&password=" + pass1,
            url: "/registation",
            dataType: "text",
            success: function () {
                location.href = "/login";
            }
        });
    }
    else {
        alert("Вы не правильно ввели пароль подтверждения или оставили поле ввода пароля пустым");
    }
}

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
