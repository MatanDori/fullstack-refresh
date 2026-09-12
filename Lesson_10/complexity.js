function printUsers(users) {
    for (const user of users) {
        console.log(user.name);
    }
}//O(n) complexity

function printFirstAndAll(users) {
    console.log(users[0]);

    for (const user of users) {
        console.log(user.name);
    }
}//O(n) complexity + O(1) ==> O(n) n>>>1