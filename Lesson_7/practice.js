{/* <form id="profileForm">
    <input id="nameInput" type="text">
    <input id="cityInput" type="text">
    <button type="submit">Save</button>
</form> */}
const form = document.querySelector("#profileForm");
const input = document.querySelector("#nameInput");
const input2 = document.querySelector("#cityInput");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const Profile = {
         name: input.value ,
         city: input2.value
    }
    localStorage.setItem("profile" ,JSON.stringify(Profile))
    setTimeout(() => {
      console.log("Profile saved!");
    }, 2000);
});