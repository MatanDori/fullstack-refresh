# Lesson 11 — TypeScript

## מטרת השיעור
להבין למה TypeScript קיים, איך הוא מוסיף Type Safety ל-JavaScript, ואיך לזהות ולכתוב קוד TypeScript בצורה בטוחה וברורה ברמת מפתח ורש״צ.

---

## 1. למה TypeScript?

JavaScript היא שפה Dynamically Typed.

```js
let value = 10;
value = "hello";
value = true;
```

TypeScript מוסיף Static Typing:

```ts
let value: number = 10;

value = 20;       // ✅
value = "hello";  // ❌
```

TypeScript מאפשר לזהות הרבה בעיות כבר לפני הריצה.

---

## 2. Compile Time מול Runtime

### Compile Time
השלב שבו TypeScript בודק את הקוד והטיפוסים לפני ההרצה.

```ts
const age: number = "25"; // ❌ Compile Time Error
```

### Runtime
השלב שבו ה-JavaScript בפועל רץ ב-Node או בדפדפן.

TypeScript לא מונע כל Runtime Error.

```text
TypeScript ≠ קוד שלא יכול לקרוס
```

TypeScript עוזר לזהות הרבה שגיאות לפני הריצה, אבל מידע חיצוני עדיין דורש בדיקות Runtime.

---

## 3. TypeScript מתקמפל ל-JavaScript

```text
TypeScript (.ts)
    ↓
Type Checking
    ↓
tsc
    ↓
JavaScript (.js)
    ↓
Node / Browser
```

`tsc` = TypeScript Compiler.

---

## 4. Basic Types

```ts
let age: number = 25;
let username: string = "Matan";
let isAdmin: boolean = true;
```

מערכים:

```ts
const scores: number[] = [90, 85, 100];
const names: string[] = ["Avi", "Dana"];
```

כתיבה חלופית:

```ts
const scores: Array<number> = [90, 85, 100];
```

---

## 5. Type Inference

TypeScript יכול להסיק Type לבד.

```ts
let age = 25;
// number

let username = "Matan";
// string

const scores = [90, 85, 100];
// number[]
```

אין צורך להגדיר Type מפורש בכל מקום אם TypeScript כבר מבין אותו בצורה ברורה.

---

## 6. Union Types

Union מאפשר לכמה Types להיות חוקיים.

```ts
let id: string | number;

id = 123;
id = "A123";
```

מערך עם כמה Types:

```ts
const mixed: (number | string | boolean)[] = [
    1,
    "Avi",
    true
];
```

---

## 7. Literal Types

אפשר להגביל ערך לאפשרויות ספציפיות:

```ts
type Role = "admin" | "developer" | "viewer";

let role: Role = "admin";
```

לא תקין:

```ts
role = "manager"; // ❌
```

Literal Types יוצרים חוזה מדויק יותר מ-`string`.

---

## 8. Functions

```ts
function multiply(a: number, b: number): number {
    return a * b;
}
```

הפרמטרים מטופסים וגם ה-Return Type.

### void

```ts
function printMessage(message: string): void {
    console.log(message);
}
```

`void` = הפונקציה לא מחזירה ערך שימושי.

---

## 9. Optional Parameters ו-Default Parameters

Optional Parameter:

```ts
function greet(name: string, title?: string): string {
    if (title) {
        return `Hello ${title} ${name}`;
    }

    return `Hello ${name}`;
}
```

אפשר לחשוב על:

```ts
title?: string
```

כמו:

```ts
title: string | undefined
```

Default Parameter:

```ts
function greet(
    name: string,
    title: string = "Mr."
): string {
    return `Hello ${title} ${name}`;
}
```

---

## 10. Object Types

```ts
const employee: {
    name: string;
    age: number;
} = {
    name: "Dana",
    age: 25
};
```

כאשר מבנה חוזר על עצמו, עדיף להגדיר Type או Interface.

---

## 11. Type Alias

```ts
type Employee = {
    name: string;
    age: number;
    role: string;
};
```

שימוש:

```ts
const dana: Employee = {
    name: "Dana",
    age: 25,
    role: "Developer"
};
```

יתרון:
משנים את החוזה במקום אחד וכל הקוד שמשתמש בו נבדק בהתאם.

---

## 12. Optional Properties ו-readonly

```ts
type User = {
    readonly id: number;
    name: string;
    email?: string;
};
```

Optional:

```ts
email?: string;
```

Readonly:

```ts
readonly id: number;
```

