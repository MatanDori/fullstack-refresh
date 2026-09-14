const isAdmin = true;
const username = "Matan";
const scores = [90, 85, 100];

// function getFullName(
//     firstName: string,
//     lastName: string
// ): number {
//     return `${firstName} ${lastName}`;
// }
type Status = "active" | "inactive" | "blocked";

//let userStatus: Status = "waiting";

function handleValue(value: string | number | boolean) {
    if (typeof value === "string") {
        // מה ה-Type כאן?
    } else if (typeof value === "number") {
        // ומה כאן?
    } else {
        // ומה נשאר כאן?
    }
}

type User = {
    id: number;
    name: string;
};

function handleUser(data: any) {
    const user = data as User;

    console.log(user.name.toUpperCase());
}

type Role = "developer" | "teamlead" | "admin";
interface Employee{
    readonly id: number;
    name: string;
    age: number;
    role: Role;
    email?:  string;
}

function getEmployeeById(employees: Employee[], id: number): Employee | undefined {
    return employees.find(employee => employee.id === id);
}

const employees: Employee[] = [{ id: 1, name: "Matan", age: 30, role: "developer" },
     { id: 2, name: "Sarah", age: 28, role: "teamlead" },{ id: 3, name: "Mika", age: 23, role: "developer" }];
console.log(getEmployeeById(employees, 2));

function getFirst<T>(array: T[]): T | undefined {
    return array[0];
}

function handleEmployee(data: any) {
    const employee = data as Employee;
    console.log(employee.name.toUpperCase());
}
//first problem: any insted of unkown
//second - not gurenteed if data is really user