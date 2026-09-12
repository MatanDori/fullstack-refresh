# Lesson 10 — Complexity, Big O & Algorithmic Thinking

## מטרת השיעור
להבין איך מעריכים את העלות של קוד כאשר כמות הנתונים גדלה, ואיך לבחור מבני נתונים ואלגוריתמים בצורה שמתאימה לחשיבה של מפתח ורש״צ.

## 1. מהי Complexity?
Complexity מתארת איך כמות העבודה או הזיכרון של אלגוריתם גדלה ביחס לגודל הקלט. נסמן את גודל הקלט בדרך כלל ב־`n`.

Big O לא אומר כמה מילישניות הקוד ירוץ בפועל, אלא מתאר את **קצב הגדילה** של העבודה כאשר הקלט גדל.

## 2. Time Complexity

### O(1) — Constant Time
```js
function getFirst(users) {
    return users[0];
}
```
גם אם יש 10 משתמשים וגם אם יש מיליון, הגישה לאיבר לפי index נחשבת `O(1)`.

### O(n) — Linear Time
```js
function printUsers(users) {
    for (const user of users) {
        console.log(user.name);
    }
}
```
אם יש `n` משתמשים, נעבור על כולם פעם אחת: `O(n)`.

### O(n²) — Quadratic Time
```js
for (const userA of users) {
    for (const userB of users) {
        console.log(userA.name, userB.name);
    }
}
```
כל איבר מטופל מול כל איבר: `n × n = n²`, ולכן `O(n²)`.

חשוב: לא חייבים לראות שתי לולאות מפורשות כדי לקבל `O(n²)`. אם בתוך לולאה מופעלת פעולה שהיא בעצמה `O(n)`, כמו `includes()`, גם אז ניתן להגיע ל־`O(n²)`.

### O(log n) — Logarithmic Time
מופיע כאשר בכל שלב מקטינים משמעותית את הבעיה, לרוב בערך לחצי.

```text
1000 → 500 → 250 → 125 → ...
```

דוגמה קלאסית: Binary Search. בדרך כלל נדרש מידע **ממויין**.

### O(n log n)
נפוץ באלגוריתמי מיון יעילים. הוא גדל מהר יותר מ־`O(n)`, אבל משמעותית לאט יותר מ־`O(n²)`.

## 3. חיבור סיבוכיויות והגורם הדומיננטי
כאשר פעולות מתבצעות אחת אחרי השנייה, מחברים את העלויות ואז משאירים את החלק שגדל הכי מהר.

```text
O(1) + O(n) → O(n)
O(n²) + O(n) + O(1) → O(n²)
O(n) + O(n log n) → O(n log n)
```

### Drop Constants
קבועים אינם משנים את קצב הגדילה:

```text
O(2n) → O(n)
O(10n) → O(n)
O(n / 2) → O(n)
```

### כלל זיכרון
בפעולות עוקבות:
1. מחברים.
2. מתעלמים מקבועים.
3. משאירים את הגורם הדומיננטי.

## 4. כמה Inputs שונים
אם יש שני Inputs שונים, לא תמיד נכון להפוך את שניהם ל־`n`.

```js
for (const user of users) {
    // ...
}

for (const product of products) {
    // ...
}
```

אם `users.length = n` ו־`products.length = m`, נקבל `O(n + m)`.

אם יש לולאה על `n` ובתוכה עבודה על `m`, נקבל `O(n × m)`.

אם `n ≈ m`, אפשר לתאר זאת כ־`O(n²)`. אם `m` קבוע, למשל תמיד 10, אז `O(n × 10) → O(n)`.

## 5. Best / Average / Worst Case
```js
function findUser(users, targetName) {
    for (const user of users) {
        if (user.name === targetName) {
            return user;
        }
    }
    return null;
}
```

- Best Case: נמצא ראשון → `O(1)`
- Average Case: עוברים על חלק משמעותי מהמערך → `O(n)`
- Worst Case: נמצא אחרון או לא קיים → `O(n)`

ב־Code Review חשוב במיוחד להבין מה קורה בתרחיש הגרוע ביותר.

## 6. Space Complexity
Space Complexity מתארת כמה **זיכרון נוסף** האלגוריתם צורך.

### O(1) Space
```js
function getFirst(numbers) {
    const first = numbers[0];
    return first;
}
```
נוצר מספר קבוע של משתנים: `O(1)`.

