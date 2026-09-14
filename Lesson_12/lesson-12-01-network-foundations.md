# Lesson 12 — Networking I
## חלק 1: יסודות הרשת — Domain, IP, Port, Client/Server, Public/Private IP, localhost

## מטרת המסמך
לבנות תמונה ברורה של מה שקורה כאשר Client רוצה להגיע ל-Server. המטרה היא לא רק לזכור הגדרות, אלא לדעת לפרק תקלה לפי שלבים ולשאול: **עד לאן התקשורת הצליחה להגיע ומה כבר עובד?**

---

## 1. התמונה הגדולה

נניח שמקלידים בדפדפן:

```text
https://example.com/users
```

ברמה גבוהה:

```text
Browser / Client
      ↓
Domain
      ↓
DNS
      ↓
IP Address
      ↓
Port
      ↓
TCP Connection
      ↓
HTTP Request
      ↓
Server
      ↓
HTTP Response
      ↓
Browser / Client
```

ב-HTTPS יש גם TLS בין TCP ל-HTTP; נעמיק בו ביום הבא.

---

## 2. פירוק URL

```text
https://example.com/users
```

```text
https://      → Protocol / Scheme
example.com   → Domain / Host
/users        → Path / Route
```

כל חלק עונה על שאלה אחרת:

```text
https       → באיזה פרוטוקול אפליקטיבי?
example.com → לאיזה Host?
/users      → איזה Resource מבקשים?
```

---

## 3. Domain

דוגמאות:

```text
example.com
google.com
openai.com
```

Domain הוא שם שקל לבני אדם לזכור. הרשת עצמה צריכה כתובת IP כדי להגיע ליעד.

```text
Domain
↓
DNS
↓
IP Address
```

אנלוגיה:

```text
Domain → שם המקום
IP     → הכתובת של המקום
```

---

## 4. IP Address

דוגמה ל-IPv4:

```text
93.184.216.34
```

חשוב לא לבלבל:

```text
example.com      → Domain
93.184.216.34    → IP Address
```

ה-IP אומר **לאיזה Host/מחשב ברשת** רוצים להגיע.

---

## 5. DNS בקצרה

DNS מתרגם Domain ל-IP:

```text
example.com
    ↓
   DNS
    ↓
93.184.216.34
```

אפשר לחשוב על DNS כעל ספר טלפונים/שירות איתור כתובת.

---

## 6. למה IP בלבד לא מספיק?

על אותו מחשב יכולים לרוץ כמה שירותים:

```text
Web API
Database
SSH
Monitoring
```

לכולם יכול להיות אותו IP. לכן צריך Port.

---

## 7. Port

כלל מרכזי:

```text
IP   → איזה מחשב / Host?
Port → איזה שירות על אותו Host?
```

לדוגמה:

```text
10.0.0.8:5000
```

```text
10.0.0.8 → השרת
5000     → השירות שמאזין על Port 5000
```

Ports נפוצים:

| Port | שימוש נפוץ |
|---:|---|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 3306 | MySQL |
| 5432 | PostgreSQL |
| 3000 | נפוץ בפיתוח |
| 5000 | נפוץ בפיתוח |

`3000` ו-`5000` אינם "שייכים" קבוע ל-Frontend/Backend — אלה conventions בלבד.

---

## 8. Port מול Route

```text
localhost:5000/users
localhost:5000/products
localhost:5000/orders
```

בכולם:

```text
Port = 5000
```

אבל ה-Route שונה.

```text
Port  → לאיזה שירות?
Route → מה מבקשים מהשירות?
```

---

## 9. מה אומר server.listen?

ב-Node:

```js
server.listen(5000);
```

במילים פשוטות:

> התהליך מבקש ממערכת ההפעלה לקבל תקשורת שמגיעה ל-Port 5000.

---

## 10. EADDRINUSE

אם תהליך אחר כבר משתמש באותו Address/Port:

```text
EADDRINUSE
```

כלומר:

```text
Address already in use
```

---

## 11. Client מול Server

Client יוזם את הבקשה. Server מאזין ומחזיר תשובה.

```text
Client
  ↓ Request
Server
  ↓ Response
Client
```

דוגמאות ל-Client:

```text
Browser
Mobile app
Frontend
CLI
Service אחר
```

