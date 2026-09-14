# Lesson 12 — Networking I
## חלק 4: NAT, PAT, NAT Table, Port Forwarding & Firewall

זהו אחד החלקים החשובים והמורכבים ביום 12, ולכן ההסבר כאן בנוי ממש מהתחלה.

# חלק א' — NAT מהבסיס

## 1. הבעיה ש-NAT פותר

נניח שיש רשת מקומית:

```text
Laptop → 192.168.1.20
Phone  → 192.168.1.21
Tablet → 192.168.1.22
```

אלה Private IPs.

ה-Router יוצא לאינטרנט דרך Public IP אחד:

```text
203.0.113.10
```

התמונה:

```text
Laptop  192.168.1.20 ─┐
Phone   192.168.1.21 ─┼→ Router → 203.0.113.10 → Internet
Tablet  192.168.1.22 ─┘
```

השאלה המרכזית:

> אם כלפי האינטרנט כולם משתמשים באותו Public IP, איך ה-Router יודע איזו תשובה שייכת לאיזה מכשיר?

---

## 2. נעקוב אחרי Laptop אחד

נניח שה-Laptop רוצה להגיע לשרת HTTPS.

```text
Source:
192.168.1.20:53124

Destination:
93.184.216.34:443
```

לפני NAT:

```text
192.168.1.20:53124
        →
93.184.216.34:443
```

פירוש:

```text
192.168.1.20 → Private IP של ה-Laptop
53124        → Port זמני של ה-Client

93.184.216.34 → Server IP
443           → HTTPS
```

---

## 3. הבקשה מגיעה ל-Router

ה-Router צריך להוציא את התקשורת לאינטרנט דרך ה-Public IP שלו.

הוא מתרגם:

```text
192.168.1.20:53124
```

למשהו כמו:

```text
203.0.113.10:61001
```

עכשיו כלפי האינטרנט:

```text
203.0.113.10:61001
        →
93.184.216.34:443
```

---

## 4. ה-Router חייב לזכור את התרגום

אם הוא היה משנה את הכתובת ושוכח, כשהתשובה תחזור הוא לא ידע לאן להעביר אותה.

לכן הוא שומר Mapping ב-NAT Table:

```text
Inside:
192.168.1.20:53124

↕

Outside:
203.0.113.10:61001
```

או בקיצור:

```text
203.0.113.10:61001
→
192.168.1.20:53124
```

---

## 5. התשובה חוזרת

השרת באינטרנט ראה Client:

```text
203.0.113.10:61001
```

ולכן עונה אליו:

```text
93.184.216.34:443
        →
203.0.113.10:61001
```

התשובה מגיעה ל-Router.

ה-Router בודק NAT Table:

```text
61001
→
192.168.1.20:53124
```

ומעביר את התשובה ל-Laptop.

---

## 6. המסלול המלא

### יציאה

```text
Laptop
192.168.1.20:53124
        ↓
Router / NAT
        ↓
203.0.113.10:61001
        ↓
Internet
        ↓
Server
93.184.216.34:443
```

### חזרה

```text
Server
93.184.216.34:443
        ↓
203.0.113.10:61001
        ↓
Router checks NAT table
        ↓
192.168.1.20:53124
        ↓
Laptop
```

---

## 7. עכשיו גם Phone יוצא

Phone:

```text
192.168.1.21:54000
```

ה-Router יכול ליצור Mapping אחר:

```text
Laptop:
192.168.1.20:53124
→
203.0.113.10:61001

Phone:
192.168.1.21:54000
→
203.0.113.10:61002
```

אותו Public IP:

```text
203.0.113.10
```

אבל Ports חיצוניים שונים.

---

## 8. איך התשובות חוזרות למכשיר הנכון?

```text
:61001 → Laptop
:61002 → Phone
```

ה-Router לא מנחש. הוא מסתכל ב-NAT Table.

זו הנקודה הקריטית:

> NAT/PAT שומר קשר בין Private IP + Private Port לבין Public IP + Public Port.

---

## 9. PAT

PAT = Port Address Translation.

אפשר לחשוב:

```text
NAT → תרגום כתובות
PAT → תרגום שמשתמש גם ב-Ports
```

בפועל הרבה פעמים אומרים "NAT" גם כאשר מדובר במנגנון PAT.

---

## 10. Port חיצוני לא שייך קבוע למכשיר

לא נכון לחשוב:

```text
Laptop תמיד = 61001
```

