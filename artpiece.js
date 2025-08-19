function init(name, user) {
    document.getElementById("like").onclick = function() {
        like(name);
    }

    if(document.getElementById("unlike")) {
        document.getElementById("unlike").onclick = function() {
            unlike(name);
        }
    }
}

function like(name) {
    //Check for a review
    let review = document.getElementById("review").value;
    if(review.trim().length <= 0) {
        alert("Please enter a review.");
        return;
    }

    let fullReview = {artName: name, text: review};    

    //Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
            location.reload();
		}
	}

	//Specify type of request, server file location, asynch or synch, and send it
	xhttp.open("PUT", `/like`, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(fullReview));
}

function unlike(name) {
    let reviewer = {artName: name};    

    //Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
            location.reload();
		}
	}

	//Specify type of request, server file location, asynch or synch, and send it
	xhttp.open("PUT", `/unlike`, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(reviewer));
}