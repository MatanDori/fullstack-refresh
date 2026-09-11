const employees = [
    { name: "Dana", age: 25 },
    { name: "Noa", age: 17 },
    { name: "Avi", age: 30 }
];
const names = employees.filter(employee => employee.age>=18).map(employee => employee.name);
console.log(names);

const prices = [20, 35, 15, 30];

let sum = prices.reduce((acc , price) => {
    acc = acc + price;
    return acc;
},0)
console.log(sum);

const employees2 = [
    { name: "Dana", role: "developer" },
    { name: "Noa", role: "developer" },
    { name: "Avi", role: "team lead" },
    { name: "Roni", role: "developer" }
];
const roleCounts = employees2.reduce((acc, employee) => {
    if(acc[employee.role]){
        acc[employee.role]++;
    }
    else{
        acc[employee.role] = 1;
    }
    return acc;
}, {});
console.log(roleCounts); 

const user = {
    name: "Avi",
    age: 30
};

const { name, age, role = "guest" } = user;
console.log(user);

const button = document.querySelector("#saveBtn");

button.addEventListener("click", () => {
    console.log("saving...");
});

const button2 = document.querySelector("#likeBtn");

button2.addEventListener("click", (event) => {
   event.target.textContent = "liked!" 
});

const form = document.querySelector("#registerForm");
const input = document.querySelector("#nameInput");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(input.value);
});

const form2 = document.querySelector("#userForm");
const input2 = document.querySelector("#firstName");
const input3 = document.querySelector("#lastName");

form2.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(`${input2.value} ${input3.value}`);
});

const car = {
    brand: "Toyota",
    year: 2024
};

const carJson = JSON.stringify(car);
const carJS   = JSON.parse(carJson);

const settings = {
    theme: "dark",
    notifications: true
};

localStorage.setItem("settings" , JSON.stringify(settings));
const savedSettings = JSON.parse(localStorage.getItem("settings"));

// setTimeout(() => {
//     console.log("Hello!");
// }, 2000);

// setInterval(() => {
//     console.log("Tick!");
// }, 2000);

// clearInterval(intervalId);

//משולב
const intervalId = setInterval(() => {
    console.log("Tick!");
}, 2000);

setTimeout(() => {
    clearInterval(intervalId);
}, 7000);