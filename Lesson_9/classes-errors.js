const { Form } = require("react-router-dom");

class Employee {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    showRole() {
        console.log(this.role);
    }
}

const employee = new Employee("Avi", "developer");
employee.hasOwnProperty("name");
employee.hasOwnProperty("showRole");

class TeamLead extends Employee {
    constructor(name, role, teamSize) {
        super(name, role);
        this.teamSize = teamSize;
    }

    showTeamSize() {
        console.log(this.teamSize);
    }
}
avi instanceof TeamLead   // true
avi instanceof Employee   // true
avi instanceof Object     // true

// // 
// new TeamLead(...)
//        ↓
// TeamLead constructor
//        ↓
// super(name, role)
//        ↓
// Employee constructor
//        ↓
// name + role
//        ↓
// חזרה ל-TeamLead
//        ↓
// teamSize
// // 

try {
    const user = null;
    console.log(user.name);
} catch (error) {
    console.log("Something went wrong");
}
console.log("Continue");

// try
//  ↓
// JavaScript מנסה להריץ את הקוד
//  ↓
// נזרקת שגיאה
//  ↓
// המשך ה-try נעצר
//  ↓
// עוברים ל-catch
//  ↓
// אחרי ה-catch הקוד ממשיך

try {
    console.log("A");
    const user = null;
    console.log(user.name);

    console.log("B");
} catch (error) {
    console.log("C");
}
console.log("D");

try {
    console.log("A");
    throw new Error("Problem");
    console.log("B");
} catch (error) {
    console.log("C");
} finally {
    console.log("D");
}

console.log("E");



class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class Employee {
    constructor(name, age, role) {
        if (age < 18) {
            throw new ValidationError("Employee must be 18 or older");
        }
        this.name = name;
        this.age = age;
        this.role = role;
    }
    introduce() {
        return `${this.name} - ${this.role} - age ${this.age}`;
    }
}
class TeamLead extends Employee {
    constructor(name, age, role, teamSize) {
        super(name, age, role);
        this.teamSize = teamSize;
    }
    showTeamSize() {
        return `Team size: ${this.teamSize}`;
    }
}
try {
    const dana = new Employee(
        "Dana",
        25,
        "developer"
    );

    const avi = new TeamLead(
        "Avi",
        30,
        "team lead",
        6
    );

    console.log(dana.introduce());
    console.log(avi.introduce());
    console.log(avi.showTeamSize());

    const noa = new Employee(
        "Noa",
        16,
        "developer"
    );

} catch (error) {
    console.log(error.name);
    console.log(error.message);
}