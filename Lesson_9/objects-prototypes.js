const employee = {
    name: "Dana",
    role: "developer"
};
const field = "name";
console.log(employee[field]);
console.log(employee["role"]);

const user = {
    name: "Avi",
    age: 30
};
console.log(Object.keys(user));
console.log(Object.values(user));

const user2 = {
    name: "Avi",
    age: 30
};
console.log(Object.entries(user2));

const a = {
    name: "Avi",
    role: "developer"
};
const b = {
    role: "team lead",
    age: 30
};
const merged = {
    ...a,
    ...b
};



const numbers = [1, 2, 3];
numbers instanceof Array;
numbers instanceof Object;

