# שיעור 01 – תמונת העל של Full Stack

## מטרת השיעור
להבין את המבנה הבסיסי של אפליקציית Web ואת התקשורת בין:
Frontend → Network → Backend → Database

---

## 1. Frontend

צד הלקוח של המערכת.

בדרך כלל רץ בדפדפן ואחראי בין היתר על:
- ממשק המשתמש
- הצגת מידע
- קבלת קלט מהמשתמש
- שליחת Requests לשרת
- קבלת Responses ועדכון המסך

דוגמאות לטכנולוגיות:
- HTML
- CSS
- JavaScript
- TypeScript
- React
- Angular

---

## 2. Backend

צד השרת של המערכת.

אחראי בין היתר על:
- קבלת Requests
- לוגיקה עסקית
- Authentication / Authorization
- Validation
- גישה ל-Database
- החזרת Responses

בשיעור השתמשנו ב-Node.js.

---

## 3. Client / Server

Client = הצד שמבקש מידע או פעולה.

Server = הצד שמקבל את הבקשה, מטפל בה ומחזיר תשובה.

זרימה בסיסית:

Client
  ↓ Request
Server
  ↓ Response
Client

---

## 4. Request / Response

### Request
בקשה שה-Client שולח ל-Server.

בקשה יכולה לכלול:

- Method
- Route
- Headers
- Body

### Response
תשובה שה-Server מחזיר ל-Client. 

Response יכול לכלול:

- Status Code
- Headers
- Body

---

## 5. HTTP Methods

### GET
משמש בדרך כלל לקבלת מידע.

דוגמה:

GET /users

פירוש:
"קבל את רשימת המשתמשים".

### POST
משמש בדרך כלל ליצירת מידע חדש.

דוגמה:

POST /users

עם Body:

{
  "name": "Noa",
  "role": "developer"
}

פירוש:
"צור משתמש חדש עם המידע הזה".

---

## 6. Routes

Route הוא הנתיב שאליו פונים בשרת.

דוגמאות:

/
 /users

אותו Route יכול לבצע פעולות שונות לפי ה-Method:

GET /users
POST /users

Method = מה לבצע  
Route = על איזה משאב

---

## 7. localhost ו-Port

localhost = המחשב המקומי שלי.

לדוגמה:

http://localhost:5000

5000 הוא ה-Port שבו השרת שלנו מאזין לבקשות.

בקוד:

server.listen(5000)

---

## 8. HTTP Status Codes

### 200 OK
הבקשה הצליחה.

### 201 Created
הבקשה הצליחה ונוצר משאב חדש.

### 404 Not Found
ה-Route המבוקש לא קיים.

### 500 Internal Server Error
השרת נכשל בטיפול בבקשה.

חשוב:
500 לא בהכרח אומר שה-Frontend תקין.
צריך לבדוק את כל זרימת הבקשה ואת ה-Backend logs.

---

## 9. Headers

Header מספק מידע נוסף על ה-Request או ה-Response.

דוגמה:

Content-Type: application/json

המשמעות:
גוף ההודעה נמצא בפורמט JSON.

---

## 10. JavaScript Object מול JSON

JavaScript Object:

const user = {
    id: 1,
    name: "Matan"
};

JSON הוא פורמט טקסטואלי להעברת מידע:

{
  "id": 1,
  "name": "Matan"
}

### Object → JSON

JSON.stringify(user)

### JSON → Object

JSON.parse(jsonText)

JSON שימושי להעברת מידע בין מערכות וטכנולוגיות שונות.

---

## 11. Request Body

Body הוא המידע שהבקשה שולחת לשרת.

לדוגמה:

POST /users

Body:

{
  "name": "Dana",
  "role": "developer"
}

אפשר לזכור:

Method = מה לעשות  
Route = על מה  
Body = עם איזה מידע

---

## 12. Database

כרגע שמרנו משתמשים בתוך Array של Node:

const users = [];

המידע נשמר רק בזיכרון של תהליך Node.

כאשר השרת נעצר:
Ctrl + C

המידע שנוסף בזמן הריצה נעלם.

בעתיד נשתמש ב-Database כגון:
- MySQL
- MongoDB

כדי לשמור מידע בצורה מתמשכת.

---

## 13. DB Credentials

DB Credentials הם פרטי הגישה שבהם ה-Backend משתמש כדי להתחבר ל-Database.

לדוגמה:

- Host
- Port
- Database Name
- Username
- Password

אין לשים DB Credentials ב-Frontend, משום שקוד ה-Frontend מגיע למחשב של המשתמש.

---

## 14. Network – היכרות ראשונית

ה-Network מאפשר ל-Client ול-Server להעביר מידע ביניהם.

בהמשך נלמד לעומק:

- DNS
- IP
- TCP
- UDP
- HTTP
- HTTPS
- Ports
- מודל 7 השכבות

---

## 15. Debugging – לקח מהשיעור

במהלך השיעור קיבלנו שגיאה בעת שליחת POST דרך PowerShell.

בהתחלה היה נראה שהשרת אינו עובד, אך בפועל הבעיה הייתה באופן שבו ה-JSON נשלח מה-Client.

לקח:

לא מניחים מראש איפה התקלה.

בודקים את הזרימה:

Frontend / Client
        ↓
Network
        ↓
Backend
        ↓
Database

ומאתרים את המקום שבו המידע נשבר.

---

# התמונה הכוללת

User
 ↓
Browser / Client
 ↓
Frontend
 ↓
HTTP Request
 ↓
Network
 ↓
Backend
 ↓
Business Logic
 ↓
Database
 ↓
Response
 ↓
Frontend
 ↓
User

---

# פקודות שבהן השתמשנו

בדיקת Node:

node -v

בדיקת npm:

npm -v

הרצת קובץ JavaScript:

node index.js

עצירת השרת:

Ctrl + C

---

# משפטי מפתח לזכור

- Frontend מתקשר עם המשתמש.
- Backend מטפל בבקשות ובלוגיקה של המערכת.
- Request יוצא מה-Client.
- Response חוזר מה-Server.
- Method אומר מה רוצים לעשות.
- Route אומר על איזה משאב.
- Body מכיל את המידע.
- JSON הוא פורמט להעברת מידע.
- Database שומר מידע באופן מתמשך.
- לא סומכים על ה-Frontend לצורכי אבטחה.
- בתקלה Full Stack לא מנחשים – עוקבים אחרי הזרימה.