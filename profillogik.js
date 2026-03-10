// Konfiguration
const params = new URLSearchParams(window.location.search);
const pIdx = parseInt(params.get('id') || "0");
const personenNamen = ["Person 1", "Person 2", "Person 3", "Person 4", "Person 5"];
const passwordHashes = {
    0: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", // test
    1: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", // test
    2: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", // test
    3: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", // test
    4: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"  // test
};

// Name setzen
document.getElementById('user-name').innerText = "Akte: " + personenNamen[pIdx];

// Hilfsfunktion für Passwort
async function getHash(str) {
    const msgUint8 = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
async function checkAccess() {
    // Prüfen, ob für dieses spezifische Profil (pIdx) in dieser Sitzung schon ein Login vorliegt
    const sessionKey = `auth_profile_${pIdx}`;
    if (sessionStorage.getItem(sessionKey) === 'true') {
        return true;
    }

    const input = prompt(`Geheimwort für die Akte von ${personenNamen[pIdx]}:`);
    if (!input) return false;

    const inputHash = await getHash(input.toLowerCase().trim());
    
    // Abgleich mit deinem vorhandenen passwordHashes-Objekt
    if (inputHash === passwordHashes[pIdx]) {
        // Login für diese Session und dieses Profil merken
        sessionStorage.setItem(sessionKey, 'true');
        return true;
    }
    
    alert("ZUGRIFF VERWEIGERT!");
    return false;
}
// Initiales Laden
// Initialisierung beim Laden der Seite
window.onload = async function() {
    console.log("Starte Profil-Ladeprozess für pIdx:", pIdx);
    
    // 1. Grundlegende UI-Elemente vorbereiten
    const listContainer = document.getElementById('user-crimes');
    if (listContainer) listContainer.innerHTML = "<li>Lade Akte...</li>";

    try {
        // 2. Daten parallel oder nacheinander laden
        const cloudData = await loadCloudData();
        const verbrechenListe = await loadVerbrechenDefinitions();

        // 3. UI mit den Daten füllen
        displayBio(cloudData.bios);
        displayUserCrimes(cloudData.scores, verbrechenListe, listContainer);
        displayProfileImage();

    } catch (error) {
        console.error("KRITISCHER FEHLER beim Laden des Profils:", error);
        if (listContainer) {
            listContainer.innerHTML = "<li><font color='red'>Fehler beim Laden der Daten!</font></li>";
        }
    }
};

// --- Ausgelagerte Funktionen ---

async function loadCloudData() {
    const url = `https://stdoenerverbrechen.blob.core.windows.net/beweise/scores.json?${sasToken}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Cloud-Scores konnten nicht geladen werden");
    return await res.json();
}

async function loadVerbrechenDefinitions() {
    const res = await fetch('verbrechen.json');
    if (!res.ok) throw new Error("Verbrechen-Definitionen fehlen");
    return await res.json();
}

function displayBio(bios) {
    const bioInput = document.getElementById('bio-input');
    if (bioInput && bios && bios[pIdx]) {
        bioInput.value = bios[pIdx];
    }
}

function displayProfileImage() {
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        // Cache-Buster (Zeitstempel) verhindert das Laden alter Bilder aus dem Browser-Cache
        profileImg.src = `https://stdoenerverbrechen.blob.core.windows.net/beweise/pfp_${pIdx}.jpg?${sasToken}&t=${Date.now()}`;
    }
}

function displayUserCrimes(scores, definitions, container) {
    if (!container) return;
    container.innerHTML = ""; // Container leeren

    const personKey = `p_${pIdx}`;
    const personScores = scores ? scores[personKey] : null;

    if (!personScores) {
        container.innerHTML = "<li><i>Keine aktiven Verbrechen in der Akte gefunden.</i></li>";
        return;
    }

    definitions.forEach((item, vIdx) => {
        const verbrechenKey = `v_${vIdx}`;
        
        // Prüfung auf echtes boolean true
        if (personScores[verbrechenKey] === true) {
            const li = createCrimeElement(item, vIdx);
            container.appendChild(li);
        }
    });

    if (container.innerHTML === "") {
        container.innerHTML = "<li><i>Keine aktiven Verbrechen gefunden.</i></li>";
    }
}

