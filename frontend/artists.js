function init() {
    let buttons = document.getElementsByClassName("unfollow");
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = unfollow;
    }
}

function unfollow() {
    let unfollowed = {name: this.id};

    //Create an xmlhttp request
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            alert(`You've unfollowed ${unfollowed.name}`);
            location.reload();
        }
    }

    //Specify type of request, server file location, asynch or synch, and send it
    xhttp.open("PUT", `/unfollow`, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(unfollowed));
}