### O(n) Space
```js
function doubleNumbers(numbers) {
    const result = [];
    for (const number of numbers) {
        result.push(number * 2);
    }
    return result;
}
```
נוצר Array חדש שגדל יחד עם הקלט: `O(n)`.

## 7. Auxiliary Space
בדרך כלל מתעניינים בזיכרון **הנוסף** שהאלגוריתם יוצר מעבר לקלט שכבר קיבל.

## 8. Time-Space Trade-off
לעיתים משתמשים ביותר זיכרון כדי לחסוך זמן.

```js
const sorted = [...numbers].sort((a, b) => a - b);
```

ה־Spread יוצר Array חדש ולכן מוסיף `O(n)` Space, אבל שומר על Immutability ולא משנה את המקור.

אין תמיד פתרון "הכי טוב" — יש Trade-off בין ביצועים, זיכרון, קריאות ובטיחות.

## 9. Complexity של פעולות Array נפוצות

| פעולה | Complexity טיפוסית |
|---|---:|
| `arr[index]` | `O(1)` |
| `push()` | `O(1)` בדרך כלל |
| `pop()` | `O(1)` |
| `shift()` | `O(n)` |
| `unshift()` | `O(n)` |
| `includes()` | `O(n)` |
| `indexOf()` | `O(n)` |
| `find()` | `O(n)` |
| `some()` | `O(n)` Worst Case |
| `every()` | `O(n)` Worst Case |
| `map()` | `O(n)` |
| `filter()` | `O(n)` |
| `reduce()` | `O(n)` |
| `slice()` | `O(k)` לפי מספר האיברים המועתקים |
| `splice()` | עד `O(n)` |
| `sort()` | בדרך כלל נחשוב על סדר גודל של `O(n log n)` |

## 10. פעולה יקרה בתוך לולאה
```js
for (const user of users) {
    if (blockedUsers.includes(user.id)) {
        console.log("Blocked");
    }
}
```

אם `users.length = n` ו־`blockedUsers.length = m`:

```text
loop       → O(n)
includes() → O(m)
סה"כ       → O(n × m)
```

אם שתי הרשימות בערך באותו גודל: `O(n²)`.

חשוב: צריך להבין מה הפעולות שבתוך הלולאה עושות, ולא רק לספור `for`.

## 11. Set
`Set` שומר ערכים ייחודיים.

```js
const numbers = new Set([10, 20, 30]);
```

פעולות מרכזיות הן בממוצע:

```text
add()    → O(1)
has()    → O(1)
delete() → O(1)
```

### שיפור חיפוש
```js
function findBlockedUsers(users, blockedIds) {
    const blockedSet = new Set(blockedIds);
    return users.filter(user => blockedSet.has(user.id));
}
```

אם `users.length = n` ו־`blockedIds.length = m`:

```text
בניית Set → O(m)
filter    → O(n)
סה"כ      → O(n + m)
```

במקום `O(n × m)` בגישה עם `includes()`.

המחיר: Space נוסף של `O(m)`.

## 12. Map
`Map` שומר `key → value`.

```js
const usersById = new Map();
usersById.set(1, { name: "Avi" });
usersById.set(2, { name: "Dana" });
usersById.get(2);
```

פעולות מרכזיות בממוצע:

```text
set()    → O(1)
get()    → O(1)
has()    → O(1)
delete() → O(1)
```

### בניית Map
```js
function buildUserMap(users) {
    const usersById = new Map();
    for (const user of users) {
        usersById.set(user.id, user);
    }
    return usersById;
}
```

```text
Time  → O(n)
Space → O(n)
```

הרעיון: משקיעים פעם אחת בבניית מבנה נתונים כדי לקבל חיפושים מהירים אחר כך.

## 13. Linear Search
```js
function linearSearch(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
            return i;
        }
    }
    return -1;
}
```

```text
Best Case  → O(1)
Worst Case → O(n)
```

יתרון: המידע לא חייב להיות ממוין.

## 14. Binary Search
Binary Search עובד על מידע ממויין ומצמצם בכל שלב בערך חצי מהאפשרויות.

```text
Worst Case → O(log n)
```

### חידוד חשוב
אם המערך **לא ממוין** ויש צורך בחיפוש אחד בלבד:

```text
Sort + Binary Search:
O(n log n) + O(log n)
→ O(n log n)
```

לעומת:

```text
Linear Search:
O(n)
```

לכן בדרך כלל לחיפוש אחד על מידע לא ממוין עדיף Linear Search.

