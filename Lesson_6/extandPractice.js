const employees = [
    { name: "Dana", role: "developer", age: 25, isActive: true },
    { name: "Noa", role: "developer", age: 17, isActive: true },
    { name: "Avi", role: "team lead", age: 30, isActive: true },
    { name: "Roni", role: "developer", age: 28, isActive: false }
];

function prepareEmployeesForReview(employees, minimumAge) {

    const employeeReview = employees
        .filter((employee) => {
            return employee.age >= minimumAge && employee.isActive === true;
        })
        .map((employee) => {
            if (employee.role === "team lead") {
                return {
                    ...employee,
                    reviewStatus: "priority"
                };
            }
            return {
                ...employee,
                reviewStatus: "regular"
            };
        });

    return employeeReview;
}

const result = prepareEmployeesForReview(employees, 18);

console.log(result);