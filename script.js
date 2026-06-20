const startButton = document.querySelector(".main-button");
const modal = document.getElementById("sessionModal");
const historyList = document.getElementById("historyList");
const closeButton = document.getElementById("closeModal");

const saveButton = document.getElementById("saveButton");

const totalSessionsElement =
document.getElementById("totalSessions");

const streakCount =
document.getElementById("streakCount");

const categoryInput =
document.getElementById("categoryInput");

const satisfactionInput =
document.getElementById("satisfactionInput");

const durationInput =
document.getElementById("durationInput");

const noteInput =
document.getElementById("noteInput");

const achievement1 =
document.getElementById("achievement1");

const achievement7 =
document.getElementById("achievement7");

const achievement100 =
document.getElementById("achievement100");

let sessions =
JSON.parse(localStorage.getItem("sessions")) || [];

updateTotalSessions();
renderHistory();
updateAchievements();
updateStreak();

startButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
});

saveButton.addEventListener("click", () => {

    const session = {
        date: new Date().toLocaleString(),
        category: categoryInput.value,
        satisfaction: satisfactionInput.value,
        duration: durationInput.value,
        note: noteInput.value
    };

    sessions.push(session);

    localStorage.setItem(
        "sessions",
        JSON.stringify(sessions)
    );

    updateTotalSessions();
    renderHistory();
    updateAchievements();
    updateStreak();

    categoryInput.value = "";
    satisfactionInput.value = "5";
    durationInput.value = "";
    noteInput.value = "";

    modal.classList.add("hidden");

    alert("SESSION SAVED");
});

function updateTotalSessions() {
    totalSessionsElement.textContent =
        sessions.length;
}

function renderHistory() {

    if (sessions.length === 0) {

        historyList.innerHTML =
            "<p>まだ記録がありません</p>";

        return;
    }

    historyList.innerHTML = "";

    const reversed =
        [...sessions].reverse();

    reversed.forEach(session => {

        historyList.innerHTML += `
            <div class="history-item">

                <small>${session.date}</small>

                <strong>${session.category}</strong>

                <p>
                    満足度: ${session.satisfaction}
                    / 時間: ${session.duration}分
                </p>

            </div>
        `;
    });
}

function updateAchievements() {

    if (sessions.length >= 1) {

        achievement1.textContent =
            "🏆 FIRST SESSION";

    }

    if (sessions.length >= 7) {

        achievement7.textContent =
            "🏆 7 SESSIONS";

    }

    if (sessions.length >= 100) {

        achievement100.textContent =
            "🏆 100 SESSIONS";

    }
}

function updateStreak() {

    if (sessions.length === 0) {

        streakCount.textContent =
            "0 DAYS";

        return;
    }

    const dates = sessions.map(session => {

        const date =
            new Date(session.date);

        return date.toDateString();

    });

    const uniqueDates =
        [...new Set(dates)];

    streakCount.textContent =
        uniqueDates.length + " DAYS";
}