אם המידע כבר ממוין, או שמתוכננים המון חיפושים, Binary Search עשוי להיות משתלם מאוד.

כרש״צ צריך לשאול: **מה עלות ההכנה של הנתונים וכמה פעמים הפעולה תתבצע?**

## 15. Sorting Complexity
מיון דורש השוואות וסידור של האיברים.

- Bubble Sort → עד `O(n²)`
- Merge Sort → `O(n log n)`
- Quick Sort → Average `O(n log n)`, Worst `O(n²)`

לצורך חשיבת Complexity בשיעור נתייחס בדרך כלל ל־JavaScript `sort()` כ־`O(n log n)`, אך פרטי המימוש תלויים במנוע JavaScript.

```js
const sorted = [...numbers].sort((a, b) => a - b);
```

```text
Time:  O(n) + O(n log n) → O(n log n)
Space: O(n) בגלל העותק
```

## 16. Code Review — מעבר מ־O(n²) ל־O(n)
קוד בעייתי:

```js
function findCommonUsers(teamA, teamB) {
    const common = [];

    for (const userA of teamA) {
        for (const userB of teamB) {
            if (userA.id === userB.id) {
                common.push(userA);
            }
        }
    }

    return common;
}
```

אם `teamA.length = n` ו־`teamB.length = m`:

```text
O(n × m)
```

ואם `n ≈ m`: `O(n²)`.

### שיפור עם Set
```js
function findCommonUsers(teamA, teamB) {
    const teamBIds = new Set(
        teamB.map(user => user.id)
    );

    return teamA.filter(user =>
        teamBIds.has(user.id)
    );
}
```

```text
Time  → O(n + m)
Space → O(m)
```

אם הרשימות באותו סדר גודל, מבחינת קצב הגדילה אפשר לחשוב על המעבר כ־`O(n²) → O(n)`.

# כללי אצבע לרש״צ
- אל תסתכל רק על מספר הלולאות — בדוק גם מה כל פעולה בתוך הלולאה עושה.
- `includes`, `find`, `filter`, `map` וכדומה יכולים להסתיר מעבר על Array.
- Nested loops על שני Inputs שונים הן `O(n × m)`, לא אוטומטית `O(n²)`.
- בפעולות עוקבות מחברים ואז משאירים את הגורם הדומיננטי.
- קבועים לא משנים Big O.
- `Set` ו־`Map` יכולים לשפר משמעותית חיפושים חוזרים.
- שיפור Time Complexity יכול לדרוש יותר Space.
- Binary Search מהיר, אבל צריך להביא בחשבון את עלות המיון.
- אופטימיזציה צריכה להיות מוצדקת לפי גודל הנתונים והשימוש האמיתי.

# Cheat Sheet
```text
O(1)       → קבוע
O(log n)   → מצמצמים את הבעיה בכל שלב
O(n)       → מעבר אחד על הקלט
O(n log n) → מיון יעיל / אלגוריתמים יעילים מסוימים
O(n²)      → כל איבר מול כל איבר
```

```text
O(1) < O(log n) < O(n) < O(n log n) < O(n²)
```

# שאלות שכדאי לשאול ב־Code Review
1. מה קורה כאשר כמות הנתונים גדלה פי 100?
2. האם קיימת פעולה `O(n)` בתוך לולאה?
3. האם אפשר להשתמש ב־`Set` או `Map` עבור lookup מהיר?
4. האם יש שני Inputs שונים שצריך לסמן כ־`n` ו־`m`?
5. האם אני משלם על מיון רק כדי לבצע חיפוש אחד?
6. האם שיפור הזמן מצדיק את הזיכרון הנוסף?
7. האם האופטימיזציה באמת נחוצה, או שהיא רק הופכת את הקוד למסובך יותר?

## נקודות מרכזיות מהשיעור
- Big O מודד קצב גדילה ולא זמן מוחלט.
- Time ו־Space הן שתי עלויות שונות.
- הגורם הדומיננטי קובע את Big O הסופי.
- `O(n) + O(n log n)` הוא `O(n log n)`, לא `O(n)`.
- `Set.has()` ו־`Map.get()` נחשבים `O(1)` בממוצע.
- אפשר לשפר קוד מ־`O(n × m)` ל־`O(n + m)` על ידי בחירת מבנה נתונים מתאים.
- לפני שבוחרים אלגוריתם, צריך להבין את הנתונים, כמות הפעולות והעלות של שלבי ההכנה.
