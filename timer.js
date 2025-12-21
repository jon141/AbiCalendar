
function timeUntil(dateTime) {
    const now = new Date();
    const target = new Date(dateTime);
    let diff = target - now;
    let in_past = false;
    if (diff <= 0) {
        diff = now - target;
        in_past = true;}
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    return { days: days, hours: hours, minutes: minutes, seconds: seconds, past: in_past}
}


let termine = {
    "Latein": "2026-04-17T09:00:00",
    "Kunst": "2026-04-21T09:00:00",
    "Gemeinschaftskunde": "2026-04-21T09:00:00",
    "Geografie": "2026-04-21T09:00:00",
    "Geschichte": "2026-04-21T09:00:00",
    "Informatik": "2026-04-21T09:00:00",
    "Religion": "2026-04-21T09:00:00",
    "Sport": "2026-04-21T09:00:00",
    "Wirtschaft": "2026-04-21T09:00:00",
    "Biologie": "2026-04-22T09:00:00",
    "Physik": "2026-04-23T09:00:00",
    "Chemie": "2026-04-24T09:00:00",
    "Deutsch": "2026-04-28T09:00:00",
    "Englisch": "2026-04-30T09:00:00",
    "Mathe": "2026-05-06T09:00:00",
    "Französisch": "2026-05-08T09:00:00"

}

function updateTimer(selectId, spanId) {
    const lk = document.getElementById(selectId);
    let dateTime = termine[lk.value];
    const timeLeft = timeUntil(dateTime);
    let timerText = "";
    if (timeLeft.past === false) {
        timerText += "Noch ";
        if (timeLeft.days > 0) {
            let text = "";
            if (timeLeft.days === 1) {
                text = "ein Tag ";
            }
            else {
                text = timeLeft.days + " Tage ";}
            
            timerText += `<span style="color:#B00020">${text}</span> `;
        }
        if (timeLeft.hours > 0) {
            let text = "";
    
            if (timeLeft.hours === 1) {
                text = "eine Stunde ";
            }
            else {    
                text = timeLeft.hours + " Stunden ";}

            timerText += `<span style="color:#D32F2F">${text}</span> `;

        }
        if (timeLeft.minutes > 0) {
            let text = "";

            if (timeLeft.minutes === 1) {
                text = "eine Minute ";
            }
            else {
                text = timeLeft.minutes + " Minuten ";}
            timerText += `<span style="color:#E57373">${text}</span> `;
        }
        if (true) {
            let text = "";
            if (timeLeft.seconds === 1) {
                text = "eine Sekunde ";
            }
            else {
                text = timeLeft.seconds + " Sekunden ";}
            
            timerText += `<span style="color:#F4B6B6">${text}</span> `;}
    }
    else {
        timerText += "Begann vor " + timeLeft.days + 'd ' + timeLeft.hours + 'h ' + timeLeft.minutes + 'm ' + timeLeft.seconds + 's';}
    
    document.getElementById(spanId).innerHTML = timerText;


}

function updateCookies() {
    const lk1 = document.getElementById("selectLk1").value;
    const lk2 = document.getElementById("selectLk2").value;
    const lk3 = document.getElementById("selectLk3").value;

    const expires = new Date();
    expires.setTime(expires.getTime() + 365*24*60*60*1000); // 1 Jahr
    document.cookie = `selectedLKs=${lk1},${lk2},${lk3}; expires=${expires.toUTCString()}; path=/`;
}


function loadSelectedLKs() {
    const cookie = document.cookie.split('; ').find(c => c.startsWith('selectedLKs='));
    if (!cookie) return;

    const values = cookie.split('=')[1].split(',');
    if (values.length === 3) {
        document.getElementById("selectLk1").value = values[0] || "Mathe";
        document.getElementById("selectLk2").value = values[1] || "Informatik";
        document.getElementById("selectLk3").value = values[2] || "Physik";
    }
}

// 1. Gespeicherte LKs aus Cookies laden
loadSelectedLKs();

// 2. Timer initial anzeigen
updateTimer("selectLk1", "lk1");
updateTimer("selectLk2", "lk2");
updateTimer("selectLk3", "lk3");

// 3. Timer jede Sekunde aktualisieren
setInterval(() => {
    updateTimer("selectLk1", "lk1");
    updateTimer("selectLk2", "lk2");
    updateTimer("selectLk3", "lk3");
}, 1000);

// 4. Änderungen an den Selects speichern
document.getElementById("selectLk1").addEventListener("change", () => {
    updateCookies();
    updateTimer("selectLk1", "lk1");
});
document.getElementById("selectLk2").addEventListener("change", () => {
    updateCookies();
    updateTimer("selectLk2", "lk2");
});
document.getElementById("selectLk3").addEventListener("change", () => {
    updateCookies();
    updateTimer("selectLk3", "lk3");
});