---

## 12. Source IP ו-Destination IP

נניח:

```text
Client IP = 192.168.1.20
Server IP = 93.184.216.34
```

בבקשה:

```text
Source IP      = 192.168.1.20
Destination IP = 93.184.216.34
```

בתשובה זה מתהפך:

```text
Source IP      = 93.184.216.34
Destination IP = 192.168.1.20
```

---

## 13. גם ל-Client יש Port

לדוגמה:

```text
Client:
192.168.1.20:53124

Server:
93.184.216.34:443
```

`443` הוא Port השירות בצד השרת.  
`53124` הוא Port זמני של ה-Client, לעיתים נקרא **Ephemeral Port**.

למה הוא קיים? כדי שמערכת ההפעלה תוכל להבדיל בין הרבה Connections בו-זמנית.

---

## 14. זיהוי Connection

ברמה המושגית, Connection TCP מזוהה על ידי:

```text
Source IP
Source Port
Destination IP
Destination Port
Protocol
```

לדוגמה:

```text
192.168.1.20:53124
        ↔
10.0.0.8:5000
TCP
```

---

## 15. Private IP

Private IP מזהה מכשיר בתוך רשת מקומית.

טווחים נפוצים:

```text
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
```

דוגמאות:

```text
192.168.1.20
10.0.0.5
172.16.10.8
```

---

## 16. Public IP

Public IP מייצג את הרשת/החיבור כלפי האינטרנט.

```text
Private IP → כתובת המכשיר בתוך הרשת
Public IP  → הכתובת כלפי האינטרנט
```

נעמיק ב-NAT במסמך 4.

---

## 17. localhost

`localhost` אומר:

> המחשב הזה עצמו.

בדרך כלל:

```text
localhost → 127.0.0.1
```

`127.0.0.1` נקראת **Loopback Address**.

ב-IPv6 נהוג לראות גם:

```text
::1
```

---

## 18. localhost:5000

```text
http://localhost:5000
```

פירוש:

```text
localhost → המחשב שלי
5000      → השירות על Port 5000
```

לדוגמה:

```text
Browser
   ↓
localhost / 127.0.0.1
   ↓
Port 5000
   ↓
Node Server
```

---

## 19. localhost של מחשב אחר

אם PC A מריץ API על:

```text
localhost:5000
```

וב-PC B כותבים:

```text
localhost:5000
```

PC B יחפש שירות **על עצמו**.

כדי להגיע ל-PC A, צריך לפנות ל-IP שלו, למשל:

```text
192.168.1.20:5000
```

וגם אז צריך שהשרת יאזין על ממשק נגיש וש-Firewall יאפשר את החיבור.

---

## 20. 127.0.0.1 מול 0.0.0.0

### 127.0.0.1

```text
Loopback בלבד
```

שירות שמאזין רק על:

```text
127.0.0.1:5000
```

זמין רק מהמחשב עצמו.

### 0.0.0.0

בהקשר של Server bind/listen:

```text
0.0.0.0
```

משמעותו בקירוב:

> האזן על כל ממשקי IPv4 המקומיים הזמינים.

זו אינה כתובת יעד רגילה שאליה Client פונה כמו אל שרת חיצוני.

---

## 21. האנלוגיה המלאה

```text
Domain   → שם המקום
DNS      → מאתר את הכתובת
IP       → כתובת הבניין
Port     → איזו דלת / שירות
TCP      → פתיחת קו תקשורת
HTTP     → הבקשה והתשובה
Route    → מה מבקשים בתוך השירות
```

---

## 22. דוגמה מלאה

```text
https://example.com/users
```

```text
1. Domain: example.com
2. DNS: Domain → IP
3. IP: לאיזה Server
4. Port: HTTPS → בדרך כלל 443
5. TCP: מקימים Connection
6. HTTP: GET /users
7. Server: מעבד
8. Response: 200 / 404 / 500 / ...
```

---

## 23. חשיבה של רש״צ

כאשר אומרים "האתר לא עובד", לפרק:

```text
Domain נכון?
DNS עובד?
קיבלנו IP?
Port נכון?
Service listening?
Bind address?
Firewall?
TCP?
HTTP?
Route?
Backend?
```

לא לקפוץ ישר למסקנה שהקוד שבור.
