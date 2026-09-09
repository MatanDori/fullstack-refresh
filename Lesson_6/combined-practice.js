const employees = [
    { name: "Dana", role: "developer", age: 25, isActive: true },
    { name: "Noa", role: "developer", age: 22, isActive: true },
    { name: "Avi", role: "team lead", age: 30, isActive: true },
    { name: "Roni", role: "developer", age: 28, isActive: false }
];

function updateEmployeeRoleOnly(employee, newRole) {
    return {
        ...employee,
        role: newRole
    };
}

function updateEmployeeRole(employees, employeeName, newRole) {
    const employeesUpdate = employees.map((employee) => {

        if (employeeName === employee.name) {
            return updateEmployeeRoleOnly(employee, newRole);
        }

        return employee;
    });

    return employeesUpdate;
}

const updatedEmployees =
    updateEmployeeRole(employees, "Dana", "senior developer");

console.log(updatedEmployees);