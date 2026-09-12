function runTwice(fn) {
    fn();
    fn();
}
function sayHi() {
    console.log("Hi");
}
runTwice(sayHi);

function createGreeter(greeting) {
    return function (name) {
        return `${greeting}, ${name}`;
    };
}
const sayHello = createGreeter("Hello");
const sayGoodMorning = createGreeter("Good morning");
console.log(sayHello("Dana"));
console.log(sayGoodMorning("Avi"));

function addTax(price) {
    return price * 1.17;
}
function roundPrice(price) {
    return Math.round(price);
}
const result = roundPrice(addTax(100));
console.log(result);

function showRole() {
    console.log(this.role);
}
const employee1 = {
    role: "developer",
    showRole
};
const employee2 = {
    role: "team lead",
    showRole
};
employee1.showRole();
employee2.showRole();

function showAge(prefix) {
    console.log(`${prefix}: ${this.age}`);
}
const user = {
    age: 25
};
showAge.call(user, "Age");

function introduce(greeting, ending) {
    console.log(`${greeting}, I am ${this.name}${ending}`);
}
const employee3 = {
    name: "Avi"
};
introduce.apply(employee3, ["Hi", "!"]);

function showRole() {
    console.log(this.role);
}
const employee4 = {
    role: "team lead"
};
const fn = showRole.bind(employee);
fn();

//exercise
function createEmployee(name, role) {
    let loginCount = 0;

    return {
        name,
        role,

        login() {
            loginCount++;
            console.log(`${this.name} logged in ${loginCount} times`);
        }
    };
}
const dana = createEmployee("Dana", "developer");
const avi = createEmployee("Avi", "team lead");
dana.login();
dana.login();
avi.login();
