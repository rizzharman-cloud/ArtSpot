function init(artworks) {
    let allArtWorks = artworks;
    console.log(allArtWorks);
    refresh(allArtWorks)
    document.getElementById("search").onclick = search;
}

function refresh(allArtWorks) {
    console.log("REFRESH");
    document.getElementById("results").innerHTML = "";

    for(let i = 0; i < allArtWorks.length; i++) {
        let link = document.createElement(`a`);
        link.href = `/artwork/${allArtWorks[i].name}`;
        link.innerHTML += `<h3>${allArtWorks[i].name} by ${allArtWorks[i].artist} in ${allArtWorks[i].year}</h3>`;

        document.getElementById("results").innerHTML += link.outerHTML;
        document.getElementById("results").innerHTML += `<h3>${allArtWorks[i].description}</h3>`;
        document.getElementById("results").innerHTML += `<h4>Category: ${allArtWorks[i].category}</h4>`;
        document.getElementById("results").innerHTML += `<h4>Made from: ${allArtWorks[i].medium}</h4>`;
        document.getElementById("results").innerHTML += `<img src=${allArtWorks[i].image}><br><br>`;
    }
}

function search() {
    let artworkName = document.getElementById("artworkName").value;
    let artistName = document.getElementById("artistName").value;
    let artworkCategory = document.getElementById("artworkCategory").value;
    let artworkMedium = document.getElementById("artworkMedium").value;

    let queryParams = `name=${artworkName}&artist=${artistName}&category=${artworkCategory}&medium=${artworkMedium}`

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let allArtWorks = JSON.parse(this.responseText)
            console.log(allArtWorks);
            console.log("REFRESH");
            refresh(allArtWorks);
        }        
    }

    xhttp.open("GET", "/artwork"+"?"+queryParams, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send();
}