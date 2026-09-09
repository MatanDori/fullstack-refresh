# Lesson 6 — JavaScript Basic I

## Functions
- Function Declaration / Function Expression / Arrow Function
- Parameter = שם שמוגדר בפונקציה; Argument = הערך שנשלח בפועל.
- `console.log()` מציג ערך; `return` מחזיר ערך מתוך הפונקציה.
- `return` גם עוצר את ריצת הפונקציה באותה נקודה.

```js
function add(a, b) {
    return a + b;
}
```

## Template Literals
```js
const greet = (name) => `Hello ${name}`;
```

## Scope
- Global Scope: נגיש מתוך scopes פנימיים.
- Function Scope: משתנה פנימי אינו נגיש מבחוץ.
- Block Scope: `let` ו-`const` מוגבלים לבלוק `{}`.
- Shadowing: משתנה פנימי יכול להסתיר משתנה חיצוני בעל אותו שם.

## let / const / var
- ברירת מחדל: `const`.
- `let` כשצריך reassignment.
- `var` בעיקר להיכרות עם קוד ישן.
- `const` מונע reassignment של המשתנה, אבל לא mutation של Object/Array.

```js
const user = { name: "Dana" };
user.name = "Noa"; // תקין
```

## Hoisting ו-TDZ
```js
console.log(a);
var a = 10; // undefined
```

```js
console.log(b);
let b = 10; // ReferenceError
```

Function Declaration ניתנת לקריאה לפני שורת ההגדרה; Function Expression שמוחזקת ב-`const`/`let` לא.

## Pure Functions / Side Effects
Pure Function:
- אותו input → אותו output.
- לא משנה state חיצוני.

Mutation:
```js
function makeOlder(user) {
    user.age++;
}
```

Immutable:
```js
function makeOlder(user) {
    return {
        ...user,
        age: user.age + 1
    };
}
```

Side Effects יכולים להיות: `console.log`, DOM, DB, HTTP, File System, שינוי state, שליחת מייל וכו'.

## Default Parameters
```js
function greet(name = "Guest") {
    return `Hello ${name}`;
}
```

## Rest Parameters
```js
function showNumbers(...numbers) {
    console.log(numbers);
}
```

כלל:
- Rest אוסף
- Spread מפזר

## Callback Functions
ב:
```js
numbers.map((number) => number * 2)
```

ה-Callback הוא:
```js
(number) => number * 2
```

`map()` מפעילה אותו עבור כל איבר.

# Array Methods

## forEach()
מבצע פעולה על כל איבר, אך לא מחזיר Array חדש.

```js
const result = numbers.forEach((number) => number * 2);
console.log(result); // undefined
```

## map()
יוצר Array חדש מהערכים שה-callback מחזיר.

```js
const doubled = numbers.map((number) => number * 2);
```

## filter()
משאיר את כל האיברים שעומדים בתנאי.

```js
const adults = employees.filter((employee) => employee.age >= 18);
```

`filter()` עונה על: **מי יישאר?**

## find()
מחזיר את ההתאמה הראשונה. אם אין התאמה: `undefined`.

## some()
האם לפחות אחד עומד בתנאי? מחזיר Boolean.

## every()
האם כולם עומדים בתנאי? מחזיר Boolean.

## includes()
בודק האם ערך ישיר קיים ב-Array.

## Method Chaining
```js
const labels = employees
    .filter((employee) => employee.age >= 18)
    .map((employee) => `${employee.name} - ${employee.role}`);
```

כלל:
- `filter` → מי נשאר?
- `map` → איך הוא ייראה?

# Functions + Arrays + Objects

```js
function getEmployeesOverAge(employees, minimumAge) {
    return employees.filter((employee) => {
        return employee.age >= minimumAge;
    });
}
```

```js
function updateEmployeeAge(employee, newAge) {
    return {
        ...employee,
        age: newAge
    };
}
```

# Spread Operator

עם Object:
```js
const updatedEmployee = {
    ...employee,
    role: "team lead"
};
```

הסדר חשוב: Property שמופיע מאוחר יותר יכול לדרוס Property קיים.

עם Array:
```js
const copy = [...numbers];
const extended = [...numbers, 4];
```

# Shallow Copy

Spread מעתיק שכבה אחת בלבד.

```js
const user = {
    name: "Dana",
    address: {
        city: "Tel Aviv"
    }
};

const copy = { ...user };
```

```js
user === copy;                 // false
user.address === copy.address; // true
```

כדי להעתיק גם את `address`:
```js
const copy = {
    ...user,
    address: {
        ...user.address
    }
};
```

# Array חדש לא אומר שכל ה-Objects חדשים

```js
const updatedEmployees = employees.map((employee) => {
    if (employee.name === "Dana") {
        return {
            ...employee,
            role: "senior developer"
        };
    }

    return employee;
});
```

- המערך עצמו חדש.
- Dana היא Object חדש.
- עובדים שלא השתנו יכולים להישאר אותו Reference.

# תרגיל מסכם

```js
function prepareEmployeesForReview(employees, minimumAge) {
    return employees
        .filter((employee) => {
            return employee.age >= minimumAge &&
                   employee.isActive === true;
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
}
```

# חידודים מהשאלות
- `filter()` מחזיר את כל ההתאמות.
- `find()` מחזיר רק את הראשונה.
- `true` / `false` נכתבים באותיות קטנות.
- `forEach()` מחזיר `undefined`.
- Callback הוא הפונקציה שמעבירים ל-method, לא ה-method עצמו.
- `===` עדיף בדרך כלל על `==`.
- `return employee` בתוך `map()` חשוב כדי שלא נקבל `undefined` לעובדים שלא שונו.

# Team Lead Thinking
ב-Code Review כדאי לשאול:
1. מה ה-input ומה ה-output?
2. האם הפונקציה עושה mutation?
3. האם יש side effects?
4. האם הקוד reusable או hard-coded?
5. האם נבחר ה-Array Method הנכון?
6. האם יש `return` בכל מסלול שדורש ערך?
7. האם נוצר Object חדש או שנשאר Reference קיים?
8. האם Spread מספיק או שיש Nested Objects?

# Quick Reference
```text
forEach → לבצע פעולה
map     → ליצור Array חדש
filter  → כל ההתאמות
find    → התאמה ראשונה
some    → לפחות אחד?
every   → כולם?
includes→ האם ערך קיים?

Rest    → אוסף
Spread  → מפזר

filter → מי נשאר?
map    → איך הוא ייראה?
```

# Lesson 6 — תמ״צ
✅ Functions  
✅ Parameters / Arguments  
✅ return / console.log  
✅ Function Declaration / Expression / Arrow  
✅ Template Literals  
✅ Scope  
✅ let / const / var  
✅ Hoisting / TDZ  
✅ Pure Functions / Side Effects  
✅ Default Parameters  
✅ Rest Parameters  
✅ Callback basics  
✅ forEach  
✅ map  
✅ filter  
✅ find  
✅ some / every / includes  
✅ Method Chaining  
✅ Functions with Arrays  
✅ Functions with Objects  
✅ Spread  
✅ Shallow Copy  
✅ Mutation vs Immutability  
✅ Combined Practice  
✅ Summary Questions  

## להמשך
`reduce()` ושיטות Array נוספות, Events, Forms, JSON, Storage ו-Async/Timers ימשיכו ב-JavaScript Basic II.
