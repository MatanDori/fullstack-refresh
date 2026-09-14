# Lesson 12 — Networking I
## חלק 3: DNS, TCP, UDP, Packets, Encapsulation, MTU, Latency & Bandwidth

# חלק א' — DNS לעומק

## 1. מה DNS עושה?

```text
Domain Name
↓
IP Address
```

לדוגמה:

```text
example.com
↓
93.184.216.34
```

---

## 2. Cache לפני חיפוש מלא

לא בכל גלישה מתחילים מה-Root.

קודם מנסים להשתמש במידע שכבר שמור:

```text
Browser Cache
↓
OS Cache
↓
DNS Resolver Cache
↓
אם אין תשובה → Resolution מלא
```

הסדר המדויק משתנה בין מערכות, אבל הרעיון הוא לחסוך חיפוש חוזר.

---

## 3. DNS Resolver

Resolver הוא השירות שעושה את עבודת החיפוש עבור ה-Client.

הוא יכול להגיע מ:

```text
ISP
ארגון
Router
DNS ציבורי
```

---

## 4. Root DNS

אם אין Cache, ה-Resolver יכול להתחיל מ-Root.

ה-Root לא בהכרח יודע את ה-IP של `example.com`.

הוא אומר בערך:

```text
".com?"
→ לך לשרתי ה-TLD של .com
```

---

## 5. TLD

TLD = Top-Level Domain.

דוגמאות:

```text
.com
.org
.net
.il
```

שרת ה-TLD יודע מי ה-Authoritative DNS עבור הדומיין.

---

## 6. Authoritative DNS

זה ה-DNS הסמכותי שמחזיק את רשומות הדומיין.

הוא יכול להחזיר:

```text
example.com → IP
```

---

## 7. זרימת DNS מלאה

```text
Browser
↓
Cache?
↓
Resolver
↓
Root
↓
TLD
↓
Authoritative DNS
↓
IP Address
↓
Resolver
↓
Client
```

---

## 8. TTL

TTL = Time To Live.

מגדיר לכמה זמן אפשר לשמור רשומה ב-Cache לפני שצריך לרענן.

אם יש Cache תקף:

```text
example.com → IP
```

אין צורך לעבור שוב דרך:

```text
Root → TLD → Authoritative
```

---

# חלק ב' — TCP

## 9. מה זה TCP?

TCP = Transmission Control Protocol.

TCP נותן תקשורת:

```text
Connection-Oriented
Reliable
Ordered
```

כלומר חשוב שהמידע:

```text
יגיע
יגיע בסדר
אובדן יטופל
```

---

## 10. Three-Way Handshake

```text
Client                 Server
  | ---- SYN -----------> |
  | <--- SYN-ACK -------- |
  | ---- ACK -----------> |
  | Connection ready      |
```

### SYN
Client: "אני רוצה לפתוח Connection."

### SYN-ACK
Server: "קיבלתי, וגם אני מוכן."

### ACK
Client: "קיבלתי שגם אתה מוכן."

---

## 11. למה שלושה שלבים?

שני הצדדים צריכים לדעת שהתקשורת עובדת בשני הכיוונים.

```text
Client יודע שה-Server שמע אותו
Server יודע שה-Client שמע את התשובה
```

---

## 12. ACK

ACK = Acknowledgement.

TCP משתמש באישורי קבלה כדי לעקוב אחרי מידע שהגיע.

---

## 13. Sequence Numbers

עוזרים לשמור על סדר.

אם נשלח:

```text
Part 1
Part 2
Part 3
```

והגיע בסדר שונה, TCP יודע להרכיב את הזרם בצורה נכונה.

---

## 14. Retransmission

אם מידע חסר:

```text
Loss
↓
Detection
↓
Retransmission
↓
Ordered stream
```

---

## 15. Connection Refused מול 404

### Connection Refused

```text
אין Service שמקבל את החיבור
Port שגוי
Service נפל
Bind לא נכון
```

לא הגעת ל-HTTP תקין.

### 404

```text
TCP ✅
HTTP ✅
Server responded ✅
Route/Resource ❌
```

---

# חלק ג' — UDP

## 16. מה זה UDP?

