# Lesson 7 — JavaScript Basic II

## מטרת השיעור
העמקה ב-JavaScript המודרני וחיבור בין עבודה עם Arrays, DOM, Forms, JSON, Storage ו-Async בסיסי.

---

# Array Methods מתקדמים

## reduce()
`reduce()` עובר על מערך ומצמצם אותו לערך אחד.

```js
const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((acc, number) => {
    return acc + number;
}, 0);
```

כלל:
```text
acc → הערך המצטבר
current → האיבר הנוכחי
initial value → הערך ההתחלתי של accumulator
```

שימושים נפוצים:
- סכום
- ספירה
- בניית Object
- קיבוץ מידע

## slice()
מחזיר חלק ממערך חדש, בלי לשנות את המערך המקורי.

```js
const numbers = [1, 2, 3, 4, 5];
const part = numbers.slice(1, 4);
// [2, 3, 4]
```

## splice()
משנה את המערך המקורי: מחיקה, החלפה או הוספה.

```js
const numbers = [1, 2, 3, 4];
numbers.splice(1, 2);
// numbers = [1, 4]
```

כלל:
```text
slice  → לא משנה את המקור
splice → משנה את המקור
```

## sort()
ממיין מערך. חשוב לזכור שהוא משנה את המערך המקורי.

במספרים:
```js
const numbers = [10, 2, 30, 4];
numbers.sort((a, b) => a - b);
```

עולה:
```js
a - b
```

יורד:
```js
b - a
```

---

# Destructuring

## Object Destructuring
```js
const user = {
    name: "Matan",
    age: 20
};

const { name, age } = user;
```

## Array Destructuring
```js
const numbers = [10, 20, 30];
const [first, second] = numbers;
```

---

# Optional Chaining

`?.` מאפשר גישה בטוחה ל-property שאולי לא קיים.

```js
const city = user.address?.city;
```

במקום לקבל שגיאה, נקבל `undefined` אם `address` לא קיים.

# Nullish Coalescing

`??` נותן ערך חלופי רק במקרה של `null` או `undefined`.

```js
const username = user.name ?? "Guest";
```

חשוב:
```text
?? לא מחליף 0, false או ""
```

---

# DOM Events

## addEventListener()
מאפשר להאזין לאירועים בדפדפן.

```js
const button = document.querySelector("#saveBtn");

button.addEventListener("click", () => {
    console.log("Saving...");
});
```

מבנה:
```text
element.addEventListener("event", callback)
```

אירועים נפוצים:
- `click`
- `submit`
- `input`
- `change`
- `keydown`

## Event Object
הדפדפן מעביר מידע על האירוע ל-callback.

```js
button.addEventListener("click", (event) => {
    console.log(event);
});
```

`event` ו-`e` הם שמות מקובלים לפרמטר.

## event.target
מצביע על האלמנט שעליו התרחש האירוע.

```js
button.addEventListener("click", (event) => {
    event.target.textContent = "Liked!";
});
```

---

# Forms

## submit
עדיף להאזין ל-`submit` של הטופס ולא רק ל-`click` של הכפתור.

```js
const form = document.querySelector("#loginForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();
});
```

## preventDefault()
מונע מהדפדפן לבצע את התנהגות ברירת המחדל של האירוע.

בטופס: מונע את השליחה/ניווט הרגילים כדי שנוכל לטפל בפעולה באמצעות JavaScript.

## input.value
```js
const input = document.querySelector("#nameInput");
console.log(input.value);
```

## דוגמה — שני Inputs
```js
const form = document.querySelector("#userForm");
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(`${firstName.value} ${lastName.value}`);
});
```

---

# JSON

JSON הוא פורמט טקסטואלי לשמירה והעברת מידע.

## JSON.stringify()
JavaScript Object / Array → JSON string

```js
const user = {
    name: "Matan",
    age: 20
};

const jsonUser = JSON.stringify(user);
```

