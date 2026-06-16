const startButton =
document.querySelector(".main-button");

const modal =
document.getElementById("sessionModal");

const closeButton =
document.getElementById("closeModal");

startButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
});