```ts
user.name = "Dana"; // ✅
user.id = 2;        // ❌
```

`readonly` הוא הגנה ברמת TypeScript ולא Runtime immutability מלאה.

---

## 13. Interface

```ts
interface Employee {
    name: string;
    age: number;
    role: string;
}
```

שימוש:

```ts
const dana: Employee = {
    name: "Dana",
    age: 25,
    role: "Developer"
};
```

---

## 14. type מול interface

לשניהם יש חפיפה גדולה, במיוחד בהגדרת מבני Objects.

### interface

טבעית מאוד עבור Object contracts:

```ts
interface Employee {
    name: string;
    age: number;
}
```

יכולה להתרחב עם `extends`:

```ts
interface TeamLead extends Employee {
    teamSize: number;
}
```

תומכת ב-Declaration Merging:

```ts
interface User {
    name: string;
}

interface User {
    age: number;
}
```

TypeScript ימזג אותן.

### type

כללי וגמיש יותר:

```ts
type Role = "admin" | "developer" | "viewer";
```

Union:

```ts
type ID = string | number;
```

Tuple:

```ts
type Coordinates = [number, number];
```

Composition:

```ts
type TeamLead = Employee & {
    teamSize: number;
};
```

### כלל אצבע

| מצב | כלי מתאים |
|---|---|
| Object contract | `interface` או `type` |
| Object עם extends | לרוב `interface` |
| Union | `type` |
| Tuple | `type` |
| Primitive alias | `type` |
| Declaration Merging | `interface` |

כלל זיכרון:

```text
Object contract → interface
Union / Tuple / Alias → type
```

זה כלל אצבע ולא חוק מוחלט.

---

## 15. Type Narrowing

כאשר יש Union, צריך לפעמים לצמצם את ה-Type.

```ts
function formatValue(value: string | number): string {
    if (typeof value === "string") {
        return value.toUpperCase();
    }

    return value.toFixed(2);
}
```

בענף הראשון:

```text
value → string
```

ובשני:

```text
value → number
```

אפשר להשתמש גם ב:

```ts
Array.isArray(...)
```

ובבדיקות אחרות כדי לצמצם Types.

---

## 16. any

```ts
let value: any = 10;

value = "hello";
value = true;
```

`any` כמעט מבטל את ההגנה של TypeScript.

דוגמה מסוכנת:

```ts
let value: any = 25;

value.toUpperCase();
```

TypeScript עלול לא לעצור אותנו, אבל Runtime יכול לקרוס.

כלל:

```text
הרבה any בקוד → נורה ל-Code Review
```

---

## 17. unknown

```ts
let value: unknown = "hello";
```

אי אפשר להשתמש בו בלי לבדוק קודם:

```ts
if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

הבדל מרכזי:

```text
any     → תעשה כמעט מה שאתה רוצה
unknown → קודם תוכיח לי מה ה-Type
```

כשמידע מגיע ממקור חיצוני ולא ידוע, לרוב `unknown` בטוח יותר מ-`any`.

---

## 18. never

פונקציה שלא מסיימת בצורה רגילה:

```ts
function throwError(message: string): never {
    throw new Error(message);
}
```

או לולאה אינסופית:

```ts
function infiniteLoop(): never {
    while (true) {}
}
```

---

## 19. Tuple

Tuple הוא Array עם סדר ומבנה קבועים.

```ts
const user: [string, number] = ["Matan", 25];
```

```text
index 0 → string
index 1 → number
```

לא תקין:

```ts
const user: [string, number] = [25, "Matan"];
```

### Tuple מול Union Array

```ts
const mixed: (string | number)[] = ["Matan", 25, "Dana", 30];
```

כאן אין משמעות קשיחה לכל index.

לעומת:

```ts
type UserTuple = [string, number];
```

כאן הסדר חשוב.

חידוד:

```ts
number[] // מערך של מספרים
[number] // Tuple של מספר אחד בדיוק
```

---

## 20. Generics

Generic מאפשר לכתוב קוד גמיש בלי לאבד Type Safety.

```ts
function identity<T>(value: T): T {
    return value;
}
```

אם:

```ts
const name = identity("Matan");
```

אז:

```text
T = string
```

אם:

```ts
const age = identity(25);
```

אז:

```text
T = number
```

### כלל עבודה

```text
1. מזהים מה נכנס
2. קובעים מהו T
3. מציבים את T ב-Return Type
```

---

## 21. Generic שמחזיר Array

```ts
function wrap<T>(value: T): T[] {
    return [value];
}
```

```ts
const a = wrap(10);
// number[]

