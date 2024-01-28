/* Variabler för existerande HTML-element */
const mainElement = document.getElementById("innehåll");
const searchBoxElement = document.getElementById("sökruta");

const courseCodeElement = document.getElementById("kurskod");
const nameElement = document.getElementById("namn");
const progressionElement = document.getElementById("progression");

/* Eventlyssnare */
searchBoxElement.addEventListener("keyup", function () { searchData(); }, false);

courseCodeElement.addEventListener("click", function () { filterData(1) }, false);
nameElement.addEventListener("click", function () { filterData(2) }, false);
progressionElement.addEventListener("click", function () { filterData(3) }, false);


/* Åkallar uppstartsfunktion */
window.onload = (startUp);

/*Uppstartsfunktion */
function startUp() {

    getData();
    writeData();

}

/* Hämta data */
async function getData() {
    const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php?format=json");
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}

/* Sökbarhet */
async function searchData() {

}

/* Sortering */
async function filterData(incomingQuery) {
    console.log("Filtrerar" + incomingQuery);
}

/* Skriv ut data i dokumentet */
async function writeData() {
    let data = await getData();
    for (const object of data) {

        let newTrElement = document.createElement("tr");
        mainElement.appendChild(newTrElement);

        let firstTdElement = document.createElement("td");
        let firstTdText = document.createTextNode(object.code);
        newTrElement.appendChild(firstTdElement);
        firstTdElement.appendChild(firstTdText);

        let secondTdElement = document.createElement("td");
        let secondTdText = document.createTextNode(object.coursename);
        newTrElement.appendChild(secondTdElement);
        secondTdElement.appendChild(secondTdText);

        let thirdTdElement = document.createElement("td");
        let thirdTdText = document.createTextNode(object.progression);
        newTrElement.appendChild(thirdTdElement);
        thirdTdElement.appendChild(thirdTdText);
    }
}





/* Gammal kod, om ifall jag behöver den igen

async function searchData() {
    let searchTerm = searchBoxElement.value;
    const incomingData = await getData();
    console.log(incomingData);
    let outgoingData = incomingData;
    let index = 0;

    for (const object of outgoingData) {
        if (object.code.includes(searchTerm)) {
            let index = index+1;
        } else if (object.coursename.includes(searchTerm)) {
            let index = index+1;
        } else if (object.progression.includes(searchTerm)) {
            let index = index+1;
        } else {
            outgoingData.splice(index, 1);
            console.log(index);
        }

        return outgoingData


    }
}

async function filterData(incomingQuery) {
    console.log("Filtrerar" + incomingQuery);
    let incomingData = await searchData();
    console.log(incomingData);
}

*/