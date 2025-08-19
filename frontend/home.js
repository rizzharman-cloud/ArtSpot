function init() {
    document.getElementById("changeType").onclick = changeType;
	document.getElementById("logout").onclick = logout;
}

function changeType() {
    //Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
            alert("Account type successfully changed");
		}
	}

	//Specify type of request, server file location, asynch or synch, and send it
	xhttp.open("PUT", `/changeType`, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();
}

function logout() {
	//Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
            alert("You have logged out.");
			location.reload();
		}
	}

	//Specify type of request, server file location, asynch or synch, and send it
	xhttp.open("POST", `/logout`, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();
}