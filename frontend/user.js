function init() {
    let username = document.getElementById("name").innerText;
    document.getElementById("follow").onclick = function() {
        follow(username);
    };

    let buttons = document.getElementsByClassName("registerWorkshop");
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            register(username, this.id);
        }
    }
}

//Create a request to server to follow the artist
function follow(username) {
    let name = {name: username};

    //Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
		}
	}

	//Specify type of request, server file location, asynch or synch, and send it
	xhttp.open("PUT", `/follow`, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(name));
}

function register(username, workshopName) {
    let registeredWorkshop = {name: workshopName, host: username};
    //Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
		}
	}

	//Specify type of request, server file location, asynch or synch, and send it
	xhttp.open("PUT", `/register`, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(registeredWorkshop));
}