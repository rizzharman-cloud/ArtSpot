function init() {
    document.getElementById("addArtwork").onclick = addArtwork;
}

function addArtwork() {
    let name = document.getElementById("artworkName").value
    let year = document.getElementById("artworkYear").value
    let category = document.getElementById("artworkCategory").value
    let medium = document.getElementById("artworkMedium").value
    let description = document.getElementById("artworkDescription").value
    let image = document.getElementById("artworkImage").value;

    //Check if the values are valid
    if(name.trim().length == 0 || year.trim().length == 0 || category.trim().length == 0 || medium.trim().length == 0 || 
    description.trim().length == 0 || image.trim().length == 0 || isNaN(year)) {
        alert("Please enter valid values.");
        return;
    }

    let newArtwork = {"name": name, "year": year, "category": category, "medium": medium, "description": description, "image": image}; 
    console.log(newArtwork);

    //Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
		}
	}

	//Specify type of request, server file location, asynch or synch, and send it
	xhttp.open("POST", `/addArtwork`, true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(newArtwork));
}