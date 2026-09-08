# שיעור 02 – יסודות ה-Web

## מטרת השיעור
להבין כיצד הדפדפן והשרת מתקשרים בעולם ה-Web,
מהו HTTP, כיצד בנויים Request ו-Response,
מה ההבדל בין HTTP ל-HTTPS,
ומה התפקיד של Web Server, FTP, תקינה, XML ו-JSON.

---

# 1. מבנה של URL

דוגמה:

http://localhost:5000/users

פירוק:

http        = Protocol
localhost   = Host
5000        = Port
/users      = Route / Path

אפשר לזכור:

Host + Port = לאיזה Server להגיע
Route       = לאיזה נתיב בתוך ה-Server לפנות

דוגמה:

https://example.com/users

https       = Protocol
example.com = Host
/users      = Route

---

# 2. Protocol

Protocol הוא אוסף כללים מוסכם שמגדיר כיצד שני צדדים מתקשרים.

לדוגמה:
Client ו-Server צריכים להסכים כיצד נראית בקשה,
כיצד נראית תשובה,
וכיצד מעבירים מידע ביניהם.

---

# 3. HTTP

HTTP = Hypertext Transfer Protocol

HTTP מגדיר את הדרך שבה Client ו-Server מתקשרים בעולם ה-Web.

המודל הבסיסי:

Client
  ↓
HTTP Request
  ↓
Server
  ↓
HTTP Response
  ↓
Client

HTTP אינו כל ה-Network.

בצורה מפושטת:

HTTP
 ↓
TCP
 ↓
IP
 ↓
Network

אפשר לזכור:

HTTP = מה אומרים
TCP/IP = איך המידע מגיע

---

# 4. HTTP Request

Request הוא בקשה שה-Client שולח ל-Server.

Request יכול לכלול:

- Method
- URL / Route
- Headers
- Body

דוגמה:

POST /users

Header:

Content-Type: application/json

Body:

{
  "name": "Dana"
}

אפשר לזכור:

Method = מה לעשות
Route  = על איזה משאב
Header = מידע נוסף על הבקשה
Body   = הנתונים עצמם

---

# 5. HTTP Response

Response הוא מה שה-Server מחזיר ל-Client.

Response יכול לכלול:

- Status Code
- Headers
- Body

דוגמה:

201 Created

Header:

Content-Type: application/json

Body:

{
  "message": "User created"
}

---

# 6. HTTP Status Codes

## 200 OK

הבקשה טופלה בהצלחה.

## 201 Created

הבקשה הצליחה ונוצר משאב חדש.

## 404 Not Found

השרת קיבל את הבקשה,
אך לא מצא את ה-Route או המשאב המבוקש.

דוגמה:

GET /pizza
→ 404

## 500 Internal Server Error

השרת קיבל את הבקשה,
ניסה לטפל בה,
אך משהו נכשל במהלך הטיפול.

חשוב:

500 לא אומר שהשרת לא מגיב.

אם קיבלנו 500,
השרת כן החזיר Response,
אבל נכשל בטיפול בבקשה.

---

# 7. Network Tab

ב-Chrome:

F12
→ Network

ה-Network Tab מאפשר לראות בפועל את התקשורת בין ה-Client ל-Server.

דברים חשובים לבדיקה:

- האם Request בכלל נשלח?
- Request URL
- Request Method
- Status Code
- Request Headers
- Response Headers
- Request Body / Payload
- Response

דוגמה שראינו:

GET /users
→ 200 OK

לעומת:

GET /pizza
→ 404 Not Found

---

# 8. Debugging באמצעות Network

במקום לנחש איפה התקלה:

האם Request יצא?
        ↓
לאן הוא נשלח?
        ↓
איזה Method נשלח?
        ↓
איזה Status חזר?
        ↓
מה חזר ב-Response?

דוגמאות:

אין Request
→ חשד ל-Frontend

404
→ Route / resource לא נמצא

500
→ ה-Server נכשל בטיפול בבקשה

200 + JSON תקין + מסך ריק
→ חשד ראשוני ל-Frontend

עיקרון:

קודם אוספים עובדות,
אחר כך מסיקים איפה התקלה.

---

# 9. Web Server

Web Server הוא תוכנה שמקבלת HTTP Requests
ומחזירה HTTP Responses.

בשיעור 1 יצרנו Web Server קטן עם Node:

const server = http.createServer((request, response) => {
    // ...
});

server.listen(5000);

