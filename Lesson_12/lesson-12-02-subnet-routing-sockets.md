# Lesson 12 — Networking I
## חלק 2: Subnet, Prefix, Routing, Gateway, Ports & Sockets

## 1. מהו Subnet?

Subnet הוא חלוקה לוגית של רשת לקבוצת כתובות שנחשבות באותה רשת.

לדוגמה:

```text
192.168.1.0/24
```

כתובות כמו:

```text
192.168.1.1
192.168.1.20
192.168.1.200
```

יהיו באותו Subnet במקרה הזה.

לעומת:

```text
192.168.2.50
```

שנמצא ברשת אחרת.

---

## 2. Prefix Length

החלק:

```text
/24
```

נקרא **Prefix Length**.

IPv4 מכיל 32 ביטים.

```text
/24
→ 24 bits Network
→ 8 bits Host
```

כלומר 24 הביטים הראשונים מייצגים את הרשת, והשאר את ה-Host.

---

## 3. Subnet Mask

`/24` שקול ל:

```text
255.255.255.0
```

לכן:

```text
192.168.1.20/24
```

מקביל ל:

```text
IP:   192.168.1.20
Mask: 255.255.255.0
```

---

## 4. למה לא מספיק להסתכל על ".2"?

לא נכון לומר באופן כללי:

> "אם המספר השלישי ב-IP שונה, זו רשת אחרת."

זה תלוי ב-Prefix/Mask.

לכן תמיד חושבים:

```text
IP + Prefix
```

---

## 5. איך המחשב מחליט אם היעד מקומי?

המחשב בודק:

> האם Destination IP נמצא באותו Subnet שלי?

אם כן:

```text
Local network
```

אם לא:

```text
Default Gateway / Router
```

---

## 6. Default Gateway

ה-Gateway הוא היעד שאליו המחשב שולח Traffic שנועד לרשת אחרת.

דוגמה:

```text
Client:
192.168.1.20/24

Gateway:
192.168.1.1

Destination:
192.168.2.50
```

`192.168.2.50` לא נמצא ב-`192.168.1.0/24`, ולכן:

```text
Client
↓
Default Gateway
↓
Router
↓
Network אחרת
```

---

## 7. אנלוגיה

```text
Subnet  → שכונה
IP      → בית בתוך השכונה
Router  → היציאה מהשכונה
Gateway → השער שדרכו יוצאים
```

---

## 8. Ports לעומק

על אותו Host יכולים לרוץ כמה שירותים:

```text
192.168.1.20:3000 → Frontend dev server
192.168.1.20:5000 → Backend
192.168.1.20:3306 → MySQL
```

אותו IP, Ports שונים.

---

## 9. Listening Port

```js
server.listen(5000);
```

כלומר:

> השרת מחכה לחיבורים נכנסים על Port 5000.

מערכת ההפעלה מקשרת את ה-Port לתהליך.

---

## 10. Server Port מול Client Port

```text
Client:
192.168.1.20:53124

Server:
10.0.0.8:5000
```

```text
53124 → Port זמני של Client
5000  → Port השירות של Server
```

---

## 11. מהו Socket?

ברמה שימושית, Socket הוא נקודת קצה לתקשורת.

אפשר לחשוב:

```text
IP + Port + Protocol
```

לדוגמה:

```text
10.0.0.8:5000 / TCP
```

---

## 12. Connection ספציפי

```text
192.168.1.20:53124
        ↔
10.0.0.8:5000
TCP
```

החיבור הספציפי כולל את שני הצדדים ואת הפרוטוקול.

---

## 13. Server אחד יכול לשרת הרבה Clients

```text
192.168.1.20:53124 → 10.0.0.8:5000
192.168.1.21:60412 → 10.0.0.8:5000
192.168.1.22:49103 → 10.0.0.8:5000
```

כולם מגיעים לאותו Server Port.

מערכת ההפעלה יכולה להבדיל בין החיבורים לפי השילוב של:

```text
Source IP
Source Port
Destination IP
Destination Port
Protocol
```

---

## 14. Port מול Socket מול Route

```text
Port   → איזה שירות?
Socket → Endpoint / Connection
Route  → איזה Resource בתוך השירות?
```

דוגמה:

```text
localhost:5000/users
```

```text
localhost → Host
5000      → Port
/users    → Route
```

---

## 15. אנלוגיה

```text
IP     → כתובת מלון
Port   → דלפק/מחלקה
Socket → השיחה הספציפית
Route  → מה ביקשת מאותה מחלקה
```

---

## 16. EADDRINUSE

כאשר שני תהליכים מנסים להאזין לאותו Address/Port:

```text
EADDRINUSE
```

בדיקות:

```text
איזה Process משתמש ב-Port?
האם שרת קודם עדיין רץ?
האם צריך לבחור Port אחר?
```

---

## 17. Debugging

אם:

```text
localhost:5000
```

עובד, אבל:

```text
192.168.1.20:5000
```

לא עובד ממחשב אחר:

```text
השרת מאזין רק על 127.0.0.1?
Firewall חוסם?
אותו Subnet?
יש Route/Gateway?
Network policy?
```

---

## 18. כלל מסכם

```text
Subnet      → מי באותה רשת
Prefix/Mask → איך קובעים גבול רשת
Gateway     → לאן שולחים Traffic לרשת אחרת
Port        → איזה שירות
Socket      → Endpoint/Connection
Route       → איזה Resource
```
