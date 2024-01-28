/* Variabler för existerande HTML-element */
const mainElement = document.getElementById("innehåll");
const searchBoxElement = document.getElementById("sökruta");
const searchButtonElement = document.getElementById("sök");

/* Eventlyssnare */
searchBoxElement.addEventListener("input", function () { writeData(); }, false);

/* Global variabel för sortering */
let sortingCriteria = 0;

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

/* Sortera data */
async function sortData(incomingQuery) {
    const data = await getData();
    let sortedData = data;
    switch (incomingQuery) {
        case 1:
            sortedData = data.sort((a, b) => (a.code < b.code) ? 1 : -1);
            return sortedData;
        case 2:
            sortedData = data.sort((a, b) => (a.coursename < b.coursename) ? 1 : -1);
            return sortedData;
        case 3:
            sortedData = data.sort((a, b) => (a.progression < b.progression) ? 1 : -1);
            return sortedData;

        default:
            return data;
    }
}

/* Skriv ut data i dokumentet */
async function writeData(incomingData) {
    /* Tar bort gamla element i table */
    mainElement.replaceChildren();

    /* Element för navigation av tabellen */
    let headTrElement = document.createElement("tr");
    mainElement.appendChild(headTrElement);

    let courseCodeElement = document.createElement("th");
    let courseCodeText = document.createTextNode("Kurskod:");
    courseCodeElement.appendChild(courseCodeText);
    courseCodeElement.id = "kurskod";
    courseCodeElement.addEventListener("click", function () { sortingCriteria = 1; writeData(); }, false);
    headTrElement.appendChild(courseCodeElement);

    let nameElement = document.createElement("th");
    let nameText = document.createTextNode("Namn:");
    nameElement.appendChild(nameText);
    nameElement.id = "namn";
    nameElement.addEventListener("click", function () { sortingCriteria = 2; writeData(); }, false);
    headTrElement.appendChild(nameElement);

    let progressionElement = document.createElement("th");
    let progressionText = document.createTextNode("Progression:");
    progressionElement.appendChild(progressionText);
    progressionElement.id = "progression";
    progressionElement.addEventListener("click", function () { sortingCriteria = 3; writeData(); }, false);
    headTrElement.appendChild(progressionElement);

    /*Hämta data från sortData */
    let data = await sortData(sortingCriteria);

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