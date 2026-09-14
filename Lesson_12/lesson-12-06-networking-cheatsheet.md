# Lesson 12 — Networking I
## Cheat Sheet — חזרה מהירה

# הזרימה הגדולה

```text
URL
↓
Domain
↓
DNS
↓
IP
↓
Port
↓
TCP
↓
HTTP
↓
Server
↓
Response
```

ב-HTTPS:

```text
TCP
↓
TLS
↓
HTTP
```

TLS יילמד ביום הבא.

---

# Domain / IP / Port / Route

```text
Domain → שם
IP     → איזה Host
Port   → איזה Service
Route  → איזה Resource
```

---

# localhost

```text
localhost → המחשב המקומי
127.0.0.1 → IPv4 loopback
::1       → IPv6 loopback
```

```text
localhost של מחשב B
≠
localhost של מחשב A
```

---

# 0.0.0.0

```text
Server bind:
0.0.0.0
→ האזן על כל ממשקי IPv4 המקומיים
```

---

# Private / Public IP

```text
Private IP → בתוך הרשת
Public IP  → כלפי האינטרנט
```

טווחי Private נפוצים:

```text
10.0.0.0/8
172.16.0.0/12
192.168.0.0/16
```

---

# Subnet

```text
Subnet → מי נחשב באותה רשת
```

```text
/24
→ Prefix Length
→ 255.255.255.0
```

---

# Gateway

```text
אותו Subnet → Local
רשת אחרת → Default Gateway / Router
```

---

# Ports

```text
22   SSH
80   HTTP
443  HTTPS
3306 MySQL
5432 PostgreSQL
```

---

# Connection / Socket

```text
Source IP
Source Port
Destination IP
Destination Port
Protocol
```

---

# DNS

```text
Cache
↓
Resolver
↓
Root
↓
TLD
↓
Authoritative
↓
IP
```

```text
TTL → לכמה זמן Cache תקף
```

---

# TCP

```text
Connection-Oriented
Reliable
Ordered
```

Handshake:

```text
SYN
↓
SYN-ACK
↓
ACK
```

מנגנונים:

```text
ACK
Sequence Numbers
Retransmission
Ordering
```

---

# UDP

```text
Connectionless
אין Reliability מובנית
אין Ordering מובטח
אין Retransmission מובנה
```

שימושים נפוצים:

```text
DNS
Voice
Gaming
Real-time
```

---

# TCP vs UDP

```text
TCP → אמינות וסדר
UDP → פחות overhead, מתאים לחלק מ-use cases בזמן אמת
```

---

# Data Units

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

# MTU

```text
Maximum Transmission Unit
Ethernet נפוץ: ~1500 bytes
```

---

# Latency vs Bandwidth

```text
Latency   → זמן הגעה
Bandwidth → כמה מידע אפשר להעביר
```

```text
Bandwidth גבוה ≠ Latency נמוך
```

---

# NAT / PAT

```text
Private IP + Port
↓
NAT/PAT
↓
Public IP + Port
```

דוגמה:

```text
192.168.1.20:53124
→
203.0.113.10:61001
```

NAT Table מאפשר להחזיר תשובה למכשיר הנכון.

---

# Port Forwarding

```text
Public IP:Port
↓
Private IP:Port
```

---

# Firewall

```text
NAT      → מתרגם
Firewall → Allow / Block
```

---

# Errors

```text
DNS Error
→ לפני IP

Connection Refused
→ Port / Service / Bind

Timeout
→ Firewall / Routing / Server / Network

404
→ Server responded, Route/Resource problem

500
→ Backend קיבל ונכשל
```

---

# DevTools Timing

```text
DNS Lookup
Initial Connection
SSL/TLS
Request Sent
Waiting (TTFB)
Content Download
```

פירוש מהיר:

```text
DNS גבוה
→ DNS

Connection גבוה
→ TCP / Network / Firewall

Waiting גבוה
→ Backend / DB / External service

Download גבוה
→ Response size / Bandwidth
```

---

# משפטי מפתח

```text
404 מוכיח שהשרת ענה.
500 מוכיח שהבקשה הגיעה ל-Backend.
Connection refused אינו DNS error אם פנית ישירות ל-IP.
localhost הוא תמיד המחשב המקומי.
Port אינו Route.
NAT אינו Firewall.
Bandwidth גבוה לא מבטיח Latency נמוך.
```
