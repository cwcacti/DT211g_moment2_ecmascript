/* Variabler för existerande HTML-element */
const mainElement = document.getElementById("innehåll");
const searchBoxElement = document.getElementById("sökruta");
const searchButtonElement = document.getElementById("sök");

/* Eventlyssnare */
searchButtonElement.addEventListener("click", function () { writeData(); }, false);

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

/* Sortering */
async function sortData(incomingQuery) {
    console.log("Sorterar" + incomingQuery);
}

/* Skriv ut data i dokumentet */
async function writeData() {
    /* Tar bort gamla element i table */
    mainElement.replaceChildren();

    /* Element för navigation av tabellen */
    let headTrElement = document.createElement("tr");
    mainElement.appendChild(headTrElement);

    let courseCodeElement = document.createElement("th");
    let courseCodeText = document.createTextNode("Kurskod:");
    courseCodeElement.appendChild(courseCodeText);
    courseCodeElement.id = "kurskod";
    courseCodeElement.addEventListener("click", function () { sortData(1) }, false);
    headTrElement.appendChild(courseCodeElement);

    let nameElement = document.createElement("th");
    let nameText = document.createTextNode("Namn:");
    nameElement.appendChild(nameText);
    nameElement.id = "namn";
    nameElement.addEventListener("click", function () { sortData(2) }, false);
    headTrElement.appendChild(nameElement);

    let progressionElement = document.createElement("th");
    let progressionText = document.createTextNode("Progression:");
    progressionElement.appendChild(progressionText);
    progressionElement.id = "progression";
    progressionElement.addEventListener("click", function () { sortData(3) }, false);
headTrElement.appendChild(progressionElement);

    /* Hämta data från getData */
    let data = await getData();

    /* Skapa element för varje objekt */
    for (const object of data) {

        /* Sökbarhet */
        let searchFilter = searchBoxElement.value;
        if (object.code.includes(searchFilter) || object.coursename.includes(searchFilter) || object.progression.includes(searchFilter)) {

            /*Skapa element fortsättning */
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