# Lesson 9 — Advanced JavaScript II

## 1. Dynamic Properties — Dot vs Bracket Notation

נניח:

```js
const user = {
    name: "Dana",
    age: 25
};

const key = "age";
```

### Dot Notation
```js
user.age
```
מחפש Property בשם קבוע: `"age"`.

```js
user.key
```
מחפש Property שבאמת קוראים לו `"key"`.

אם אין כזה:
```js
undefined
```

### Bracket Notation
```js
user[key]
```

כאן JavaScript בודקת מה הערך שבתוך `key`.

אם:
```js
key === "age"
```

אז:
```js
user[key]
```

שקול ל:
```js
user["age"]
```

ולכן נקבל:
```js
25
```

### כלל חובה לזכור
```text
object.property
→ שם Property קבוע

object[variable]
→ שם Property דינמי שמגיע ממשתנה
```

---

## 2. Object Utilities

### `Object.keys()`
```js
const employee = {
    name: "Dana",
    role: "developer",
    age: 25
};

Object.keys(employee);
// ["name", "role", "age"]
```

### `Object.values()`
```js
Object.values(employee);
// ["Dana", "developer", 25]
```

### `Object.entries()`
```js
Object.entries(employee);
```

תוצאה:
```js
[
    ["name", "Dana"],
    ["role", "developer"],
    ["age", 25]
]
```

כל Entry הוא:
```js
[key, value]
```

---

## 3. Copy / Merge

### Copy עם Spread
```js
const user = {
    name: "Dana",
    age: 25
};

const copy = {
    ...user
};

user === copy;
// false
```

### Merge
```js
const a = {
    name: "Avi",
    role: "developer"
};

const b = {
    role: "team lead",
    age: 30
};

const merged = {
    ...a,
    ...b
};
```

תוצאה:
```js
{
    name: "Avi",
    role: "team lead",
    age: 30
}
```

אם אותו Property מופיע פעמיים — האחרון מנצח.

---

## 4. `Object.assign()`

Copy:
```js
const copy = Object.assign({}, user);
```

Merge:
```js
const merged = Object.assign({}, a, b);
```

זהירות:
```js
Object.assign(user, { age: 30 });
```
ישנה את `user` עצמו כי הוא ה-target.

---

## 5. Shallow Copy

גם Spread וגם `Object.assign()` עושים Shallow Copy.

```js
const user = {
    name: "Dana",
    address: {
        city: "Tel Aviv"
    }
};

const copy = {
    ...user
};
```

ה-Object החיצוני חדש:
```js
user === copy;
// false
```

אבל:
```js
user.address === copy.address;
// true
```

לכן:
```js
copy.address.city = "Haifa";

console.log(user.address.city);
// Haifa
```

---

## 6. Property Descriptors

ל-Property יש לא רק value, אלא גם Descriptors.

```js
Object.getOwnPropertyDescriptor(user, "name");
```

עשוי להחזיר:
```js
{
    value: "Dana",
    writable: true,
    enumerable: true,
    configurable: true
}
```

- `writable` → האם אפשר לשנות ערך
- `enumerable` → האם מופיע ב-`Object.keys()` / `for...in`
- `configurable` → האם אפשר למחוק או לשנות הגדרות

דוגמה:
```js
const employee = {};

Object.defineProperty(employee, "id", {
    value: 10,
    writable: false,
    enumerable: true,
    configurable: true
});
```

כאן:
```js
employee.id = 20;
console.log(employee.id); // 10
```

---

# 7. Prototype — הסבר מעמיק

Prototype הוא Object אחר שממנו Object יכול לקבל Properties ו-Methods אם הם לא קיימים עליו ישירות.

```js
const numbers = [1, 2, 3];

numbers.map(...)
```

`map()` לא מוגדר ישירות על `numbers`.

הוא נמצא ב:
```js
Array.prototype
```

רעיונית:
```text
numbers
↓
Array.prototype
├── map()
├── filter()
├── forEach()
├── push()
└── ...
```

---

## 8. Own Property מול Inherited Property

```js
const numbers = [1, 2, 3];
```

### `length`
```js
Object.hasOwn(numbers, "length");
// true
```

כי הוא נמצא ישירות על המערך.

### `map`
```js
Object.hasOwn(numbers, "map");
// false
```

כי הוא מגיע דרך:
```js
Array.prototype
```

ועדיין:
```js
numbers.map(...)
```

עובד.

