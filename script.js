const startButton = document.querySelector(".main-button");
const modal = document.getElementById("sessionModal");
const closeButton = document.getElementById("closeModal");

const saveButton = document.getElementById("saveButton");

const totalSessionsElement = document.getElementById("totalSessions");

const categoryInput = document.getElementById("categoryInput");
const satisfactionInput = document.getElementById("satisfactionInput");
const durationInput = document.getElementById("durationInput");
const noteInput = document.getElementById("noteInput");

let sessions = JSON.parse(localStorage.getItem("sessions")) || [];

updateTotalSessions();

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
