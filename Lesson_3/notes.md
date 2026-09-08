# Lesson 03 — HTML & CSS

## מטרת השיעור
רענון יסודות HTML ו-CSS, עבודה עם DOM, Box Model, Flexbox, Grid ו-Responsive Design.

## 1. מבנה בסיסי של HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Full Stack Refresh</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
</body>
</html>
```

- `<!DOCTYPE html>` — מציין HTML5.
- `<html>` — האלמנט הראשי.
- `lang="en"` — `lang` הוא Attribute, ו-`en` הוא Value.
- `<head>` — מידע על המסמך.
- `<meta charset="UTF-8">` — קידוד תווים.
- `<meta name="viewport"...>` — התאמה נכונה למסכים ניידים.
- `<title>` — שם הלשונית.
- `<link>` — חיבור CSS.
- `<body>` — התוכן המוצג.

## 2. תגיות HTML נפוצות

| תגית | שימוש |
|---|---|
| `<h1>`–`<h6>` | כותרות |
| `<p>` | פסקה |
| `<a>` | קישור |
| `<img>` | תמונה |
| `<div>` | Container כללי |
| `<span>` | Container בתוך שורה |
| `<ul>` | רשימה לא ממוספרת |
| `<ol>` | רשימה ממוספרת |
| `<li>` | פריט ברשימה |
| `<header>` | אזור פתיחה/כותרת |
| `<nav>` | ניווט |
| `<main>` | תוכן מרכזי |
| `<section>` | אזור תוכן סמנטי |
| `<article>` | יחידת תוכן עצמאית |
| `<aside>` | תוכן צדדי |
| `<footer>` | תחתית |
| `<form>` | טופס |
| `<label>` | תווית לשדה |
| `<input>` | שדה קלט |
| `<textarea>` | טקסט רב-שורות |
| `<select>` | רשימה נפתחת |
| `<option>` | אפשרות בתוך select |
| `<button>` | כפתור |
| `<table>` | טבלה |
| `<tr>` | שורה בטבלה |
| `<th>` | תא כותרת |
| `<td>` | תא רגיל |
| `<video>` | וידאו |
| `<audio>` | אודיו |
| `<script>` | JavaScript |
| `<link>` | חיבור משאב חיצוני |

`div` הוא כללי, בעוד `section`, `article`, `nav`, `header`, `footer` הם Semantic Tags.

`alt` בתמונה מספק תיאור לנגישות ובמקרה שהתמונה לא נטענת.

## 3. Forms

```html
<form>
    <label for="email">Email:</label>
    <input id="email" type="email" name="email" required>

    <label for="password">Password:</label>
    <input id="password" type="password" name="password" required minlength="6">

    <button type="submit">Login</button>
</form>
```

Input types נפוצים: `text`, `email`, `password`, `number`, `checkbox`.

Frontend Validation משפר UX, אבל אינו אבטחה. ה-Backend חייב לבצע Validation בעצמו.

## 4. DOM

הדפדפן הופך את ה-HTML לעץ בזיכרון שנקרא DOM.

```javascript
const title = document.getElementById("title");
const button = document.getElementById("change-button");

button.addEventListener("click", () => {
    title.textContent = "Hello Full Stack";
});
```

JavaScript משנה את ה-DOM בזיכרון הדפדפן, לא את קובץ ה-HTML בדיסק.

## 5. CSS Selectors

```css
p {
    color: gray;
}

.highlight {
    font-weight: bold;
}

#title {
    color: green;
}
```

- `p` — Tag Selector
- `.highlight` — Class Selector
- `#title` — ID Selector

## 6. Cascade & Specificity

בבסיס:

```text
Tag < Class < ID
```

כאשר ה-Specificity זהה, בדרך כלל הכלל שמופיע מאוחר יותר מנצח.

## 7. Box Model

```text
Margin
  Border
    Padding
      Content
```

- `Content` — התוכן.
- `Padding` — רווח בין התוכן ל-Border.
- `Border` — המסגרת.
- `Margin` — רווח חיצוני מול אלמנטים אחרים.

```css
* {
    box-sizing: border-box;
}
```

עם `border-box`, הרוחב שהוגדר כולל Padding ו-Border.

## 8. יחידות CSS

