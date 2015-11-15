//timer for autoupdate message's history
function timer(){
	updateHistory();
	setTimeout(" timer();",100);		
}

//for realtime update inboxe's
var reciverGlobal=0;
var messageGlobal=0;
//next two functions for input's onchange() event 
function reciverChange(){
	reciverGlobal = document.getElementById("reciver").value;		
}
function messageChange(){
	messageGlobal = document.getElementById("message").value;		
		//alert(data.res);
}
//all callback functions used for retrive data from server
//insted sending all whole page we send only one callback function
function myCallback(data){
	if (data.status!="done"){
	alert(data.status);
	}		
}
function send(){
	//if user changing input value, use it.
	//else use default
	if(reciverGlobal!=0){
		valReciver=reciverGlobal;
	}else{
	valReciver = document.getElementById("reciver").value;	
	}
	if(messageGlobal!=0){
		valMessage=messageGlobal;
	}else{	
	valMessage = document.getElementById("message").value;
	}
	//alert(valReciver);
	//alert(valMessage);
	//call funtion sendMessage from /messenger/ajax.py
	//take myCallback in request argument
	//second parameter is dictinary with other argument's
	Dajaxice.messenger.sendMessage(myCallback,{'activeUserName':'{{activeUserName}}','reciver':valReciver,'message':valMessage});
};
function myCallbackUpdateHistory(data){
	//all messages will fill div object
	var d = document.getElementById("divMes");
	//clearing for avoid dublicat's
	d.innerHTML='messages| from <br>';
	
	for (var mm in data.m){
	//writing messages one by one
		d.innerHTML=d.innerHTML+data.m[mm][0]+'|'+data.m[mm][1]+'<br>';
	}
	
	//alert(type(data.m));
		//alert(data.m[0][0]);
};
function updateHistory(){
	Dajaxice.messenger.updateHistory(myCallbackUpdateHistory,{'activeUserName':"{{activeUserName}}"});
	//alert('testAlert');
	
};
$('document').ready(function(){
	$('#spisokUsers').on('click', '.user', function(){
		alert($(this).text());
	});
});