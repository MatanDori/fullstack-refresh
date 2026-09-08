const userName = "Matan";
let points = 10;

points = 15;

console.log(userName);
console.log(points);
let score;

console.log(typeof score);

const Developer = {
    name: "Matan",
    age: 24,
    role: "Future-headdeveloper",
    isTeamLead: false,
    address: {
        city: "TelAviv",
        country: "Israel"
    }
};
console.log(Developer.name);
console.log(Developer.address.city);
Developer.role = "Head developer";
Developer.email = "matand213@gmail.com";
console.log(Developer);

const developers = [
    {
        name: "Dana",
        role: "developer"
    },
    {
        name: "Matan",
        role: "team lead"
    },
    {
        name: "Noa",
        role: "developer"
    }
];

console.log(developers[0].name);
console.log(developers[1].role);
developers[2].role = "senior developer";
developers.push({ name: "Itay", role: "HR" });
console.log("length:" ,developers.length);
console.log(developers);
for (const developer of developers) {
    console.log(developer.name + " - " + developer.role);
}

const user = {
    name: "Matan",
    age: 20,
    isActive: true,
    role: "developer",
    isBlocked: false
};
if (
    user.age >= 18 && user.isActive &&
    !user.isBlocked && (user.role === "developer" || user.role === "team lead")
)
{
    console.log("Access granted");
} 
else {
    console.log("Access denied");
}

const Users = [
    {
    name: "Dana",
    age: 25,
    isActive: true,
    role: "developer",
    isBlocked: false
    },
    {
    name: "Noa",
    age: 17,
    isActive: true,
    role: "developer",
    isBlocked: false
    },
    {
    name: "Avi",
    age: 30,
    isActive: true,
    role: "Viewer",
    isBlocked: false
    },
    {
    name: "Roni",
    age: 28,
    isActive: true,
    role: "CEO",
    isBlocked: true
    },
    {
    name: "Matan",
    age: 20,
    isActive: true,
    role: "developer",
    isBlocked: false
    }
];

for (user of Users) {
    if (
    user.age >= 18 && user.isActive &&
    !user.isBlocked && (user.role === "developer" || user.role === "team lead")
){
    console.log(user.name ,"Access granted");
}
else{
        console.log(user.name ,"Access denied");
}
}