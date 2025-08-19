function init() {
    document.getElementById("addWorkshop").onclick = addWorkshop;
}

function addWorkshop() {
    let name = document.getElementById("workshopName").value;

    //Check if the values are valid
    if(name.trim().length == 0) {
        alert("Please enter valid values.");
        return;
    }

    let newWorkshop = {"name": name};

    //Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
		}
	}

	//Specify type of request, server file location, asynch or synch, and send it
	xhttp.open("POST", `/addWorkshop`, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(newWorkshop));
}