## JSON.parse()
JSON string → JavaScript Object / Array

```js
const newUser = JSON.parse(jsonUser);
```

בדיקת Type:
```js
console.log(typeof user);     // object
console.log(typeof jsonUser); // string
console.log(typeof newUser);  // object
```

---

# Local Storage

`localStorage` מאפשר לשמור מידע בדפדפן גם אחרי refresh.

## שמירה
```js
localStorage.setItem("username", "Matan");
```

## שליפה
```js
const username = localStorage.getItem("username");
```

## מחיקה
```js
localStorage.removeItem("username");
```

## ניקוי כל האחסון
```js
localStorage.clear();
```

חשוב:
```text
localStorage שומר Strings בלבד
```

לכן עם Objects משתמשים ב-JSON:

```js
const settings = {
    theme: "dark",
    notifications: true
};

localStorage.setItem("settings", JSON.stringify(settings));

const savedSettings = JSON.parse(
    localStorage.getItem("settings")
);
```

## פירוק לשלבים לצורך קריאות ודיבוג
```js
const json = JSON.stringify(settings);
localStorage.setItem("settings", json);

const savedJson = localStorage.getItem("settings");
const savedSettings = JSON.parse(savedJson);
```

`setItem()` לא מחזיר את הערך ששמרנו; הוא מחזיר `undefined`.

## מפתח שלא קיים
```js
localStorage.getItem("missingKey");
// null
```

אפשר לתת fallback:
```js
const user = JSON.parse(localStorage.getItem("user")) ?? {};
```

---

# Timers

## setTimeout()
מריץ callback פעם אחת לאחר זמן מסוים.

```js
setTimeout(() => {
    console.log("Done!");
}, 3000);
```

```text
1000ms = 1 second
```

## setInterval()
מריץ callback שוב ושוב לפי interval.

```js
setInterval(() => {
    console.log("Tick!");
}, 2000);
```

## עצירה
```js
const intervalId = setInterval(() => {
    console.log("Tick!");
}, 2000);

clearInterval(intervalId);
```

עבור timeout:
```js
clearTimeout(timeoutId);
```

---

# Sync vs Async

## Synchronous
קוד רגיל רץ שורה אחר שורה.

```js
console.log("A");
console.log("B");
console.log("C");
```

פלט:
```text
A
B
C
```

## Asynchronous
```js
console.log("A");

setTimeout(() => {
    console.log("B");
}, 2000);

console.log("C");
```

פלט:
```text
A
C
B
```

גם עם `0ms`:
```js
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");
```

עדיין:
```text
A
C
B
```

העיקרון: הקוד הסינכרוני הנוכחי מסתיים לפני שה-callback של `setTimeout` מתבצע.

---

# תרגיל מסכם

HTML:
```html
<form id="profileForm">
    <input id="nameInput" type="text">
    <input id="cityInput" type="text">
    <button type="submit">Save</button>
</form>
```

JavaScript:
```js
const form = document.querySelector("#profileForm");
const input = document.querySelector("#nameInput");
const input2 = document.querySelector("#cityInput");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const profile = {
        name: input.value,
        city: input2.value
    };

    localStorage.setItem("profile", JSON.stringify(profile));

    setTimeout(() => {
        console.log("Profile saved!");
    }, 2000);
});
```

התרגיל שילב:
```text
Forms
→ Events
→ preventDefault
→ input.value
→ Object
→ JSON.stringify
→ localStorage
→ setTimeout
```

---

# חידודים מהתרגול

- קודם בוחרים אלמנט מה-DOM, ורק אז ניתן לחבר אליו `addEventListener()`.
- אין צורך לבצע `querySelector` נוסף בתוך callback אם כבר יש reference לאלמנט או שניתן להשתמש ב-`event.target`.
- ב-Forms עדיף להאזין ל-`submit`, משום שהטופס יכול להישלח גם דרך Enter.
- `localStorage.setItem()` מקבל שני פרמטרים: `key`, `value`.
- Object צריך לעבור `JSON.stringify()` לפני שמירתו ב-Local Storage.
- `setTimeout()` = פעם אחת; `setInterval()` = שוב ושוב.
- `setInterval()` ממשיך עד שהוא נעצר.
- ב-Async, callback מתוזמן אינו עוצר את המשך הקוד הסינכרוני.

