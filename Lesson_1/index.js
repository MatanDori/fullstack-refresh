const http = require("http");

const users = [
    {
        id: 1,
        name: "Matan",
        role: "developer"
    },
    {
        id: 2,
        name: "Dana",
        role: "developer"
    }
];

const server = http.createServer((request, response) => {

    console.log(request.method, request.url);
    
    if (request.method === "GET" && request.url === "/") {

        response.writeHead(200, {
            "Content-Type": "application/json"
        });

        response.end(JSON.stringify({
            message: "Welcome to my server"
        }));

    } 
    else if (request.method === "GET" && request.url === "/users") {

        response.writeHead(200, {
            "Content-Type": "application/json"
        });

        response.end(JSON.stringify(users));

    } 

    else if (request.method === "POST" && request.url === "/users") {

    let body = "";

    request.on("data", (chunk) => {
        body += chunk.toString();
    });

    request.on("end", () => {

        const newUser = JSON.parse(body);

        const userToCreate = {
            id: users.length + 1,
            name: newUser.name,
            role: newUser.role
        };
        users.push(userToCreate);

        console.log(newUser);

        response.writeHead(201, {
            "Content-Type": "application/json"
        });

        response.end(JSON.stringify({
            message: "User created",
            user: userToCreate
        }));
    });
}

    else {

        response.writeHead(404, {
            "Content-Type": "application/json"
        });

        response.end(JSON.stringify({
            message: "Route not found"
        }));
    }
});

server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});