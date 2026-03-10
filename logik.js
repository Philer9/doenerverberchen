const personen = ["Person 1", "Person 2", "Person 3", "Person 4", "Person 5"];
let verbrechen_liste = [];
const brot = ["Fladenbrot (labberig)", "Vollkorn-Fladen (warum?)", "Dürum-Fladen", "Brot-Endstück"];
const fleisch = ["Kalb (Hackfleisch-Art)", "Hähnchen (knorpelig)", "Veggie-Saitan", "Fleisch-Ersatz (unidentifizierbar)"];
const sauce = ["Knoblauch (Extrem)", "Kräuter (Standard)", "Scharf (Tränen-Garantie)", "Cocktail-Sauce (Sünde)"];
const extras = ["Zwiebeln (roh)", "Rotkohl", "Eisbergsalat", "Tomate/Gurke (wässrig)", "Schafskäse-Ersatz", "Mais (warum auch immer)"];

// HIER NUR DEN STRING NACH DEM ? EINTRAGEN
const sasToken = "___SAS_TOKEN_PLACEHOLDER___";
const ssbSurvivalTips = [
    "Dönerpapier als wasserfeste Socken nutzen (hält bis zu 3 Pfützen).",
    "Gaffa-Tape ist die einzige gültige Währung auf der Halbinsel Pouch.",
    "Zelt weg? Einfach im Döner-Karton schlafen (Isolierung inklusive).",
    "Knoblauchfahne als 2-Meter-Abstands-Garantie im Moshpit.",
    "Bierdosen-Stapeln als Blitzableiter nutzen (Physik-Level: Festival).",
    "Ein leeres Döner-Fladenbrot als stylische Mütze gegen Sonnenbrand.",
    "Döner mit ALLEM (auch scharf) ersetzt nachts die Wärmflasche.",
    "Alufolie vom Döner als Signalspiegel nutzen, wenn man die Freunde verloren hat.",
    "Das SSB-Bändchen niemals abnehmen, bis es eine eigene Postleitzahl hat.",
    "Gummistiefel mit Bier füllen, um den Schwerpunkt beim Tanzen zu senken.",
    "Zwiebeln vom Döner unter die Achseln klemmen (natürliches Festival-Deo).",
    "Campingstühle mit Gaffa an den Boden kleben (Diebstahlschutz 2.0).",
    "Dosenbier als Hantel nutzen: 0,5 Liter = 0,5 Kilo Sport.",
    "Ein Bad im See ersetzt die Dusche, die Wäsche und die Würde.",
    "Das Zelt mit Alufolie auskleiden, um Alien-Signale und Hitze zu blocken.",
    "Sich als 'Walking Döner' verkleiden, um Gratis-Getränke zu erschleichen.",
    "Dreck unter den Fingernägeln als 'Festival-Patina' bezeichnen.",
    "Die Luftmatratze mit dem Mund aufblasen (gutes Cardio, danach Ohnmacht).",
    "Döner-Saucen-Flecken auf dem Shirt als 'Vintage-Camouflage' tarnen.",
    "Den Grill mit Deodorant-Spray zünden (Warnung: Nur für Profi-Pfuscher).",
    "Mit dem Schlauchboot zum Dixi-Klo paddeln, wenn es wieder regnet.",
    "Dönerbox als Lautsprecher-Verstärker für das Handy nutzen.",
    "Die Sonnenbrille mit Ketchup putzen (für den rosaroten Blick).",
    "Sich beim Pogo-Tanzen als 'menschlicher Kreisel' identifizieren.",
    "Bier-Yoga: Jede Position muss einhändig gehalten werden.",
    "Den Personalausweis durch eine halb gegessene Currywurst ersetzen.",
    "Powerbank mit Zitronensaft laden (geht nicht, riecht aber frisch).",
    "Schlafen im Stehen trainieren (spart Platz im Zelt).",
    "Den Müllsack als Ballkleid tragen (Recycling-Chic).",
    "Zwiebelringe als Freundschaftsringe verteilen.",
    "Döner ohne Fleisch bestellen, um das Universum zu verwirren.",
    "Döner-Servietten als Notizbuch für Festival-Bekanntschaften.",
    "Gaffa-Tape als Augenklappe (Piraten-Motto ist immer aktuell).",
    "Sich als 'Pfand-Phantom' verkleiden und unauffällig Dosen sammeln.",
    "Die Isomatte als Schutzschild gegen fliegende Becher nutzen.",
    "Zeltnachbarn mit 'Atemlos' in der 10-Stunden-Version wecken.",
    "Dönerbox-Hüte als Erkennungsmerkmal für die Gang.",
    "Ein Bad in Konfetti ersetzt die tägliche Hygiene.",
    "Bierdosen-Telefon zum Nachbarzelt bauen.",
    "Sich als 'König von Pouch' krönen (Krone aus Alufolie).",
    "Döner mit Pudding-Füllung (Das ultimative Kriegsverbrechen).",
    "Gaffa-Handschuhe für mehr Grip am Bierbecher.",
    "Sich mit Ketchup schminken (Kriegsbemalung für den Moshpit).",
    "Einfach mal laut 'HELGA!' rufen (Tradition verpflichtet).",
    "Kaltes Pizzastück als Mousepad verwenden.",
    "Bierflaschen als Slalom-Parcours für betrunkene Freunde aufbauen.",
    "Döner-Servietten als Toilettenpapier-Reserve (Notfall-Stufe Rot).",
    "Sich mit Grillsauce tätowieren (hält bis zum nächsten Regenguss).",
    "Den Zelt-Reißverschluss mit Seife einschmieren, wenn er klemmt.",
    "Dönerfleisch-Reste als Währung für Streicheleinheiten bei Campingplatz-Hunden.",
    "Ein leeres Fass als Regentonne oder Whirlpool nutzen.",
    "Den Bass im Magen als kostenlose Massage genießen.",
    "Sich mit Knoblauchsauce einreiben, um Vampire (und Menschen) fernzuhalten.",
    "Pfefferminzlikör als Mundwasser-Ersatz verwenden.",
    "Zelt-Heringe im Dunkeln mit Leuchtstäben markieren (Stolperfalle ade).",
    "Döner-Fladenbrot als Frisbee benutzen (nur im Notfall essen).",
    "Den Schlafsack mit Zeitungspapier ausstopfen für Extra-Wärme.",
    "Gaffa-Tape-Gürtel basteln, wenn die Hose nach 3 Tagen rutscht.",
    "Sich als Baum verkleiden, um im Infield ungestört zu schlafen.",
    "Döner-Gutscheine gegen Dusch-Marken tauschen.",
    "Ketchup und Senf als Fingerfarben für Zelt-Graffiti.",
    "Ein Handtuch ist das wichtigste Werkzeug im Universum (und auf Pouch).",
    "Die Kühlbox als Tresor für das letzte saubere T-Shirt nutzen.",
    "Sich mit Alufolie einwickeln, um als Grillkartoffel durchzugehen.",
    "Den Pfand-Bon wie einen Lottogewinn bewachen.",
    "Döner-Reste im Bart als eiserne Reserve für das Frühstück.",
    "Mit dem Löffel ein Loch graben, um das Bier im Boden zu kühlen.",
    "Sich gegenseitig mit Wasserpistolen 'duschen'.",
    "Den Sonnenaufgang mit einem lauten 'MAMPF' begrüßen.",
    "Gaffa-Tape-Schuhe über die Sneaker kleben gegen den Schlamm.",
    "Ein einsames Söckchen als Bierkühler (nass machen!) verwenden.",
    "Döner-Verkäufer mit 'Chef' ansprechen für 10% mehr Fleisch.",
    "Den Moshpit als Waschmaschine für das Shirt nutzen.",
    "Sich aus Pappkartons eine Ritterrüstung bauen.",
    "Den Zeltnachbarn nach 'Wlan-Kabel' fragen.",
    "Ein Gaffa-Lasso bauen, um herumfliegende Hüte zu fangen.",
    "Döner-Saucen-Mischen als chemisches Experiment deklarieren.",
    "Sich mit Mehl bestäuben, um als Bäcker-Lehrling durchzugehen.",
    "Die Luftmatratze als Boot für die nächste Flut nutzen.",
    "Döner-Papier-Flugzeuge mit Liebesbotschaften falten.",
    "Sich mit Senf einreiben, um nachts besser gesehen zu werden.",
    "Den Grill als Heizung benutzen (nur draußen, du Genie!).",
    "Bierdeckel als Visitenkarten verteilen.",
    "Ein leeres Döner-Fladenbrot als Handtasche nutzen.",
    "Sich als Security verkleiden (funktioniert nie, ist aber lustig).",
    "Dönerfleisch nach dem Alphabet sortieren.",
    "Den Schlamm als natürliche Gesichtsmaske (Wellness) verkaufen.",
    "Gaffa-Tape als Pflaster-Ersatz (Vorsicht beim Abziehen!).",
    "Sich mit Mayo die Haare stylen (Halt: 100%, Geruch: naja).",
    "Den Campingstuhl als Thron auf einen Bierkasten-Berg stellen.",
    "Döner mit Pommes drin ist eine vollwertige Mahlzeit-Inception.",
    "Sich aus Müllsäcken einen Superhelden-Umhang basteln.",
    "Den Festival-Plan als Fächer gegen die Hitze nutzen.",
    "Brot-Endstücke als Ohrenschützer gegen Schnarcher.",
    "Sich mit Curry-Pulver einreiben für den 'Goldenen Vibe'.",
    "Ein Gaffa-Kreuz auf das Zelt kleben, damit man es wiederfindet.",
    "Dönerboxen stapeln, um die Sicht auf die Bühne zu verbessern.",
    "Den Kater mit noch mehr Döner bekämpfen (Konter-Döner).",
    "Sich im Kreis drehen, bis der Schwindel den Bass besiegt.",
    "Den letzten Döner des Festivals wie eine Reliquie behandeln."
];
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
        rotateSurvivalTip();
        
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