---

# שאלות הסגירה — תשובות

## 1. stringify לעומת parse
```text
JSON.stringify() → Object/Array ל-JSON string
JSON.parse()     → JSON string בחזרה ל-JavaScript value
```

## 2. למה stringify לפני Local Storage?
כי Local Storage שומר strings בלבד.

## 3. מה עושה preventDefault()?
מונע את התנהגות ברירת המחדל של הדפדפן עבור האירוע ומאפשר ל-JavaScript לטפל בפעולה.

## 4. setTimeout לעומת setInterval
```text
setTimeout  → פעם אחת לאחר השהיה
setInterval → שוב ושוב במרווח קבוע עד עצירה
```

## 5. סדר הריצה
```js
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");
```

פלט:
```text
A
C
B
```

---

# Team Lead Thinking

ברמת רש״צ, מעבר לכתיבת הקוד חשוב להבין ולבדוק:

1. האם הקוד משנה state או יוצר ערך חדש?
2. האם נבחר method מתאים (`slice` מול `splice`, למשל)?
3. האם יש side effect כמו DOM, Storage או Timer?
4. האם Event Listener מחובר לאלמנט ולאירוע הנכונים?
5. האם Form מטופל דרך `submit` ובמידת הצורך עם `preventDefault()`?
6. האם המידע הנשמר ב-Storage עובר serialization / deserialization נכון?
7. האם הקוד מתמודד עם מצב שבו נתון לא קיים (`null` / `undefined`)?
8. האם פעולה אסינכרונית משפיעה על סדר הריצה או על state משותף?
9. האם Timer שנוצר צריך גם מנגנון עצירה?
10. האם אפשר לפצל expression מורכב למשתני ביניים כדי לשפר קריאות ודיבוג?

---

# Quick Reference

```text
reduce     → צמצום Array לערך אחד
slice      → חלק חדש, בלי mutation
splice     → משנה את Array המקור
sort       → ממיין ומשנה את המקור

?.         → גישה בטוחה
??         → fallback ל-null / undefined

addEventListener → האזנה לאירוע
event.target     → האלמנט שעליו התרחש האירוע
preventDefault   → ביטול ברירת המחדל של הדפדפן
input.value      → ערך משדה קלט

JSON.stringify → JS → string
JSON.parse     → string → JS

setItem       → שמירה ב-localStorage
getItem       → שליפה
removeItem    → מחיקה
clear         → ניקוי הכול

setTimeout    → פעם אחת
setInterval   → שוב ושוב

Sync  → רץ עכשיו, לפי הסדר
Async → פעולה יכולה להסתיים בהמשך
```

# Lesson 7 — תמ״צ

✅ `reduce()`  
✅ `slice()`  
✅ `splice()`  
✅ `sort()`  
✅ Destructuring  
✅ Optional Chaining `?.`  
✅ Nullish Coalescing `??`  
✅ DOM Events  
✅ `addEventListener()`  
✅ Event Object  
✅ `event.target`  
✅ `preventDefault()`  
✅ Forms  
✅ `input.value`  
✅ JSON / `stringify` / `parse`  
✅ Local Storage  
✅ `setTimeout()` / `setInterval()`  
✅ Sync vs Async בסיסי  
✅ תרגיל מסכם  
✅ שאלות סגירה  

## להמשך
יום 8 — המשך תוכנית ההכשרה לרש״צ פיתוח. בתחילת היום נעשה תמ״צ קצרה של הנושאים ונמשיך לפי הסילבוס.
