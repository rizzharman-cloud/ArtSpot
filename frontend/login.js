function init() {
    document.getElementById("login").onclick = login;
    console.log("test");
}

function login() {
    //Get the username and password input then check that they aren't empty
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username.trim().length <= 0 || password.trim().length <= 0) {
        alert("Please enter both a username and a password.")
    }
    let user = {"username": username, "password": password};

    //Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
            window.location.href = "/home";
		}else if(this.readyState == 4 && this.status == 404) {
            alert("Invalid Username. Please try again.");
        }
        else if(this.readyState == 4 && this.status == 401) {
            alert("Invalid password. Please try again.");
        }
	}

	//Specify type of request, server file location, asynch or synch, and send it
	xhttp.open("POST", `/login`, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(user));
}