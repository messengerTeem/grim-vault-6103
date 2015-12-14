//for realtime update inboxe's
var reciverGlobal = $("#currentUser").text();
var messageGlobal = 0;
var lengthMess = 0;
var currentUser = "";
var message = "";

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