יותר נכון:

> עבור Connection מסוים נוצר Mapping מסוים.

Connection אחר של אותו Laptop יכול לקבל Port חיצוני אחר.

ה-NAT Table היא דינמית.

---

## 11. אנלוגיה

משרד עם מספר טלפון ציבורי אחד ושלוחות פנימיות.

```text
Public phone number
↓
Switchboard
↓
Extensions
```

המרכזייה זוכרת איזו שיחה שייכת לאיזו שלוחה.

NAT/PAT דומה:

```text
Private IP + Port
↕
Public IP + Port
```

---

# חלק ב' — חיבור מבחוץ פנימה

## 12. למה חיבור יזום מבחוץ שונה?

אם Laptop יזם Connection החוצה, ה-Router יצר NAT entry.

לכן תשובה יכולה לחזור דרך אותו Mapping.

אבל אם מחשב אקראי באינטרנט שולח פתאום:

```text
203.0.113.10:5000
```

ל-Router אין בהכרח Mapping שאומר:

```text
5000 → לאיזה מחשב פנימי?
```

---

## 13. Port Forwarding

אפשר להגדיר כלל:

```text
Public:
203.0.113.10:5000

↓

Private:
192.168.1.20:5000
```

כלומר:

> כל Traffic שמגיע מבחוץ ל-Public Port 5000 יועבר ל-Host הפנימי הזה.

---

## 14. למה Port Forwarding דורש זהירות?

כי הוא חושף שירות פנימי לתעבורה מבחוץ.

צריך לחשוב על:

```text
Firewall
Authentication
Updates
Exposure
Least privilege
```

---

# חלק ג' — Firewall

## 15. מהו Firewall?

Firewall הוא מנגנון שמחליט:

```text
Allow
או
Block
```

לפי Rules.

---

## 16. מה Firewall יכול לבדוק?

דוגמאות:

```text
Source IP
Destination IP
Source Port
Destination Port
Protocol
Direction
Connection state
```

---

## 17. שירות יכול לעבוד מקומית ולהיחסם מבחוץ

Backend:

```text
192.168.1.20:5000
```

יכול לעבוד ב:

```text
localhost:5000
```

אבל Firewall יכול לחסום Inbound Traffic ל-Port 5000.

לכן:

```text
אפליקציה עובדת
≠
אפליקציה נגישה ברשת
```

---

## 18. Firewall יכול להיות בכמה מקומות

```text
Host Firewall
Server Firewall
Router Firewall
Cloud Security Rules
Network Firewall
```

---

## 19. Allowlist

גישה:

```text
רק מה שמוגדר מותר
כל השאר חסום
```

לדוגמה:

```text
Allow TCP 443
Allow TCP 22 from admin network
Block everything else
```

---

## 20. Blocklist

גישה:

```text
הכול מותר
חוץ ממה שחסמנו
```

---

## 21. Stateful Firewall

Firewall Stateful זוכר Connections.

אם Client יזם:

```text
Client → Server
```

והתשובה חוזרת כחלק מאותו Connection:

```text
Server → Client
```

ה-Firewall יכול לזהות שזו תשובה לחיבור קיים.

---

## 22. NAT מול Firewall

זה הבדל קריטי:

```text
NAT
→ מתרגם כתובות/Ports

Firewall
→ מחליט אם Traffic מותר או חסום
```

אותו Router יכול לעשות את שניהם, אבל אלה תפקידים שונים.

---

## 23. דוגמה משולבת

Laptop:

```text
192.168.1.20:53124
```

Router/NAT:

```text
192.168.1.20:53124
→
203.0.113.10:61001
```

Firewall:

```text
האם מותר ל-Traffic לצאת?
האם מותר לתשובה לחזור?
```

---

## 24. Debugging

אם:

```text
localhost:5000
```

עובד אבל:

```text
192.168.1.20:5000
```

לא עובד ממחשב אחר:

```text
Server bind רק ל-127.0.0.1?
Firewall?
Subnet?
Routing?
Network policy?
```

---

## 25. בדיקת הבנה מרכזית

אם NAT Table:

```text
203.0.113.10:61001
→ 192.168.1.20:53124

203.0.113.10:61002
→ 192.168.1.21:54000
```

ותשובה מגיעה ל:

```text
203.0.113.10:61002
```

היא תועבר ל:

```text
192.168.1.21:54000
```

כי זה ה-Mapping שנשמר.
