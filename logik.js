const personen = ["Person 1", "Person 2", "Person 3", "Person 4", "Person 5"];
let verbrechen_liste = []; // Wird durch fetch gefüllt

window.onload = function() {
    // Lade die JSON-Daten
    fetch('verbrechen.json')
        .then(response => response.json())
        .then(data => {
            verbrechen_liste = data;
            renderTable();
            calculateAllScores();
        })
        .catch(err => {
            console.error("Fehler beim Laden der JSON:", err);
            document.getElementById('stats').innerHTML = "<b style='color:red;'>JSON-Ladefehler! Live-Server aktiv?</b>";
        });
};

function renderTable() {
    const table = document.getElementById('crime-table');
    if (!table) return;

    // Tabellenkopf anpassen für die Punkte-Spalte
    table.innerHTML = `
        <tr bgcolor="#D2B48C">
            <th>VERBRECHEN</th>
            <th>PKT</th>
            <th>P1</th><th>P2</th><th>P3</th><th>P4</th><th>P5</th>
            <th>INFO</th>
        </tr>
    `;

    verbrechen_liste.forEach((item, index) => {
        const row = table.insertRow(-1);
        let checkBoxes = "";
        
        // Die 5 Personen-Checkboxes
        personen.forEach((p, pIdx) => {
            const id = `cb_${index}_${pIdx}`;
            const checked = localStorage.getItem(id) === "true" ? "checked" : "";
            checkBoxes += `<td align="center" bgcolor="${pIdx % 2 === 0 ? '#FFFFFF' : '#F0F0F0'}">
                            <input type="checkbox" id="${id}" ${checked} onclick="updateScore('${id}')">
                          </td>`;
        });

        // Die Zeile mit Name, Punkten, Checkboxen und Info-Link
        row.innerHTML = `
            <td><font face="Arial" size="2"><b>${item[0]}</b></font></td>
            <td align="center"><b><font color="red">${item[1]}</font></b></td>
            ${checkBoxes}
            <td align="center"><a href="rezept.html?name=${encodeURIComponent(item[0])}&text=${encodeURIComponent(item[2])}&lvl=${item[1]}">
                <img src="https://web.archive.org/web/20090830051253/http://geocities.com/SiliconValley/6549/info.gif" border="0" width="20">
            </a></td>
        `;
    });
}
function updateScore(id) {
    const cb = document.getElementById(id);
    localStorage.setItem(id, cb.checked);
    calculateAllScores();
}

function calculateAllScores() {
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
        
        // Der Score startet bei 100 und kann jetzt UNENDLICH weit ins Negative gehen
        let score = 100 - penalty; 
        
        // Neue, aggressivere Status-Stufen für den 2000er Vibe
        let status = "";
        let color = "green";

        if (score > 80) { status = "👼 Unschulds-Lamm"; color = "green"; }
        else if (score > 50) { status = "🥴 Mitläufer"; color = "orange"; }
        else if (score > 0) { status = "👺 Sünden-Sammler"; color = "#FF4500"; }
        else if (score > -50) { status = "💀 Kulinarischer Untoter"; color = "red"; }
        else { status = "☣️ BIOLOGISCHE WAFFE"; color = "purple"; } // Für die ganz Harten
        
        html += `<td align="center" width="20%" bgcolor="${score < 0 ? '#FFCCCC' : '#FFFFFF'}">
                    <b><font face="Arial">${p}</font></b><br>
                    <font size="6" color="${color}"><b>${score}</b></font><br>
                    <font size="1"><i>${status}</i></font>
                 </td>`;
    });
    
    html += "</tr></table>";
    document.getElementById('stats').innerHTML = html;
    document.getElementById('group-total').innerText = gruppenSchande;
}

function generateCrime() {
    // Basis-Zutaten aus deinem Küchen-Bestand
    const zutatenPool = [
        "Mehl", "Öl", "Wasser", "Bier", 
        "Zwiebel", "Käse"
    ];

    const styles = [
        { name: "Eis am Stiel", prep: "In Förmchen füllen, mit Stiel versehen und 4 Stunden im Gefrierfach des Wohnmobils vergessen." },
        { name: "Schicht-Auflauf", prep: "In eine Aluschale schichten, mit Käse überhäufen und auf dem Grill backen, bis die Kruste schwarz wird." },
        { name: "Praline", prep: "In kleine Kugeln rollen, in Dönerfett wenden und kalt servieren. Ein Häppchen des Grauens." },
        { name: "Energy-Drink", prep: "Im Mixer pürieren, mit warmem Red Bull aufgießen und auf Ex trinken." },
        { name: "Hefezopf", prep: "In Fertig-Teig einwickeln, flechten und so lange grillen, bis der Teig außen verkohlt und innen roh ist." }
    ];

    // Zufällige Auswahl
    const zutat = zutatenPool[Math.floor(Math.random() * zutatenPool.length)];
    const style = styles[Math.floor(Math.random() * styles.length)];
    
    const name = "Döner-" + zutat + "-" + style.name;
    const recipeZutaten = "Dönerfleisch, " + zutat + ", " + (Math.random() > 0.5 ? "etwas Käse" : "frische Chillis");
    const anleitung = style.prep;

    // Anzeige im Dashboard
    const resultDiv = document.getElementById('crime-result');
    resultDiv.innerHTML = `
        <div style="background:#fff; border:2px solid red; padding:10px; margin-top:10px; text-align:left;">
            <b style="color:red; font-size:1.2em;">${name}</b><br>
            <small><b>Zutaten:</b> ${recipeZutaten}</small><br>
            <small><b>Zubereitung:</b> ${anleitung}</small><br>
            <button onclick="window.location.href='rezept.html?name=${encodeURIComponent(name)}&text=${encodeURIComponent(recipeZutaten + ' | ' + anleitung)}&lvl=10'" 
                    style="margin-top:5px; font-size:10px;">REZEPT-ANSICHT ÖFFNEN</button>
        </div>
    `;
}