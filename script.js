const startButton = document.querySelector(".main-button");
const modal = document.getElementById("sessionModal");
const historyList =
document.getElementById("historyList");
const closeButton = document.getElementById("closeModal");

const saveButton = document.getElementById("saveButton");

const totalSessionsElement = document.getElementById("totalSessions");

const categoryInput = document.getElementById("categoryInput");
const satisfactionInput = document.getElementById("satisfactionInput");
const durationInput = document.getElementById("durationInput");
const noteInput = document.getElementById("noteInput");

let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

updateTotalSessions();
renderHistory();

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

    renderHistory();

    categoryInput.value = "";
    satisfactionInput.value = "5";
    durationInput.value = "";
    noteInput.value = "";

    modal.classList.add("hidden");

    alert("SESSION SAVED");
});

function updateTotalSessions() {
    totalSessionsElement.textContent = sessions.length;
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
