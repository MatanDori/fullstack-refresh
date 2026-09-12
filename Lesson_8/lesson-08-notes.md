# Lesson 8 — Advanced JavaScript I

## 1. First-Class Functions

ב-JavaScript פונקציה היא Value.

אפשר:
- לשמור פונקציה במשתנה
- להעביר פונקציה כ-Argument
- להחזיר פונקציה מפונקציה אחרת

```js
function sayHello() {
    return "Hello";
}

const fn = sayHello;
const result = sayHello();

console.log(typeof fn);     // "function"
console.log(typeof result); // "string"
```

הבדל קריטי:

```js
sayHello
```

= הפונקציה עצמה

```js
sayHello()
```

= הפעלת הפונקציה וקבלת הערך שהיא מחזירה

---

## 2. Higher-Order Functions

Higher-Order Function היא פונקציה שעושה לפחות אחד מהדברים הבאים:

1. מקבלת Function כ-Argument
2. מחזירה Function

דוגמה לפונקציה שמקבלת Function:

```js
function execute(fn) {
    return fn();
}
```

דוגמה לפונקציה שמחזירה Function:

```js
function createMultiplier(multiplier) {
    return function (number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

double(5); // 10
triple(4); // 12
```

`double` ו-`triple` הן בעצמן Functions.

---

## 3. Lexical Scope

פונקציה מחפשת משתנים לפי המקום שבו היא נכתבה בקוד.

החיפוש נע מבפנים החוצה:

```text
Inner Scope
   ↓
Outer Scope
   ↓
Global Scope
```

דוגמה:

```js
const value = 10;

function outer() {
    const value = 20;

    return function inner() {
        return value;
    };
}

const fn = outer();

console.log(fn()); // 20
```

ה-`value = 20` עושה Shadowing ל-`value = 10` הגלובלי.

---

## 4. Closures

Closure קורה כאשר פונקציה פנימית שומרת גישה ל-Lexical Scope שבו היא נוצרה, גם אחרי שהפונקציה החיצונית כבר הסתיימה.

```js
function createCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const counter = createCounter();

counter(); // 1
counter(); // 2
counter(); // 3
```

`count` לא מתאפס כי `counter` ממשיכה להחזיק Closure על אותו Scope.

### Closures נפרדים

```js
const counterA = createCounter();
const counterB = createCounter();

counterA(); // 1
counterA(); // 2
counterB(); // 1
```

לכל קריאה ל-`createCounter()` נוצר Scope נפרד.

---

## 5. Closures עבור Configuration

```js
function createLogger(prefix) {
    return function (message) {
        console.log(`${prefix}: ${message}`);
    };
}

const errorLogger = createLogger("ERROR");
const infoLogger = createLogger("INFO");
```

כל Function שנוצרת "זוכרת" Configuration אחר.

---

## 6. Private State עם Closure

```js
function createEmployee(name) {
    let loginCount = 0;

    return {
        name,

        login() {
            loginCount++;
            console.log(`${this.name} - ${loginCount}`);
        }
    };
}
```

`loginCount` אינו Property של ה-Object.

```js
console.log(employee.loginCount); // undefined
```

אבל `login()` יכולה לגשת אליו דרך Closure.

---

## 7. Functional Programming — חזרה והעמקה

עקרונות שחשוב לזכור:

- פונקציות קטנות
- אחריות ברורה
- Pure Functions כאשר אפשר
- פחות Mutation מיותר
- Immutability
- שימוש ב-`map`, `filter` וכו'
- Composition

### Pure Function

```js
function add(a, b) {
    return a + b;
}
```

אותו Input → אותו Output, ללא שינוי State חיצוני.

### Mutation

```js
function makeOlder(user) {
    user.age++;
}
```

### Immutable Approach

```js
function makeOlder(user) {
    return {
        ...user,
        age: user.age + 1
    };
}
```

---

## 8. Composition

Composition = פלט של Function אחת הופך לקלט של Function אחרת.

```js
function double(number) {
    return number * 2;
}

function addTen(number) {
    return number + 10;
}

const result = addTen(double(5));
// 20
```

פונקציות מקוננות רצות מבפנים החוצה:

