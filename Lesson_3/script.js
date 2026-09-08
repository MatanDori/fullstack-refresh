const title = document.getElementById("title");
const button = document.getElementById("change-button");

button.addEventListener("click", () => {
    title.textContent = "Hello Full Stack";
});