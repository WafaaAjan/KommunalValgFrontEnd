let body;
let postRequest = {
    method: "POST",
    headers: {
        "content-type": "application/json",
        'Accept': 'application/json'
    },
    body: body
}

let candidate;
function fetchCandidate() {
    const url = "http://localhost:8080/api/createCandidate";
    const prom = fetch(url).then(data => data.json());
    prom.then(json => {candidate = json; createCandidate(candidate)});
}

function createCandidate() {
    document.getElementById("createCandidate").style.display = "block";

}
function saveCandidate() {
    document.getElementById("createCandidate").style.display = "none";

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var cpr = document.getElementById("cpr").value;
    var save_user_input = confirm('Save user information');

    if (save_user_input == null) {
        alert("cancelled");
    } else {
        const data = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            cpr: cpr,

        })

        const xhr = new XMLHttpRequest()
        xhr.withCredentials = false

        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                console.log(this.responseText)
            }
        })

        xhr.open('POST', 'http://localhost:8080/api/createCandidate')
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.send(data)
        alert(save_user_input + " information saved!");
        refresh()
    }

}

function refresh() {
    document.getElementById("createCandidate").innerHTML = "";
}
