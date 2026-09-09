const employees = [
    { name: "Dana", role: "developer", age: 25 },
    { name: "Noa", role: "developer", age: 17 },
    { name: "Avi", role: "team lead", age: 30 }
];

employees.forEach((employee , index) => {
    console.log(index+1,"." , employee.name, "-" , employee.role)
});

const employeeLabels = employees.map((employee) => {
    return `${employee.name} - ${employee.role}`;
});

console.log(employeeLabels);

const developersOnly = employees.filter((employee) => {
    return employee.role === "developer";
});

console.log(developersOnly);

const prices = [100, 200, 300, 400];

const discountedPrices = prices.map((price) => {
    return price * 0.9;
});

console.log(discountedPrices);

const firstAdult = employees.find((employee) => {
    return employee.age >= 18;
});

console.log(firstAdult);

const hasMinor = employees.some((employee) =>  employee.age < 18);

console.log(hasMinor);

const allHaveRole = employees.every((employee) =>  employee.role !== "");

console.log(allHaveRole);

const allowedRoles = ["developer", "team lead", "admin"];

const role = "viewer";

if(allowedRoles.includes(role)){
    console.log("acsess given");
}
else{
        console.log("acsess denied");
}



const teamLabels = employees
    .filter((employee) => {
        return employee.age >= 18;
    })
    .map((employee) => {
        return `${employee.name} - ${employee.role}`;
    });

    function getEmployeesOverAge(employees , minimumAge){
        return employees.filter((employee) => {
        return employee.age >= minimumAge;
    });
    }

    function updateEmployeeAge (employee , newAge){
        return{
            ...employee,
            age: newAge
        };
    }

    const employeesPractice = [
    { name: "Dana", role: "developer", age: 25, isActive: true },
    { name: "Noa", role: "developer", age: 17, isActive: true },
    { name: "Avi", role: "team lead", age: 30, isActive: true },
    { name: "Roni", role: "developer", age: 28, isActive: false }
];

function getActiveAdultLabels(employees) {
    return employees.filter((employee) => employee.age >= 18 && employee.isActive)
        .map((employee) =>`${employee.name} - ${employee.role}`);
}
    console.log(giveActiveAdultsLabels);