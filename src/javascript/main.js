/* Variabler för existerande HTML-element */
const mainElement = document.getElementById("innehåll")
const searchBoxElement = document.getElementById("sökruta")

/* Åkallar uppstartsfunktion */
window.onload = (startUp);

/*Uppstartsfunktion */
function startUp() {

    getData();
    checkData();

}

/* Hämta data */

async function getData() {
    const response = await fetch("https://dahlgren.miun.se/ramschema_ht23.php?format=json");
    if (response.ok) {
        const data = await response.json();
        return data;
    }
}

/* Skriv ut data i dokumentet */
async function checkData() {
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