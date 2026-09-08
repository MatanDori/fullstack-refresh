


Lesson 04 — Programming Fundamentals
מטרת השיעור
רענון יסודות החשיבה התכנותית באמצעות JavaScript:

Variables

Data Types

Objects

Arrays

Loops

Conditions

Input / Processing / Output

Algorithmic Thinking

1. Variables
const
משתנה שלא ניתן להצמיד אליו ערך חדש לאחר ההגדרה.

const name = "Dana";
let
משתנה שהערך שלו יכול להשתנות.

let score = 0;
score = 10;
כלל בסיסי:

const → כאשר לא מתכננים להחליף את הערך
let   → כאשר הערך אמור להשתנות
2. Data Types
const name = "Matan";      // string
const age = 24;            // number
const isAdmin = false;     // boolean
let manager;               // undefined
const selectedUser = null; // null
בדיקת Type:

typeof name;
typeof age;
typeof isAdmin;
typeof manager;
3. Objects
const developer = {
    name: "Matan",
    age: 24,
    role: "developer",
    isTeamLead: false
};
גישה:

developer.name;
developer["name"];
שינוי:

developer.role = "team lead";
הוספה:

developer.email = "example@mail.com";
Nested Object:

const developer = {
    name: "Matan",
    address: {
        city: "Tel Aviv",
        country: "Israel"
    }
};

developer.address.city;
4. Reference Types
Objects ו-Arrays הם Reference Types.

const developer1 = { name: "Matan" };
const developer2 = developer1;

developer2.name = "Daniel";

console.log(developer1.name); // Daniel
לעומת זאת:

const a = { name: "Matan" };
const b = { name: "Matan" };

console.log(a === b); // false
5. Arrays
const users = ["Dana", "Matan", "Noa"];
האינדקסים מתחילים מ-0.

users[0];
users.length;
users[users.length - 1];
פעולות נפוצות:

users.push("Noa");
users.pop();
users.unshift("Avi");
users.shift();
בדיקת Array:

Array.isArray(users);
6. Array of Objects
const developers = [
    { name: "Dana", role: "developer" },
    { name: "Matan", role: "team lead" }
];

console.log(developers[1].name);
7. Loops
for
for (let i = 0; i < developers.length; i++) {
    console.log(developers[i].name);
}
for...of
for (const developer of developers) {
    console.log(developer.name);
}
while
let i = 0;

while (i < 3) {
    console.log(i);
    i++;
}
do...while
let x = 5;

do {
    console.log(x);
    x++;
} while (x < 5);
break
עוצר את הלולאה לגמרי.

continue
מדלג על הסיבוב הנוכחי.

Nested Loops
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
        console.log(i, j);
    }
}
8. טעויות נפוצות בלולאות
Off-by-one
במעבר על Array לרוב:

i < array.length
ולא:

i <= array.length
Infinite Loop
צריך לוודא שמשהו משתנה כך שהתנאי יוכל להפוך ל-false.

9. for...of מול for...in
for...of → values
for...in → keys / indexes
10. Conditions
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
if (score >= 90) {
    console.log("Excellent");
} else if (score >= 70) {
    console.log("Good");
} else {
    console.log("Needs improvement");
}
11. Comparison Operators
>    גדול מ-
<    קטן מ-
>=   גדול או שווה
<=   קטן או שווה
===  שווה בערך וב-Type
!==  שונה בערך או ב-Type
5 == "5";  // true
5 === "5"; // false
ברוב הקוד המודרני נעדיף === ו-!==.

12. Logical Operators
&& → AND
|| → OR
!  → NOT
דוגמה:

if (
    user.age >= 18 &&
    user.isActive &&
    !user.isBlocked &&
    (user.role === "developer" || user.role === "team lead")
) {
    console.log("Access granted");
} else {
    console.log("Access denied");
}
13. Truthy & Falsy
Falsy מרכזיים:

false
0
""
null
undefined
NaN
Arrays ו-Objects ריקים הם Truthy.

14. switch
switch (role) {
    case "admin":
        console.log("Full access");
        break;

    case "developer":
        console.log("Developer access");
        break;

    default:
        console.log("Unknown role");
}
15. Ternary
const result = score >= 70 ? "Pass" : "Fail";
מבנה:

condition ? valueIfTrue : valueIfFalse
16. Input / Processing / Output
const numbers = [10, 20, 30];

let total = 0;

for (const number of numbers) {
    total += number;
}

console.log(total);
Input      → [10, 20, 30]
Processing → מעבר על המערך וצבירת הסכום
Output     → 60
17. Algorithmic Thinking
לפני כתיבת קוד:

1. מה ה-Input?
2. מה צריך לשמור?
3. מה ה-Processing?
4. מה ה-Output?
Pseudo Code לדוגמה:

START
counter = 0

FOR each score
    IF score >= 70
        counter++

PRINT counter
END
18. Flow Chart
Oval          → Start / End
Rectangle     → Process
Diamond       → Decision / Condition
Parallelogram → Input / Output
Arrow         → Flow direction
19. תרגיל מסכם
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
        employee.age >= 18 &&
        employee.isActive &&
        (
            employee.role === "developer" ||
            employee.role === "team lead"
        )
    ) {
        console.log(employee.name, "- Access granted");
        counter++;
    } else {
        console.log(employee.name, "- Access denied");
    }
}

console.log("Total approved:", counter);
תוצאה צפויה:

Dana - Access granted
Noa - Access denied
Avi - Access denied
Roni - Access denied
Itay - Access granted
Total approved: 2
משפטי מפתח
const → לא ניתן להצמיד למשתנה ערך חדש
let   → הערך יכול להשתנות
Object / Array → Reference Types
Array indexes מתחילים ב-0
break → עצור לולאה
continue → דלג על iteration
Input → Processing → Output
הערת רש"צ
ברמת Team Lead חשוב לזהות:

האם התנאי מכסה את כל המסלולים?

האם הלולאה יכולה להיתקע?

האם גבולות ה-Array נכונים?

האם עובדים בטעות על Reference משותף?

האם שמות המשתנים עקביים וברורים?

האם אפשר להסביר את Flow של הקוד לפני המימוש?

בימי JavaScript נעמיק ב:
forEach, map, filter, find, some, every, reduce,
Functions, Callbacks, Arrow Functions ועוד.