const b = wrap("hello");
// string[]
```

---

## 22. Generic עם Tuple

```ts
function makePair<T>(value: T): [T, T] {
    return [value, value];
}
```

```ts
const first = makePair(7);
// [number, number]

const second = makePair("hello");
// [string, string]
```

---

## 23. Generic עם Object

```ts
function createBox<T>(value: T): { value: T } {
    return { value };
}
```

```ts
const a = createBox(true);
```

Type:

```ts
{
    value: boolean;
}
```

אם:

```ts
const b = createBox({
    id: 1,
    name: "Dana"
});
```

Type:

```ts
{
    value: {
        id: number;
        name: string;
    };
}
```

---

## 24. שני Generic Types

```ts
function combine<T, U>(
    first: T,
    second: U
): {
    first: T;
    second: U;
} {
    return { first, second };
}
```

```ts
const result = combine("Dana", true);
```

Type:

```ts
{
    first: string;
    second: boolean;
}
```

---

## 25. Generic Constraints

לפעמים `T` יכול להיות גנרי, אבל חייב לעמוד בדרישה.

```ts
function printLength<T extends { length: number }>(
    value: T
): void {
    console.log(value.length);
}
```

תקין:

```ts
printLength("hello");
printLength([1, 2, 3]);
```

לא תקין:

```ts
printLength(25);
```

כלל:

```text
<T> → כל Type

<T extends Something>
→ כל Type שעומד בדרישה
```

דוגמה עם Interface:

```ts
interface HasName {
    name: string;
}

function printName<T extends HasName>(item: T): void {
    console.log(item.name);
}
```

האובייקט יכול להכיל שדות נוספים, כל עוד הוא מקיים את הדרישה.

---

## 26. Utility Types

ברמת היכרות:

### Partial

```ts
type PartialUser = Partial<User>;
```

הופך את כל השדות ל-optional.

### Pick

```ts
type UserPreview = Pick<User, "id" | "name">;
```

לוקח רק שדות מסוימים.

### Omit

```ts
type CreateUser = Omit<User, "id">;
```

לוקח הכול חוץ מהשדות שצוינו.

### Readonly

```ts
type ReadonlyUser = Readonly<User>;
```

הופך את כל השדות ל-readonly.

אצלנו Utility Types הם כרגע ברמת היכרות בלבד.

---

## 27. Arrays & Objects

```ts
type Employee = {
    id: number;
    name: string;
    role: string;
};

const employees: Employee[] = [
    {
        id: 1,
        name: "Dana",
        role: "Developer"
    }
];
```

TypeScript בודק שכל איבר במערך מתאים ל-`Employee`.

---

## 28. Nested Types

```ts
type Address = {
    city: string;
    street: string;
};

type Employee = {
    id: number;
    name: string;
    address: Address;
};
```

Types יכולים להיבנות אחד מתוך השני.

---

## 29. undefined כחלק מה-Type

`find()` יכול לא למצוא שום דבר:

```ts
function getEmployeeById(
    employees: Employee[],
    id: number
): Employee | undefined {
    return employees.find(
        employee => employee.id === id
    );
}
```

לכן:

```text
Employee | undefined
```

ולא רק:

```text
Employee
```

אותו עיקרון:

```ts
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}
```

כי מערך יכול להיות ריק.

---

## 30. Runtime Caveats

TypeScript לא קיים בפועל בזמן Runtime.

ה-Types נמחקים בתהליך הקומפילציה.

לכן TypeScript לא באמת מאמת מידע שמגיע מבחוץ:

```text
API
JSON
Database
Form
File
External Service
```

לדוגמה:

```ts
const response = await fetch("/api/user");
const data = await response.json();
```

אי אפשר להניח רק בגלל שיש Type שהמידע באמת עומד בו.

---

## 31. Type Assertion — as

```ts
const user = data as User;
```

`as User` לא מבצע Runtime Validation.

הוא רק אומר ל-TypeScript:

```text
"תתייחס לערך הזה כ-User"
```

כלל חשוב:

```text
as User
≠
Validation
```

שימוש מוגזם ב-`as` יכול לעקוף את ההגנה של TypeScript.

---

## 32. Non-null Assertion

```ts
const element =
    document.getElementById("title")!;
