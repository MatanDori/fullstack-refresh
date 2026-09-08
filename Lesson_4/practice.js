const employees = [
    { name: "Dana", age: 25, role: "developer", isActive: true },
    { name: "Noa", age: 17, role: "developer", isActive: true },
    { name: "Avi", age: 31, role: "viewer", isActive: true },
    { name: "Roni", age: 29, role: "team lead", isActive: false },
    { name: "Itay", age: 23, role: "developer", isActive: true }
];

let counter = 0;

for (const employee of employees) {
    if (
        employee.age >= 18 && employee.isActive &&
        (
            employee.role === "developer" || employee.role === "team lead"
        )
    ) 
    {
        console.log(employee.name, "- Access granted");
        counter++;
    } 
    else {
        console.log(employee.name, "- Access denied");
    }
}

console.log("Total approved:", counter);