async function updateScore(id) {
    const cb = document.getElementById(id);
    if(!cb) return;

    // 1. Prüfen, ob wir in dieser Sitzung schon freigeschaltet sind
    let isAdmin = sessionStorage.getItem('isDönerAdmin') === 'true';

    // 2. Falls nicht, einmalig Passwort abfragen
    if (!isAdmin) {
        const passwort = prompt("Admin-Passwort erforderlich, um Schande zu loggen:");
        // Wir nutzen den Hash-Check aus deiner profil.html Logik
        const hash = await getHash(passwort?.toLowerCase().trim() || "");
        
        // Hier eines deiner Passwörter prüfen (z.B. das von Person 1)
        if (hash === "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08") {
            sessionStorage.setItem('isDönerAdmin', 'true');
            isAdmin = true;
        } else {
            alert("ZUGRIFF VERWEIGERT! Der Spieß dreht sich weiter...");
            cb.checked = !cb.checked; // Haken visuell zurücksetzen
            return;
        }
    }

    // 3. Wenn autorisiert, ganz normal speichern
    if(isAdmin) {
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
function generateCrime() {
    const b = brot[Math.floor(Math.random() * brot.length)];
    const f = fleisch[Math.floor(Math.random() * fleisch.length)];
    const s = sauce[Math.floor(Math.random() * sauce.length)];
    const e1 = extras[Math.floor(Math.random() * extras.length)];
    const e2 = extras[Math.floor(Math.random() * extras.length)];

    const crime = `${b} mit ${f}, ${s}-Sauce und extra ${e1} + ${e2}!`;
    
    // Ergebnis anzeigen
    document.getElementById('crime-result').innerHTML = "NEUE SÜNDE: <br>" + crime;
    
    // Ein bisschen Bewegung für den Trash-Faktor
    document.getElementById('crime-result').style.color = (Math.random() > 0.5) ? 'red' : 'blue';
}
function rotateSurvivalTip() {
    const tipElement = document.getElementById('ssb-tip-text');
    if (tipElement && typeof ssbSurvivalTips !== 'undefined') {
        const randomTip = ssbSurvivalTips[Math.floor(Math.random() * ssbSurvivalTips.length)];
        
        // Schriftgröße anpassen: Je länger der Text, desto kleiner die Schrift
        if (randomTip.length > 80) {
            tipElement.style.fontSize = "13px";
        } else if (randomTip.length > 50) {
            tipElement.style.fontSize = "15px";
        } else {
            tipElement.style.fontSize = "18px";
        }
        
        tipElement.innerHTML = randomTip;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    setInterval(rotateSurvivalTip, 50000);
    setInterval(updateScamAd, 50000);
    rotateSurvivalTip();
    updateScamAd();
})
const rouletteSites = [
    "https://theuselessweb.com/",
    "https://www.pointerpointer.com/",
    "https://www.staggeringbeauty.com/",
    "http://www.rrrgggbbb.com/",
    "http://burymewithmymoney.com/",
    "https://smashthewalls.com/",
    "https://puginarug.com/",
    "https://www.sputnik.de", // Dein Festival-Bezug
    "https://www.openstreetmap.org/#map=19/51.61486/12.44682" // Koordinaten der Halbinsel Pouch
];
function triggerTripleChaos() {
    // 1. Eine zufällige Website aus deiner Roulette-Liste
    const randomSite = rouletteSites[Math.floor(Math.random() * rouletteSites.length)];
    
    // Das Chaos entfesseln
    window.open(randomSite, '_blank', 'width=800,height=600');
}
const scamIdeas = [
    { text: "Verkaufe Dattel-Chutney als Luxus-Benzin!", search: "Dattel Chutney Brennwert" },
    { text: "Dönerfleisch als Dämmmaterial exportieren!", search: "Dönerfleisch Wärmeleitfähigkeit" },
    { text: "Verkaufe Gaffa-Tape als Designer-Gürtel!", search: "Balenciaga Gaffa Tape Preis" },
    { text: "Symptome einer Knoblauchvergiftung als Wellness-Trend!", search: "Knoblauch Detox Kur" },
    { text: "Döner-Saucen-Flecken als moderne Kunst verkaufen!", search: "NFT Döner Sauce Art" },
    { text: "Leere Bierdosen als Blitzableiter vermieten!", search: "Bierdosenturm Statik" },
    { text: "Döner-Fladenbrot als ökologische Mütze patentieren!", search: "Brothut Mode Trend" },
    { text: "Knoblauchfahne als 2-Meter-Abstands-Service!", search: "Social Distancing Knoblauch" }
];

function updateScamAd() {
    const adLink = document.getElementById('scam-ad-link');
    const adText = document.getElementById('scam-text');
    
    if (adLink && adText) {
        // Zufällige Idee wählen
        const randomScam = scamIdeas[Math.floor(Math.random() * scamIdeas.length)];
        
        // Text in der Anzeige ändern
        adText.innerText = randomScam.text;
        
        // Den Google-Link dynamisch anpassen
        const googleUrl = "https://www.google.com/search?q=" + encodeURIComponent(randomScam.search);
        adLink.href = googleUrl;
    }
}

// Beim Laden der Seite einmal ausführen
document.addEventListener('DOMContentLoaded', updateScamAd);