```text
double(5)
↓
10
↓
addTen(10)
↓
20
```

---

# `this`

## 9. מה זה `this`?

ב-Regular Function, `this` נקבע לפי אופן הקריאה לפונקציה.

```js
const user = {
    name: "Dana",

    greet() {
        console.log(this.name);
    }
};

user.greet(); // Dana
```

בקריאה הזאת:

```js
this === user
```

---

## 10. אותה Function עם Objects שונים

```js
function showRole() {
    console.log(this.role);
}

const employee1 = {
    role: "developer",
    showRole
};

const employee2 = {
    role: "team lead",
    showRole
};

employee1.showRole(); // developer
employee2.showRole(); // team lead
```

אותה Function, אבל `this` שונה לפי מי שקורא לה.

---

## 11. איבוד `this`

```js
const user = {
    name: "Dana",

    greet() {
        console.log(this.name);
    }
};

const fn = user.greet;

fn();
```

כאשר מוציאים Method מתוך Object ומפעילים אותו כפונקציה רגילה, מאבדים את ה-Context של `user`.

ב-Strict Mode / ES Modules:

```js
this === undefined
```

ולכן:

```js
this.name
```

עלול לגרום ל-TypeError.

### כלל חשוב

```text
this נקבע לפי צורת הקריאה לפונקציה.
```

הפונקציה לא "זוכרת" אוטומטית מאיזה Object היא הגיעה.

---

# Regular Function vs Arrow Function

## 12. Arrow Function

ל-Arrow Function אין `this` משלה.

היא לוקחת את `this` מה-Scope החיצוני שבו היא נוצרה.

### שימוש בעייתי

```js
const user = {
    name: "Dana",

    greet: () => {
        console.log(this.name);
    }
};
```

כאן `this` לא יהיה `user`.

### שימוש מתאים

```js
const user = {
    name: "Dana",

    greet() {
        const inner = () => {
            console.log(this.name);
        };

        inner();
    }
};

user.greet(); // Dana
```

ה-Arrow Function יורשת את `this` של `greet()`.

### כלל לזכור

```text
Regular Function
→ this נקבע לפי צורת הקריאה

Arrow Function
→ אין this משלה
→ יורשת this מה-Scope החיצוני
```

---

# call / apply / bind

## 13. `call()`

מפעיל Function מיד ומאפשר לקבוע `this`.

```js
function greet(greeting) {
    console.log(`${greeting} ${this.name}`);
}

const user = {
    name: "Dana"
};

greet.call(user, "Hello");
```

תחביר:

```js
fn.call(thisValue, arg1, arg2, ...)
```

---

## 14. `apply()`

כמו `call()`, אבל Arguments נשלחים בתוך Array.

```js
greet.apply(user, ["Hello"]);
```

תחביר:

```js
fn.apply(thisValue, [arg1, arg2, ...])
```

היום `apply()` פחות נפוץ בחלק מהמקרים בגלל Spread.

```js
fn.call(user, ...args);
```

---

## 15. `bind()`

`bind()` לא מפעיל את הפונקציה מיד.

הוא מחזיר Function חדשה שבה `this` מקובע.

```js
function showRole() {
    console.log(this.role);
}

const employee = {
    role: "team lead"
};

const boundShowRole = showRole.bind(employee);

boundShowRole(); // team lead
```

`boundShowRole` היא Function:

```js
typeof boundShowRole;
// "function"
```

אפשר גם לקבע Arguments:

```js
function introduce(greeting, punctuation) {
    console.log(`${greeting} ${this.name}${punctuation}`);
}

const boundIntroduce = introduce.bind(user, "Hello");

boundIntroduce("!");
```

---

## 16. call / apply / bind — השוואה

```text
call
→ מפעיל מיד
→ Arguments בנפרד

apply
→ מפעיל מיד
→ Arguments בתוך Array

bind
→ לא מפעיל מיד
→ מחזיר Function חדשה
→ this מקובע
```

---

# החידוד הכי חשוב של השיעור

## Closure מול `this`