```

`!` אומר ל-TypeScript:

```text
"אני מבטיח שזה לא null או undefined"
```

אבל גם זו לא בדיקת Runtime.

אם ההבטחה לא נכונה, הקוד עדיין יכול לקרוס.

---

## 33. Runtime Validation

כשמידע מגיע מבחוץ, צריך לבדוק אותו בפועל.

```ts
type User = {
    id: number;
    name: string;
};

function isUser(data: unknown): data is User {
    if (typeof data !== "object" || data === null) {
        return false;
    }

    const user = data as Record<string, unknown>;

    return (
        typeof user.id === "number" &&
        typeof user.name === "string"
    );
}
```

לאחר הבדיקה:

```ts
function handleUser(data: unknown) {
    if (!isUser(data)) {
        throw new Error("Invalid user data");
    }

    console.log(data.name.toUpperCase());
}
```

החלק:

```ts
data is User
```

נקרא Type Predicate.

הוא אומר ל-TypeScript:
אם הפונקציה מחזירה `true`, אפשר להתייחס ל-`data` כ-`User`.

בהמשך נלמד Zod כדי לבצע Runtime Validation בצורה מסודרת יותר.

---

# Code Review לרש״צ

## נורה אדומה 1 — any

```ts
function handleUser(data: any) {
```

שאלה:

```text
האם אפשר להשתמש ב-unknown ולבצע Narrowing / Validation?
```

---

## נורה אדומה 2 — as בלי Validation

```ts
const user = data as User;
```

שאלה:

```text
איך אנחנו יודעים שב-Runtime הנתון באמת User?
```

---

## נורה אדומה 3 — Return Type לא מתאר Edge Cases

לא טוב:

```ts
function getFirst<T>(items: T[]): T {
    return items[0];
}
```

כי המערך יכול להיות ריק.

טוב יותר:

```ts
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}
```

---

## נורה אדומה 4 — Union בלי Narrowing

לא תקין:

```ts
function printValue(value: string | number) {
    console.log(value.toUpperCase());
}
```

צריך Narrowing:

```ts
if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

---

# Cheat Sheet

```text
number
string
boolean
```

```ts
number[]
string[]
```

```ts
string | number
```

```ts
type Role =
    "admin" |
    "developer" |
    "viewer";
```

```ts
value?: string
```

```ts
readonly id: number
```

```ts
function fn(): void
```

```ts
function fn<T>(value: T): T
```

```ts
function fn<T extends Constraint>(value: T)
```

```text
any
→ כמעט בלי Type Safety

unknown
→ חייבים לבדוק לפני שימוש

never
→ לא מגיע לסיום רגיל
```

```text
as
→ Type Assertion
→ לא Runtime Validation
```

---

# נקודות שחשוב לזכור

1. TypeScript תופס הרבה שגיאות ב-Compile Time, אבל לא מחליף Runtime Validation.
2. Type Inference מאפשר לא לכתוב Types מפורשים בכל מקום.
3. Union מאפשר כמה Types, Narrowing מאפשר לדעת איזה מהם יש כרגע.
4. Literal Types מגבילים ערכים לאפשרויות ספציפיות.
5. `interface` מתאימה מאוד ל-Object contracts.
6. `type` מתאים במיוחד ל-Unions, Tuples ו-Aliases.
7. `any` עוקף הרבה מההגנה של TypeScript.
8. `unknown` בטוח יותר כשלא יודעים מה הגיע.
9. Generic שומר על הקשר בין ה-Type שנכנס ל-Type שיוצא.
10. Generic Constraint מגביל Generic ל-Types שעומדים בדרישה.
11. `find()` ופעולות דומות יכולות להחזיר `undefined`.
12. `as User` לא מוכיח שהערך באמת User.
13. מידע חיצוני צריך Runtime Validation.
14. Utility Types חשובים להיכרות, אך אינם כרגע מוקד מרכזי אצלנו.
15. ב-Code Review חשוב לבדוק האם ה-Type באמת מתאר את כל המצבים האפשריים.

---

# שאלות שרש״צ צריך לשאול ב-Code Review

- למה השתמשנו כאן ב-`any`?
- האם `unknown` יהיה בטוח יותר?
- האם ה-Union עבר Narrowing לפני שימוש?
- האם Return Type מתאר גם `undefined` / `null` כשצריך?
- האם `as` מסתיר בעיה במקום לפתור אותה?
- האם המידע מגיע מבחוץ ודורש Runtime Validation?
- האם Type/Interface חוזר על עצמו ואפשר ליצור חוזה משותף?
- האם Generic באמת נחוץ או רק מסבך את הקוד?
- האם Constraint יכול להפוך Generic לבטוח יותר?