function createCrimeElement(item, vIdx) {
    const li = document.createElement('li');
    li.className = "crime-item";
    
    const evidenceUrl = `https://stdoenerverbrechen.blob.core.windows.net/beweise/evidence_${pIdx}_${vIdx}.jpg?${sasToken}&t=${Date.now()}`;
    
    li.innerHTML = `
        <b>${item[0]}</b> (${item[1]} Pkt)<br>
        <div style="margin-top:8px;">
            <img src="${evidenceUrl}" onerror="this.style.display='none'" style="max-width:100%; border-radius:4px; margin-bottom:5px;">
            <br>
            <label class="upload-label">
                📸 Beweis-Foto hochladen
                <input type="file" accept="image/*" capture="camera" onchange="uploadEvidence(this, ${vIdx})" style="display: none;">
            </label>
        </div>
    `;
    return li;
}
async function uploadEvidence(input, vIdx) {
    const file = input.files[0];
    if (!file) return;

    // Optional: Passwort-Abfrage vor dem Upload
    const hatZugriff = await checkAccess();
    if (!hatZugriff) return;

    // Der Dateiname folgt dem Schema: evidence_PERSONID_VERBRECHENID.jpg
    const blobName = `evidence_${pIdx}_${vIdx}.jpg`;
    const azureUrl = `https://stdoenerverbrechen.blob.core.windows.net/beweise/${blobName}?${sasToken}`;

    console.log("Starte Upload für Verbrechen " + vIdx + "...");

    try {
        const response = await fetch(azureUrl, {
            method: 'PUT',
            headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': file.type
            },
            body: file
        });

        if (response.ok) {
            alert("Beweismittel erfolgreich in der Cloud gesichert!");
            // Seite neu laden, damit das neue Bild erscheint (mit Cache-Buster)
            window.location.reload(); 
        } else {
            alert("Upload fehlgeschlagen. Status: " + response.status);
            console.error("Azure Fehler-Details:", await response.text());
        }
    } catch (err) {
        console.error("Netzwerkfehler beim Foto-Upload:", err);
        alert("Fehler beim Hochladen des Beweises.");
    }
}
async function uploadPFP(input) {
    const file = input.files[0];
    if (!file) return;

    // Passwort-Abfrage
    const hatZugriff = await checkAccess();
    if (!hatZugriff) return;

    // Dateiname ist fest: pfp_0.jpg, pfp_1.jpg etc.
    const blobName = `pfp_${pIdx}.jpg`;
    const azureUrl = `https://stdoenerverbrechen.blob.core.windows.net/beweise/${blobName}?${sasToken}`;

    try {
        const response = await fetch(azureUrl, {
            method: 'PUT',
            headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': file.type
            },
            body: file
        });

        if (response.ok) {
            alert("Profilbild wurde aktualisiert!");
            window.location.reload(); 
        } else {
            alert("Upload fehlgeschlagen: " + response.status);
        }
    } catch (err) {
        console.error("PFP Upload Fehler:", err);
    }
}
async function saveProfile() {
    const hatZugriff = await checkAccess();
    if (!hatZugriff) return;

    const neueBio = document.getElementById('bio-input').value;
    const azureUrl = `https://stdoenerverbrechen.blob.core.windows.net/beweise/scores.json?${sasToken}`;
    
    try {
        // 1. Aktuellen Stand der Cloud laden, um keine Scores zu löschen
        const response = await fetch(azureUrl);
        let data = { scores: {}, bios: {} };
        if (response.ok) {
            data = await response.json();
        }

        // 2. Nur den Bio-Eintrag für diese Person ändern
        if (!data.bios) data.bios = {};
        data.bios[pIdx] = neueBio;
        data.last_updated = new Date().toISOString();

        // 3. Das gesamte Paket zurück zu Azure schicken
        const uploadRes = await fetch(azureUrl, {
            method: 'PUT',
            headers: {
                'x-ms-blob-type': 'BlockBlob',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (uploadRes.ok) {
            alert("Biografie wurde in der Cloud gespeichert!");
        } else {
            throw new Error("Fehler beim Hochladen");
        }
    } catch (err) {
        console.error("Bio-Speicherfehler:", err);
        alert("Konnte Bio nicht speichern.");
    }
}