Server אינו בהכרח מחשב פיזי.

שרת יכול להיות תהליך / תוכנה
שרצה למשל על:

- מחשב פיזי
- VM
- Cloud
- Container

---

# 10. Web Server מול Backend

Web Server עוסק בעיקר בתקשורת HTTP.

Backend עוסק בלוגיקה של צד השרת.

דוגמה:

POST /users
      ↓
Web Server
מקבל את Request
      ↓
Backend Logic
יוצר משתמש,
בודק הרשאות,
מבצע Validation,
ניגש ל-Database
      ↓
Web Server
מחזיר HTTP Response

אפשר לזכור:

Web Server = תקשורת HTTP
Backend    = לוגיקת צד שרת

---

# 11. Browser

הדפדפן אינו רק כלי להצגת אתר.

הוא גם:

- מציג HTML
- טוען CSS
- מריץ JavaScript
- מריץ React / Frontend
- שולח HTTP Requests
- מקבל Responses
- מנהל Cookies ו-Storage
- מספק כלי Debugging
- מציג את הממשק למשתמש

React רץ בתוך הדפדפן של המשתמש.

---

# 12. למה Frontend אינו סביבה בטוחה?

קוד ה-Frontend מגיע למחשב של המשתמש.

לכן אין לשמור בו סודות כגון:

- DB Credentials
- API Secrets
- Private Keys

גם בדיקות אבטחה חשובות לא יכולות להסתמך רק על Frontend.

לדוגמה:

if (user.role === "admin") {
    showDeleteButton();
}

הקוד הזה יכול לקבוע אם להציג כפתור,
אבל ה-Backend עדיין חייב לבדוק אם למשתמש באמת יש הרשאה למחיקה.

---

# 13. HTTP מול HTTPS

HTTP רגיל אינו מוסיף שכבת הצפנה לתקשורת.

HTTPS הוא:

HTTP
+
TLS
=
HTTPS

HTTPS עדיין משתמש ב:

- Methods
- Routes
- Headers
- Body
- Status Codes

אבל תקשורת HTTP עוברת בתוך חיבור מאובטח באמצעות TLS.

---

# 14. TLS

TLS מוסיף שלושה דברים חשובים:

## Confidentiality / Encryption

הצפנת המידע שעובר בין Client ל-Server.

## Integrity

זיהוי שינוי או פגיעה במידע במהלך ההעברה.

## Server Authentication

ה-Client יכול לאמת את זהות ה-Server.

---

# 15. Certificate

Certificate הוא מעין תעודה דיגיטלית של השרת.

השרת מציג אותו ל-Client כחלק מתהליך TLS.

הדפדפן בודק בין היתר:

- שהתעודה מתאימה לדומיין
- ששרשרת האמון תקינה

אם יש בעיה,
הדפדפן יכול להציג אזהרה כגון:

Your connection is not private

---

# 16. TLS Handshake

לפני שה-Client וה-Server מתחילים להעביר HTTP בצורה מאובטחת,
מתבצע תהליך הקמת חיבור מאובטח.

לתהליך קוראים:

TLS Handshake

בשלב זה מספיק לזכור:

Client
  ↓
יצירת חיבור TLS
  ↓
בדיקת Certificate
  ↓
הקמת תקשורת מוצפנת
  ↓
HTTP עובר בתוך החיבור המאובטח

---

# 17. Ports נפוצים

HTTP:

Port 80

HTTPS:

Port 443

אלו Ports ברירת מחדל נפוצים.

לכן בדרך כלל לא כותבים:

https://example.com:443

לעומת זאת בשרת המקומי שלנו בחרנו:

http://localhost:5000

ולכן היינו צריכים לציין Port 5000.

---

# 18. HTTPS אינו פותר הכול

HTTPS מגן על התקשורת.

הוא אינו מתקן:

- Authorization שגוי
- Authentication שגוי
- Bugs בקוד
- Logic בעייתי
- Validation חסר

אפשר לזכור:

HTTPS        = האם הדרך מוגנת
Authentication = מי אתה
Authorization  = מה מותר לך לעשות

---

# 19. FTP

FTP = File Transfer Protocol

המטרה העיקרית:

העברת קבצים דרך רשת.

למשל:

Developer Computer
       ↓
      FTP
       ↓
FTP Server

אפשר לבצע פעולות כמו:

- Upload
- Download
- צפייה בתיקיות
- שינוי שמות
- מחיקה, בהתאם להרשאות