UDP = User Datagram Protocol.

```text
Connectionless
```

אין Three-Way Handshake לפני שליחת Datagram.

---

## 17. מה UDP לא מבטיח?

```text
Delivery
Order
Retransmission
Acknowledgement
```

האפליקציה יכולה להוסיף מנגנונים משלה.

---

## 18. שימושים נפוצים

```text
Voice
Gaming
Real-time traffic
DNS queries רבות
```

---

## 19. TCP מול UDP

| תכונה | TCP | UDP |
|---|---|---|
| Connection | כן | לא |
| Handshake | כן | לא |
| Ordering | כן | לא מובטח |
| Retransmission | כן | לא מובנה |
| ACK | כן | לא מובנה |
| Overhead | גבוה יותר | נמוך יותר |
| שימושים | HTTP/HTTPS, SSH, DB | DNS, Voice, Gaming |

UDP לא "תמיד מהיר יותר"; יש בו פחות מנגנוני אמינות וניהול מובנים.

---

# חלק ד' — Segments, Packets, Frames

## 20. מידע גדול מתחלק

```text
Application Data
↓
TCP Segment
↓
IP Packet
↓
Ethernet Frame
```

---

## 21. Encapsulation

כל שכבה מוסיפה Header:

```text
[ HTTP Data ]

[ TCP Header | HTTP Data ]

[ IP Header | TCP Header | HTTP Data ]

[ Ethernet Header | IP Header | TCP Header | HTTP Data ]
```

זה נקרא Encapsulation.

---

## 22. Decapsulation

בצד המקבל מורידים את ה-Headers בסדר הפוך עד שהאפליקציה מקבלת את המידע.

---

## 23. מה TCP מוסיף?

בין היתר:

```text
Source Port
Destination Port
Sequence Information
ACK-related information
```

---

## 24. מה IP מוסיף?

בין היתר:

```text
Source IP
Destination IP
```

---

## 25. MTU

MTU = Maximum Transmission Unit.

ב-Ethernet נפוץ לראות:

```text
~1500 bytes
```

הרעיון:

> אי אפשר לשלוח קובץ ענק כיחידת רשת אחת; המידע נשלח ביחידות קטנות יותר.

---

## 26. Packet Loss

יכול לקרות בגלל:

```text
עומס
Wi-Fi חלש
Router עמוס
Congestion
בעיה זמנית בדרך
```

ב-TCP:

```text
Loss
↓
Retransmission
```

ב-UDP אין מנגנון כזה מובנה.

---

# חלק ה' — Latency ו-Bandwidth

## 27. Latency

Latency = זמן העיכוב.

כמה זמן לוקח למידע להגיע מנקודה לנקודה.

---

## 28. RTT

RTT = Round Trip Time.

```text
Client → Server → Client
```

Ping יכול לשמש כאינדיקציה ל-RTT, אבל אינו זהה בהכרח ל-HTTP latency אמיתי.

---

## 29. Bandwidth

Bandwidth = כמה מידע אפשר להעביר ביחידת זמן.

```text
100 Mbps
1 Gbps
```

---

## 30. אנלוגיה

```text
Latency   → כמה זמן לוקח למשאית להגיע
Bandwidth → כמה מטען אפשר להעביר
```

---

## 31. למה 1Gbps לא מבטיח API מהיר?

Request קטן כמעט לא צורך Bandwidth.

אם Latency גבוה, עדיין צריך לחכות למסע:

```text
Client → Server → Client
```

לכן:

```text
Bandwidth גבוה
≠
Latency נמוך
```

---

## 32. מתי מה חשוב?

### API קטן
Latency משמעותי מאוד.

### הורדת קובץ גדול
Bandwidth משמעותי יותר.

---

## 33. Packet Loss מגדיל זמן ב-TCP

```text
Packet lost
↓
Retransmission
↓
המתנה
↓
Latency בפועל עולה
```

---

## 34. TTFB

TTFB = Time To First Byte.

זמן עד שה-Client מתחיל לקבל את התשובה.

TTFB גבוה יכול לרמוז על:

```text
Backend processing
DB
External API
Server load
```

לא בהכרח, אבל זה כיוון Debugging חשוב.
