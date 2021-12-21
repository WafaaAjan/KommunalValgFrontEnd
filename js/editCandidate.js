let candidate;

function fetchCandidate() {
    let url = "http://localhost:8080/api/getCandidate/";
    const id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    url = url + id;
    const prom = fetch(url).then(data => data.json());
    prom.then(json => {candidate = json; displayCandidate()});
}


function displayCandidate() {
    //kandidat info

    document.getElementById("firstName").value = candidate.firstName;
    document.getElementById("lastName").value = candidate.lastName;
    document.getElementById("cpr").value = candidate.cpr;
    document.getElementById("partyId").innerHTML = "partyId: " + getPartyId();

}
function saveCandidate() {
    candidate.firstName = document.getElementById("firstName").value;
    candidate.lastName = document.getElementById("lastName").value;


    const url = "http://localhost:8080/api/saveCandidate"

    let saveCandidateRequest = {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(candidate)
    }

    fetch(url, saveCandidateRequest).then(response => { if (!response.ok) throw new Error("Network error");
        return response.json(); }).
    then(data => displaySuccess()).catch(error => displayError());

}

function discardChanges() {
    displayCandidate();
}

function displaySuccess() {
    document.getElementById("result").innerText = "Success: tour has been saved";
    document.getElementById("result").style.display = "block";
}