---

# 20. HTTP מול FTP

HTTP:

מיועד בעיקר לתקשורת Web,
Requests,
Responses,
APIs,
Pages,
Data.

FTP:

מיועד בעיקר להעברת קבצים
בין Client ל-Server.

אפשר לזכור:

HTTP = תקשורת Web
FTP  = העברת קבצים

---

# 21. FTP ואבטחה

FTP רגיל אינו מספק הצפנה מודרנית לתקשורת.

קיימים:

FTPS
= FTP עם TLS

SFTP
= פרוטוקול אחר להעברת קבצים שעובד דרך SSH

חשוב:

SFTP אינו פשוט "FTP מאובטח".
זה פרוטוקול אחר.

---

# 22. תקינה בעולם ה-Web

תקן הוא אוסף כללים מוסכם
שמגדיר כיצד טכנולוגיה אמורה לעבוד.

יש:

- Chrome
- Firefox
- Edge
- Safari
- שרתים שונים
- מערכות הפעלה שונות

ללא תקינה,
כל מערכת הייתה יכולה לפרש HTML,
CSS או HTTP בצורה שונה.

המטרה:

Compatibility
ועבודה עקבית בין מערכות שונות.

---

# 23. W3C

W3C = World Wide Web Consortium

עוסק בסטנדרטים של טכנולוגיות Web,
לדוגמה בתחומים של:

- HTML
- CSS
- Accessibility

---

# 24. IETF

IETF = Internet Engineering Task Force

עוסק יותר בפרוטוקולים
ובתקני תקשורת של האינטרנט.

קשור בין היתר לעולמות:

- HTTP
- TCP/IP
- DNS

תקנים רבים מתועדים במסמכים הנקראים:

RFC

Request for Comments

---

# 25. XML

XML = Extensible Markup Language

פורמט להעברת מידע מובנה.

דוגמה:

<user>
    <id>1</id>
    <name>Matan</name>
    <role>developer</role>
</user>

XML מבוסס Tags.

---

# 26. Well-formed XML

Well-formed XML הוא XML שנכתב לפי כללי התחביר התקינים.

לדוגמה:

תקין:

<user>
    <name>Matan</name>
</user>

לא תקין:

<user>
    <name>Matan
</user>

התגיות צריכות להיפתח,
להיסגר ולהיות מקוננות בצורה תקינה.

---

# 27. JSON

JSON הוא פורמט טקסטואלי להעברת מידע מובנה.

דוגמה:

{
  "id": 1,
  "name": "Matan",
  "role": "developer"
}

JSON מבוסס בעיקר על:

key : value

והמבנה שלו דומה מאוד ל-JavaScript Object.

---

# 28. XML מול JSON

XML:

<user>
    <name>Matan</name>
</user>

JSON:

{
  "name": "Matan"
}

XML משתמש ב-Tags.

JSON משתמש ב-Keys ו-Values.

JSON נפוץ מאוד ב-Web APIs
ונוח במיוחד לעבודה עם JavaScript.

---

# 29. התמונה הכוללת של יום 2

User
 ↓
Browser
 ↓
HTTP / HTTPS
 ↓
Network
 ↓
Web Server
 ↓
Backend Logic
 ↓
Database
 ↓
HTTP Response
 ↓
Browser

---

# 30. משפטי מפתח לזכור

- Protocol הוא סט כללים לתקשורת.
- HTTP מגדיר Request ו-Response.
- HTTP אינו כל ה-Network.
- Host + Port מביאים אותנו ל-Server.
- Route אומר ל-Server לאיזה נתיב פנימי לפנות.
- Method אומר מה אנחנו רוצים לבצע.
- Body מכיל את הנתונים.
- Header מכיל מידע נוסף על הבקשה או התשובה.
- Web Server מטפל בתקשורת HTTP.
- Backend מטפל בלוגיקה.
- Network Tab הוא כלי מרכזי ל-Debugging.
- HTTPS = HTTP מעל TLS.
- TLS מספק Encryption, Integrity ו-Server Authentication.
- Certificate מסייע באימות זהות השרת.
- HTTPS מגן על התקשורת, לא על הלוגיקה.
- FTP מיועד להעברת קבצים.
- תקינה מאפשרת תאימות בין מערכות ודפדפנים.
- XML מבוסס Tags.
- JSON מבוסס Keys ו-Values.
- בתקלה לא מנחשים – עוקבים אחרי ה-Request וה-Response.