```js
function createEmployee(name) {
    let loginCount = 0;

    return {
        name,

        login() {
            loginCount++;
            console.log(`${this.name} - ${loginCount}`);
        }
    };
}

const dana = createEmployee("Dana");

const fn = dana.login;
fn();
```

מה קורה?

### `loginCount`
עדיין קיים.

למה?

כי הוא נשמר באמצעות Closure.

### `this`
אינו `dana`.

למה?

כי `fn()` נקראת כפונקציה רגילה ולא כ:

```js
dana.login();
```

לכן אפשר לאבד `this` ועדיין לשמור את ה-Closure.

## משפט חובה לזכור

```text
Closure נקבע לפי המקום שבו הפונקציה נוצרה.
this נקבע לפי הדרך שבה הפונקציה נקראת.
```

### תיקון עם `bind()`

```js
const fn = dana.login.bind(dana);

fn();
```

עכשיו:
- ה-Closure נשמר
- `this === dana`

---

# Team Lead / Code Review Thinking

כשקוראים קוד עם Functions, Closures ו-`this`, כדאי לשאול:

1. האם המשתנה מחזיק Function או תוצאה של Function?
2. האם זו Higher-Order Function?
3. מאיזה Lexical Scope הפונקציה קוראת משתנים?
4. האם יש Closure?
5. האם ה-Closure מחזיק State לאורך זמן?
6. האם `this` תלוי באופן הקריאה?
7. האם Method הוצא מתוך Object ועלול לאבד `this`?
8. האם Arrow Function מתאימה כאן?
9. האם צריך `bind()`?
10. האם ה-State צריך להיות Private או Property רגיל?
11. האם הפונקציה עושה Mutation או Side Effect?
12. האם אפשר לפרק פונקציה גדולה ל-Composition של פונקציות קטנות?

---

# טעויות וחידודים שעלו בשיעור

## Function מול Result

```js
const fn = sayHello;
```

שומר Function.

```js
const result = sayHello();
```

שומר את הערך שהפונקציה מחזירה.

אם `sayHello()` מחזירה `"Hello"`:

```js
typeof fn;     // "function"
typeof result; // "string"
```

---

## Higher-Order Function

```js
function execute(fn) {
    return fn();
}
```

היא Higher-Order Function כי היא מקבלת Function כ-Argument.

היא לא חייבת להחזיר Function.

---

## Closure

`count` לא חוזר ל-0 בכל קריאה כי קוראים שוב לאותה Function שנוצרה, ולא מפעילים מחדש את הפונקציה החיצונית.

---

## `this`

```js
user.greet();
```

שונה מ:

```js
const fn = user.greet;
fn();
```

בקריאה השנייה ה-Object Context אבד.

---

## Arrow Function

Arrow Function לא מקבלת `this` לפי מי שקורא לה.

היא יורשת `this` מה-Scope החיצוני.

---

# Quick Reference

```text
Function without () → הפונקציה עצמה
Function with ()    → הפעלת הפונקציה

Higher-Order Function
→ מקבלת Function ו/או מחזירה Function

Lexical Scope
→ משתנים נקבעים לפי המקום שבו הפונקציה נכתבה

Closure
→ פונקציה שומרת גישה ל-Scope שבו נוצרה

this
→ נקבע לפי צורת הקריאה

Arrow Function
→ אין this משלה

call
→ invoke now + explicit this

apply
→ invoke now + explicit this + array arguments

bind
→ new function + fixed this

Closure ≠ this
```

# Lesson 8 — תמ״צ

✅ First-Class Functions  
✅ Higher-Order Functions  
✅ Lexical Scope  
✅ Closures  
✅ Closure Configuration  
✅ Private State  
✅ Functional Programming  
✅ Pure Functions / Immutability review  
✅ Composition  
✅ `this`  
✅ Lost `this`  
✅ Regular vs Arrow Function  
✅ `call()`  
✅ `apply()`  
✅ `bind()`  
✅ Combined Practice  
✅ Summary Questions  

## להמשך — Lesson 9
Advanced JavaScript II:
- Objects לעומק
- Prototypes
- Prototype Chain
- Inheritance
- ES6+ מתקדם
- Error Handling
- נושאים משלימים מהסילבוס