- `px` — CSS Pixels.
- `%` — יחסי ל-Containing Block בהתאם ל-Property.
- `rem` — יחסי ל-font-size של `<html>`.
- `vh` — אחוז מגובה ה-Viewport.
- `vw` — אחוז מרוחב ה-Viewport.

## 9. Flexbox

Flexbox מתאים בעיקר לסידור לאורך ציר אחד.

```css
.container {
    display: flex;
}
```

### צירים

`flex-direction: row`:
- Main Axis — אופקי
- Cross Axis — אנכי

`flex-direction: column`:
- Main Axis — אנכי
- Cross Axis — אופקי

כלל מפתח:

```text
justify-content → Main Axis
align-items     → Cross Axis
```

### justify-content

```css
justify-content: flex-start;
justify-content: center;
justify-content: flex-end;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;
```

### align-items

```css
align-items: flex-start;
align-items: center;
align-items: flex-end;
align-items: stretch;
```

### gap

```css
.container {
    display: flex;
    gap: 16px;
}
```

### flex-wrap

```css
flex-wrap: wrap;
```

כשאין מקום, Items נוספים יכולים לעבור לשורה הבאה.

### flex-basis / grow / shrink

```text
flex-basis  = גודל התחלתי
flex-grow   = חלוקת מקום פנוי
flex-shrink = התכווצות כשאין מקום
```

```css
.item {
    flex: 1 1 200px;
}
```

הסדר הוא: `grow shrink basis`.

## 10. CSS Grid

Grid מתאים בעיקר לסידור דו-ממדי — שורות ועמודות.

```css
.grid-container {
    display: grid;
}
```

### Columns

```css
grid-template-columns: 1fr 2fr 1fr;
```

היחס הוא `1:2:1`.

### repeat

```css
grid-template-columns: repeat(3, 1fr);
```

### Rows

```css
grid-template-rows: 100px 200px;
```

### span

```css
.item {
    grid-column: span 2;
}
```

### Grid Lines

Grid של 3 עמודות כולל 4 קווים:

```text
1      2      3      4
| col  | col  | col  |
```

```css
grid-column: 1 / 3;
```

תופס 2 עמודות.

```css
grid-column: 1 / -1;
```

מהקו הראשון ועד האחרון.

## 11. Responsive Grid

```css
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
}
```

- `auto-fit` — מכניס כמה עמודות שאפשר.
- `minmax(220px, 1fr)` — כל עמודה לפחות `220px`, ויכולה לגדול ולחלוק את המקום.

## 12. Responsive Design & Media Queries

```css
@media (max-width: 600px) {
    header {
        flex-direction: column;
    }
}
```

- `max-width: 600px` — 600px ומטה.
- `min-width: 768px` — 768px ומעלה.

### Mobile First

```css
.container {
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .container {
        flex-direction: row;
    }
}
```

## 13. Flexbox מול Grid

Flexbox — בעיקר סידור חד-ממדי: שורה או עמודה.

Grid — סידור דו-ממדי: שורות ועמודות.

הערה: Grid אינו "טבלה". לנתונים טבלאיים אמיתיים עדיין משתמשים ב-HTML Table.

## 14. תרגיל מסכם

נבנה Responsive Dashboard עם:
- `header`
- `nav`
- `section.cards`
- `article.card`
- Grid רספונסיבי
- Flexbox לכפתורים
- `gap`
- `padding`
- `border`
- `box-sizing: border-box`
- Media Query לשינוי Header מ-row ל-column

## משפטי מפתח

```text
Padding = רווח פנימי בין Content ל-Border
Margin = רווח חיצוני מה-Border
```

```text
Flexbox = בעיקר ציר אחד
Grid = שורות + עמודות
```

```text
justify-content = Main Axis
align-items = Cross Axis
```

```text
flex-direction קובע את כיוון ה-Main Axis
```

```text
grid-column: 1 / 3 = שתי עמודות
```

```text
@media (max-width: 600px) = 600px ומטה
```

## הערת רש"צ

המטרה אינה לזכור כל Property בעל-פה. חשוב לדעת לזהות את סוג ה-Layout, להבין Parent/Children, לדעת איזה Property שולט בציר/גודל/רווח/Responsive, ולדעת לחקור בעיית Layout דרך DevTools.