### משפט חשוב
```text
Property או Method יכולים להיות זמינים ל-Object
גם אם הם לא Own Property שלו,
כל עוד הם נמצאים בהמשך ה-Prototype Chain.
```

---

# 9. Prototype Chain

ל-Array:
```text
arr
↓
Array.prototype
↓
Object.prototype
↓
null
```

JavaScript מחפשת Property לפי הסדר:
1. על ה-Object עצמו
2. על ה-Prototype שלו
3. על ה-Prototype של ה-Prototype
4. עד `null`

אם לא נמצא דבר:
```js
undefined
```

### Shadowing לאורך השרשרת

אם Property נמצא קרוב יותר בשרשרת, JavaScript משתמשת בו ולא ממשיכה למעלה.

```js
const user = {
    toString() {
        return "custom";
    }
};
```

כאן `user.toString()` ישתמש בגרסה שעל `user`.

---

# 10. Constructor Functions

```js
function User(name, role) {
    this.name = name;
    this.role = role;
}

const dana = new User("Dana", "developer");
```

## מה `new` עושה רעיונית?

1. יוצר Object חדש
2. קובע ש-`this` בתוך ה-Constructor יהיה ה-Object החדש
3. מחבר את ה-Object החדש ל-`User.prototype`
4. מריץ את ה-Constructor
5. מחזיר את ה-Object החדש

שרשרת:
```text
dana
↓
User.prototype
↓
Object.prototype
↓
null
```

---

## 11. Methods על Prototype

```js
User.prototype.introduce = function () {
    console.log(`${this.name} - ${this.role}`);
};
```

עכשיו:
```js
dana.introduce();
```

יעבוד למרות:
```js
dana.hasOwnProperty("introduce");
// false
```

כי `introduce` הוא Inherited Method.

---

## 12. `instanceof`

בודק האם `Constructor.prototype` נמצא ב-Prototype Chain.

```js
dana instanceof User;
// true

dana instanceof Object;
// true
```

גם:
```js
const numbers = [1, 2, 3];

numbers instanceof Array;  // true
numbers instanceof Object; // true
```

---

# 13. ES6 Classes

```js
class Employee {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }

    introduce() {
        return `${this.name} - ${this.role}`;
    }
}
```

חשוב:
`class` לא החליף את Prototype System.
הוא תחביר נוח יותר מעליה.

ה-Method:
```js
introduce()
```

נמצא למעשה ב:
```js
Employee.prototype
```

---

# 14. Inheritance — `extends`

```js
class TeamLead extends Employee {
    constructor(name, age, role, teamSize) {
        super(name, age, role);
        this.teamSize = teamSize;
    }
}
```

שרשרת:
```text
avi
↓
TeamLead.prototype
↓
Employee.prototype
↓
Object.prototype
↓
null
```

---

# 15. `super()`

```js
super(name, age, role);
```

קורא ל-Constructor של ה-Parent.

חשוב:
ב-Derived Class אי אפשר להשתמש ב-`this` לפני `super()`.

`extends` יוצר את קשר הירושה.

`super()` מפעיל את Parent Constructor ומאתחל את `this` של ה-Child Object.

---

# 16. Method Overriding

```js
class Employee {
    introduce() {
        return "Employee";
    }
}

class TeamLead extends Employee {
    introduce() {
        return "Team Lead";
    }
}
```

```js
const avi = new TeamLead();

avi.introduce();
// "Team Lead"
```

למה?

כי החיפוש הוא:
```text
avi
↓
TeamLead.prototype ← נמצא כאן
↓
Employee.prototype
```

ה-Method הקרוב יותר מנצח.

---

# 17. Error Handling — `try / catch`

```js
try {
    const user = null;
    console.log(user.name);
} catch (error) {
    console.log(error.message);
}
```

אם נזרקת שגיאה:
- המשך ה-`try` נעצר
- עוברים ל-`catch`

```js
try {
    console.log("A");
    throw new Error("Problem");
    console.log("B");
} catch (error) {
    console.log("C");
}
```

תוצאה:
```text
A
C
```

`B` לא רץ.

---

# 18. `finally`

רץ תמיד.

```js
try {
    console.log("A");
} catch (error) {
    console.log("B");
} finally {
    console.log("C");
}
```

שימושים:
- cleanup
- סגירת connection
- עצירת loader
- שחרור resource

---

# 19. `throw`

```js
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }

    return a / b;
}
```

`throw` עוצר את הזרימה הרגילה מיד.

---

# 20. Custom Errors

```js
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
```

