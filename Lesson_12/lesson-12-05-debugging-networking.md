# Lesson 12 — Networking I
## חלק 5: Debugging, DevTools Network & Team-Lead Troubleshooting

## מטרת המסמך
להפוך את כל חומר ה-Networking לכלי Debugging.

השאלה המרכזית כרש״צ:

> **מה ה-Error כבר מוכיח שכן עובד?**

---

## 1. הזרימה

```text
Domain
↓
DNS
↓
IP
↓
Port
↓
TCP Connection
↓
HTTP Request
↓
Backend / Route
↓
HTTP Response
```

---

## 2. DNS Error

אם DNS נכשל:

```text
Domain
↓
DNS ❌
```

עוד לא הגענו ל:

```text
IP
Port
TCP
HTTP
Backend
```

כיוונים:

```text
Domain שגוי
DNS Server לא נגיש
DNS Record חסר
Cache בעייתי
Configuration שגויה
```

---

## 3. Connection Refused

```text
Connection refused
```

בדרך כלל מרמז:

```text
היעד נגיש
אבל Connection ל-Port נדחה
```

כיוונים:

```text
אין Service שמאזין
Port שגוי
Service נפל
Server bind רק ל-localhost
```

אם פונים ישירות ל:

```text
10.0.0.8:7000
```

DNS אינו חלק מהתהליך.

---

## 4. Timeout

Timeout אומר:

> ניסינו להתחבר או לקבל תשובה, אבל לא קיבלנו תגובה בזמן.

כיוונים:

```text
Firewall dropping traffic
Routing problem
Server unreachable
Service stuck
Packet loss
Network congestion
Server overload
```

Timeout פחות חד-משמעי מ-Connection Refused.

---

## 5. Connection Refused מול Timeout

אנלוגיה:

```text
Connection Refused
→ הגעת לדלת וקיבלת "סגור"

Timeout
→ דפקת בדלת ולא קיבלת תשובה
```

---

## 6. 404 Not Found

אם קיבלת:

```text
404
```

כבר יודעים:

```text
DNS ✅
IP ✅
Port ✅
TCP ✅
HTTP ✅
Server responded ✅
```

הבעיה בדרך כלל:

```text
Route
Resource
Path
URL
```

דוגמה:

```text
GET /user
```

כאשר השרת מכיר:

```text
GET /users
```

404 **לא** אומר שהשרת נפל.

---

## 7. 500 Internal Server Error

אם:

```text
500
```

הבקשה הגיעה ל-Backend.

כיוונים:

```text
Exception
DB query failed
External service failed
Bug
Unhandled error
```

כלל:

```text
500 ≠ השרת לא ענה
500 = השרת ענה אבל נכשל בעיבוד
```

---

## 8. 401 ו-403

### 401
בדרך כלל:

```text
Authentication חסר/לא תקין
```

### 403
בדרך כלל:

```text
זהות ידועה, אבל אין הרשאה
```

נעמיק בכך בימי Auth.

---

## 9. טבלת Debugging

| Symptom | מה כבר כנראה עובד? | איפה לחשוד? |
|---|---|---|
| DNS Error | כמעט כלום | DNS / Domain |
| Connection Refused | IP reachable | Port / Service / Bind |
| Timeout | לא חד-משמעי | Firewall / Routing / Server / Network |
| 404 | TCP + HTTP + Server | Route / Resource |
| 500 | Request הגיע ל-Backend | Server logic |
| 401 | Server/Route | Authentication |
| 403 | Server/Auth context | Authorization |

---

# DevTools Network

## 10. מה אפשר לראות?

Chrome DevTools → Network:

```text
Name
Method
Status
Domain / Host
Remote Address
Request Headers
Response Headers
Request Payload
Response
Timing
```

---

## 11. Timing

שלבים אפשריים:

```text
Queueing
DNS Lookup
Initial Connection
SSL/TLS
Request Sent
Waiting (TTFB)
Content Download
```

---

## 12. DNS Lookup איטי

```text
DNS Lookup = 1500ms
Connection = 20ms
Waiting = 40ms
```

כיוון ראשון:

```text
DNS
```

---

## 13. Initial Connection איטי

כיוונים:

```text
TCP
Firewall
Routing
Network
Server reachability
```

---

## 14. Waiting / TTFB איטי

לדוגמה:

```text
DNS = 3ms
Connection = 8ms
Waiting = 950ms
Download = 4ms
```

רוב הזמן ב-Waiting.

כיוונים:

```text
Backend processing
DB
External API
Server load
Slow code path
```

---

## 15. Content Download איטי

אם TTFB טוב אבל Download איטי:

```text
Response גדול
Bandwidth מוגבל
Packet loss
Network throughput
```

---

# תרחישי רש״צ

## 16. localhost עובד, remote לא

Backend עובד:

```text
localhost:5000
```

אבל לא ממחשב אחר:

```text
192.168.1.20:5000
```

בדיקות ראשונות:

```text
1. Server bind רק ל-127.0.0.1?
2. Firewall חוסם Port 5000?
```

---

## 17. Connection Refused ל-IP ישיר

```text
10.0.0.8:7000
```

ומתקבל:

```text
Connection refused
```

אין טעם לבדוק DNS קודם.

בדיקות:

```text
Service running?
Listening on 7000?
Correct Port?
Listening only on localhost?
```

---

## 18. 404

מפתח אומר:

> "אני מקבל 404, השרת נפל."

תשובה:

```text
לא.
404 מוכיח שהשרת החזיר HTTP Response.
```

לבדוק:

```text
Route
URL
Path
Resource
Method/Route mapping
```

---

## 19. Timeout

בדיקות:

```text
DevTools Timing
Firewall
Routing
Reachability
Service health
Packet loss
Server load
```

---

## 20. Flow מומלץ לרש״צ

```text
1. מה ה-URL?
2. Domain או IP?
3. DNS עובד?
4. Destination IP נכון?
5. Port נכון?
6. Service listening?
7. Bind address נכון?
8. Firewall?
9. Subnet / Routing?
10. TCP Connection?
11. HTTP status?
12. Backend logs?
13. DB / External dependencies?
```

---

## 21. הכלל החשוב

במקום לשאול:

```text
מה נשבר?
```

שאל:

```text
מה ה-Error כבר מוכיח שכן עובד?
```
