const personen = ["Person 1", "Person 2", "Person 3", "Person 4", "Person 5"];
let verbrechen_liste = [];

window.onload = function() {
    console.log("Seite geladen, starte Fetch...");
    fetch('verbrechen.json')
        .then(response => response.json())
        .then(data => {
            verbrechen_liste = data;
            console.log("JSON erfolgreich geladen:", verbrechen_liste.length, "Einträge");
            renderTable();
            calculateAllScores();
            renderPhotoSlideshow();
        })
        .catch(err => console.error("JSON Fehler:", err));
};

function renderTable() {
    const table = document.getElementById('crime-table');
    if (!table) return;
    table.innerHTML = `<tr bgcolor="#D2B48C"><th>GERICHT</th><th>PKT</th><th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P5</th><th>INFO</th></tr>`;

    verbrechen_liste.forEach((item, index) => {
        const row = table.insertRow(-1);
        let cbs = "";
        for(let pIdx=0; pIdx<5; pIdx++) {
            const id = `cb_${index}_${pIdx}`;
            const checked = localStorage.getItem(id) === "true" ? "checked" : "";
            cbs += `<td align="center"><input type="checkbox" id="${id}" ${checked} onclick="updateScore('${id}')"></td>`;
        }
        row.innerHTML = `<td><b>${item[0]}</b></td><td align="center"><b>${item[1]}</b></td>${cbs}<td align="center"><a href="rezept.html?name=${encodeURIComponent(item[0])}&text=${encodeURIComponent(item[2])}&lvl=${item[1]}">📖</a></td>`;
    });
}

function updateScore(id) {
    const cb = document.getElementById(id);
    localStorage.setItem(id, cb.checked);
    calculateAllScores();
}

function calculateAllScores() {
    console.log("Berechne Scores...");
    let html = "<table width='100%' border='1' cellpadding='5' style='background:white;'><tr>";
    let gruppenSchande = 0;

    personen.forEach((p, pIdx) => {
        let penalty = 0;
        verbrechen_liste.forEach((item, vIdx) => {
            if (localStorage.getItem(`cb_${vIdx}_${pIdx}`) === "true") {
                penalty += item[1];
            }
        });
        
        gruppenSchande += penalty;
        let score = 100 - penalty; 
        let color = score < 0 ? "red" : "green";
        
        // DER ENTSCHEIDENDE TEIL:
        html += `
            <td align="center" width="20%" bgcolor="${score < 0 ? '#FFCCCC' : '#FFFFFF'}" 
                style="cursor:pointer; border: 2px solid black;" 
                onclick="window.location.href='profil.html?id=${pIdx}'">
                <font face="Arial"><b>${p}</b></font><br>
                <font size="1" color="blue"><u>(Akte öffnen)</u></font><br>
                <font size="6" color="${color}"><b>${score}</b></font>
            </td>`;
    });
    
    html += "</tr></table>";
    document.getElementById('stats').innerHTML = html;
    document.getElementById('group-total').innerText = gruppenSchande;
}

function generateCrime() {
    const res = "Döner-" + Math.random().toString(36).substring(7); // Simpler Generator Fix
    document.getElementById('crime-result').innerText = res;
}
function renderPhotoSlideshow() {
    const left = document.getElementById('slider-left');
    const right = document.getElementById('slider-right');
    if(!left || !right) return;

    let allPhotos = [];

    // Alle Schlüssel im LocalStorage durchsuchen
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('pfp_') || key.startsWith('evidence_')) {
            allPhotos.push(localStorage.getItem(key));
        }
    }

    // Wenn keine Bilder da sind, Platzhalter anzeigen
    if (allPhotos.length === 0) {
        const placeholder = "<div style='font-size:10px; border:1px dashed gray; padding:10px;'>Noch keine Beweise gesichert...</div>";
        left.innerHTML = placeholder;
        right.innerHTML = placeholder;
        return;
    }

    // Bilder auf beide Seiten verteilen
    left.innerHTML = "";
    right.innerHTML = "";

    allPhotos.forEach((src, index) => {
        const imgHTML = `
            <div style="border: 2px solid #800000; background: white; padding: 2px; transform: rotate(${Math.random() * 6 - 3}deg);">
                <img src="${src}" style="width: 100%; display: block; filter: sepia(0.3);">
            </div>
        `;
        if (index % 2 === 0) {
            left.innerHTML += imgHTML;
        } else {
            right.innerHTML += imgHTML;
        }
    });
}

// In deinem window.onload am Ende ergänzen:
// fetch('verbrechen.json').then(...).then(() => {
//    renderTable();
//    calculateAllScores();
//    renderPhotoSlideshow(); // <-- HIER EINFÜGEN
// });