שימוש:
```js
function checkAge(age) {
    if (age < 18) {
        throw new ValidationError("Too young");
    }

    return "OK";
}
```

בדיקה:
```js
const error = new ValidationError("Bad data");

error instanceof ValidationError; // true
error instanceof Error;           // true
```

שרשרת:
```text
error
↓
ValidationError.prototype
↓
Error.prototype
↓
Object.prototype
↓
null
```

---

# 21. תרגיל מסכם

```js
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

class Employee {
    constructor(name, age, role) {
        if (age < 18) {
            throw new ValidationError(
                "Employee must be 18 or older"
            );
        }

        this.name = name;
        this.age = age;
        this.role = role;
    }

    introduce() {
        return `${this.name} - ${this.role} - age ${this.age}`;
    }
}

class TeamLead extends Employee {
    constructor(name, age, role, teamSize) {
        super(name, age, role);
        this.teamSize = teamSize;
    }

    showTeamSize() {
        return `Team size: ${this.teamSize}`;
    }
}
```

---

# 22. טעויות וחידודים חשובים מהשיעור

## Dynamic Property

```js
user[key]
```
משתמש בערך של `key`.

```js
user.key
```
מחפש Property בשם `"key"`.

אם אין כזה:
```js
undefined
```

---

## Prototype

```js
Object.hasOwn(numbers, "length");
// true
```

```js
Object.hasOwn(numbers, "map");
// false
```

אבל `numbers.map()` עובד דרך `Array.prototype`.

---

## `new`

לא רק יוצר Object — גם מחבר אותו ל-`Constructor.prototype`.

---

## `super()`

לא "ניגש ל-this של האבא".

הוא מפעיל את Parent Constructor ומאתחל את `this` של ה-Child Object.

---

## `try`

ברגע שיש Error, המשך ה-`try` לא רץ.

---

## `finally`

רץ תמיד.

---

## Shallow Copy

```js
const copy = { ...user };
```

לא מעתיק Nested Objects לעומק.

---

# 23. Team Lead / Code Review Thinking

כשקוראים קוד כזה כדאי לשאול:

1. האם Property הוא Own או Inherited?
2. מאיזה Prototype הוא מגיע?
3. האם יש Shadowing ב-Prototype Chain?
4. האם `instanceof` באמת בודק את מה שחושבים?
5. האם Method יושב על Instance או Prototype?
6. האם `extends` ו-`super()` בשימוש נכון?
7. האם Child עושה Override ל-Method?
8. האם `throw` קורה במקום הנכון?
9. האם `catch` מטפל בשגיאה או רק מסתיר אותה?
10. האם `finally` משמש ל-cleanup?
11. האם Custom Error עוזר להבדיל בין סוגי כשלים?
12. האם Copy הוא shallow או deep?

---

# Quick Reference

```text
object.property
→ Property קבוע

object[variable]
→ Property דינמי

Object.keys()
→ keys

Object.values()
→ values

Object.entries()
→ [key, value]

Spread
→ copy / merge
→ shallow copy

Prototype
→ Object שממנו ניתן לקבל Properties / Methods

Own Property
→ נמצא ישירות על ה-Object

Inherited Property
→ מגיע דרך Prototype Chain

Prototype Chain
→ Object → prototype → prototype → ... → null

new
→ יוצר Object
→ this = Object החדש
→ מחבר ל-Constructor.prototype

instanceof
→ בודק אם Constructor.prototype נמצא בשרשרת

class
→ תחביר נוח מעל Prototype System

extends
→ ירושה

super()
→ מפעיל Parent Constructor

try
→ קוד שעלול להיכשל

catch
→ טיפול בשגיאה

finally
→ תמיד רץ

throw
→ זורק שגיאה

Custom Error
→ סוג שגיאה משלנו
```

# Lesson 9 — תמ״צ

✅ Dynamic Properties  
✅ Object.keys / values / entries  
✅ Copy / Merge  
✅ Object.assign  
✅ Shallow Copy  
✅ Property Descriptors  
✅ Prototype  
✅ Own vs Inherited  
✅ Prototype Chain  
✅ Constructor Functions  
✅ `new`  
✅ `instanceof`  
✅ ES6 Classes  
✅ Class vs Prototype  
✅ Inheritance  
✅ `extends`  
✅ `super()`  
✅ Method Overriding  
✅ `try / catch`  
✅ `finally`  
✅ `throw`  
✅ Custom Errors  
✅ Combined Practice  
✅ Summary Questions  

## להמשך — Lesson 10
Complexity / Big O.
