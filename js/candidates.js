function fetchCandidates() {
    const url = "http://localhost:8080/api/getCandidates";
    const prom = fetch(url).then(data => data.json());
    prom.then(json => {candidates = json; displayCandidates()});
}

function displayCandidates() {
    for (let candidate of candidates) {

        let col = document.createElement("div");
        col.setAttribute("class", "col-sm-4");

        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let firstName = document.createElement("h4");
        let firstNameText = document.createTextNode(candidate.firstName);
        firstName.setAttribute("class", "card-title");
        firstName.appendChild(firstNameText);

        let lastName = document.createElement("h4");
        let lastNameText = document.createTextNode(candidate.lastName);
        lastName.setAttribute("class", "card-title");
        lastName.appendChild(lastNameText);

        let infoButton = document.createElement("a");
        infoButton.setAttribute("href", "http://localhost:8080/candidate/" + candidate.cpr);
        infoButton.setAttribute("class", "btn btn-primary");
        let buttonText = document.createTextNode("View more information");
        infoButton.appendChild(buttonText);

        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", candidate.cpr);
        deleteButton.setAttribute("class", "btn btn-danger");
        let deleteButtonText = document.createTextNode("Delete");
        deleteButton.addEventListener("click", deleteCandidate);
        deleteButton.appendChild(deleteButtonText);


        document.getElementById("candidatesContainer").appendChild(col);
        col.appendChild(card);
        card.appendChild(cardBody);
        cardBody.appendChild(firstName);
        cardBody.appendChild(lastName);
        cardBody.appendChild(infoButton);
        cardBody.appendChild(deleteButton);
    }
}

function deleteCandidate(event) {
    const candidateToDelete = event.target.id;

    let deleteCaandidateRequest = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: null
    }

    let url = "http://localhost:8080/api/deleteCandidate/{id}" + candidateToDelete;

    fetch(url, deleteCaandidateRequest).then(data => refresh());


}

function refresh() {
    document.getElementById("candidatesContainer").innerHTML = "";
    fetchCandidates();
}
