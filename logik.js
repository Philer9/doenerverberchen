const personen = ["Person 1", "Person 2", "Person 3", "Person 4", "Person 5"];
let verbrechen_liste = [];

// HIER NUR DEN STRING NACH DEM ? EINTRAGEN
const sasToken = "sv=2024-11-04&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2026-03-14T05:52:01Z&st=2026-03-06T21:37:01Z&spr=https&sig=4sfn1%2BHA0I%2BqEDjjO259Z1%2BFR5kIG%2FwoL0bUmNYMATg%3D";

window.onload = async function() {
    console.log("Starte System...");
    try {
        const resp = await fetch('verbrechen.json');
        if (!resp.ok) throw new Error("verbrechen.json konnte nicht geladen werden");
        verbrechen_liste = await resp.json();
        
        // Erst synchronisieren
        await syncFromAzure();
        
        // Dann UI rendern
        renderTable();
        calculateAllScores();
        renderPhotoSlideshow();
        
        console.log("System bereit. Verbrechen geladen:", verbrechen_liste.length);
    } catch (err) {
        console.error("Initialisierungsfehler:", err);
    }
    setInterval(syncFromAzure, 60000);
};

async function saveToAzure() {
    console.log("Speichere in Azure...");
    let data = { 
        last_updated: new Date().toISOString(), 
        scores: {} 
    };
    
    for (let pIdx = 0; pIdx < personen.length; pIdx++) {
        data.scores[`p_${pIdx}`] = {};
        for (let vIdx = 0; vIdx < verbrechen_liste.length; vIdx++) {
            const id = `cb_${vIdx}_${pIdx}`;
            data.scores[`p_${pIdx}`][`v_${vIdx}`] = localStorage.getItem(id) === "true";
        }
    }

    const azureUrl = "https://stdoenerverbrechen.blob.core.windows.net/beweise/scores.json?" + sasToken;
    
    try {
        const response = await fetch(azureUrl, {
            method: 'PUT',
            headers: { 
                'x-ms-blob-type': 'BlockBlob', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        });
        if(response.ok) console.log("Cloud-Backup erfolgreich!");
        else console.error("Cloud-Speicherung fehlgeschlagen:", response.status);
    } catch (err) {
        console.error("Cloud-Speicherfehler:", err);
    }
}

async function syncFromAzure() {
    const azureUrl = "https://stdoenerverbrechen.blob.core.windows.net/beweise/scores.json?" + sasToken;
    try {
        const response = await fetch(azureUrl);
        if (!response.ok) {
            console.warn("Cloud-Datei nicht gefunden oder Zugriff verweigert. Nutze lokale Daten.");
            return;
        }
        const data = await response.json();
        
        if (data && data.scores) {
            Object.keys(data.scores).forEach(pKey => {
                const pIdx = pKey.split('_')[1];
                Object.keys(data.scores[pKey]).forEach(vKey => {
                    const vIdx = vKey.split('_')[1];
                    localStorage.setItem(`cb_${vIdx}_${pIdx}`, data.scores[pKey][vKey]);
                });
            });
            console.log("Sync abgeschlossen.");
        }
    } catch (e) {
        console.error("Synchronisation fehlgeschlagen:", e);
    }
}

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
    if(cb) {
        localStorage.setItem(id, cb.checked);
        calculateAllScores();
        saveToAzure();
    }
}

function calculateAllScores() {
    console.log("Berechne Scores...");
    const statsElem = document.getElementById('stats');
    const totalElem = document.getElementById('group-total');
    
    // Falls die Elemente auf dieser Seite nicht existieren, brich hier ab.
    if (!statsElem) return;

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
    statsElem.innerHTML = html;
    if(totalElem) totalElem.innerText = gruppenSchande;
}

function renderPhotoSlideshow() {
    const left = document.getElementById('slider-left');
    const right = document.getElementById('slider-right');
    if(!left || !right) return;

    let allPhotos = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('pfp_') || key.startsWith('evidence_'))) {
            allPhotos.push(localStorage.getItem(key));
        }
    }

    if (allPhotos.length === 0) {
        const placeholder = "<div style='font-size:10px; border:1px dashed gray; padding:10px;'>Noch keine Beweise...</div>";
        left.innerHTML = placeholder;
        right.innerHTML = placeholder;
        return;
    }

    left.innerHTML = "";
    right.innerHTML = "";
    allPhotos.forEach((src, index) => {
        const imgHTML = `<div style="border: 2px solid #800000; margin-bottom:10px;"><img src="${src}" style="width:100%;"></div>`;
        if (index % 2 === 0) left.innerHTML += imgHTML;
        else right.innerHTML += imgHTML;
    });
}