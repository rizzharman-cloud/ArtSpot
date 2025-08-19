function init() {
    document.getElementById("createAccount").onclick = createAccount;
}

function createAccount() {
    //Get the username and password input then check that they aren't empty
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if(username.trim().length <= 0 || password.trim().length <= 0) {
        alert("Please enter both a username and a password.")
        return;
    }
    let newUser = {"username": username, "password": password};
    console.log(newUser);

    //Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
            alert("Account successfully created. Please login.");
            window.location.href = "/";
		}else if(this.readyState == 4 && this.status == 400) {
            alert("Username already exists. Please try again.");
        }
	}

	//Specify type of request, server file location, asynch or synch, and send it
	xhttp.open("POST", `/createAccount`, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(newUser));
}