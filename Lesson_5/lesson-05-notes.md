# Lesson 05 — Git & GitHub

## 1. Git מול GitHub
- Git = Version Control System לניהול גרסאות והיסטוריית קוד.
- GitHub = שירות Remote לאחסון ושיתוף Git repositories.

## 2. Repository
```bash
git init
```
יוצר Repository מקומי חדש ותיקיית `.git` מוסתרת.

## 3. git status
```bash
git status
```
מציג מצב קבצים:
- Untracked
- Modified
- Staged
- Committed

## 4. שלושת האזורים
```text
Working Directory
   ↓ git add
Staging Area
   ↓ git commit
Repository History
```

## 5. git add
```bash
git add file.txt
git add .
```
מעביר שינויים ל-Staging Area.
חשוב: `git add` לא רק מציג שינויים ולא יוצר Commit.

## 6. git commit
```bash
git commit -m "message"
```
שומר Snapshot של השינויים שב-Staging בהיסטוריית Git.

## 7. git log
```bash
git log --oneline
```
מציג היסטוריית Commits מקוצרת.

## 8. HEAD
`HEAD` מצביע למיקום הנוכחי שלנו בהיסטוריה.

לדוגמה:
```text
HEAD -> master
```
כלומר אנחנו כרגע על `master`.

חשוב: HEAD אינו "הענף הראשי".

## 9. Branches
יצירה ומעבר:
```bash
git switch -c feature-name
```

מעבר:
```bash
git switch master
```

הצגת Branches:
```bash
git branch
```

## 10. Merge
```bash
git switch master
git merge feature-name
```

Merge משלב היסטוריה של Branch אחר לתוך ה-Branch הנוכחי.

## 11. Merge Conflict
Conflict נוצר כששני Branches משנים אותו אזור ו-Git לא יודע להכריע לבד.

לאחר פתרון ידני:
```bash
git add file.txt
git commit -m "Resolve merge conflict"
```

## 12. Graph
```bash
git log --oneline --graph --decorate --all
```

- `--graph` מציג פיצולים ומיזוגים
- `--decorate` מציג HEAD ושמות Branches
- `--all` מציג את כל ה-Branches

## 13. Remote
```bash
git remote -v
```

הוספת Remote:
```bash
git remote add origin <repository-url>
```

`origin` הוא שם מקובל ל-Remote הראשי.

## 14. push
```bash
git push -u origin master
```
שולח Commits מקומיים ל-Remote.

אחרי ההגדרה הראשונית לרוב:
```bash
git push
```

## 15. master מול origin/master
- `master` = Branch מקומי.
- `origin/master` = Remote-tracking reference מקומי שמייצג את המצב האחרון ש-Git מכיר של `master` ב-Remote.

`origin/master` אינו "גיבוי".

## 16. pull מול fetch

### pull
```bash
git pull
```
מביא שינויים מה-Remote וגם משלב אותם ב-Branch המקומי.

### fetch
```bash
git fetch
```
מביא מידע ועדכונים מה-Remote אך לא ממזג אותם אוטומטית לקוד המקומי.

כלל קצר:
```text
fetch → תעדכן אותי מה קרה
pull  → תעדכן אותי וגם תשלב
```

## 17. clone
```bash
git clone <repository-url>
```
מוריד Repository קיים למחשב, כולל היסטוריית Commits ו-Remote.

```text
git init  → מתחיל Repository חדש
git clone → מעתיק Repository קיים
```

## 18. .gitignore
`.gitignore` הוא קובץ שמגדיר אילו קבצים/תיקיות לא-Tracked Git צריך להתעלם מהם.

דוגמה:
```gitignore
node_modules/
.env
dist/
```

`.env` בדרך כלל מכיל Secrets כמו:
- API keys
- Tokens
- Passwords
- DB credentials

לכן לא נרצה להעלות אותו ל-GitHub.

חשוב: אם קובץ כבר Tracked, הוספתו ל-.gitignore לא מפסיקה את המעקב אוטומטית.

## 19. git diff
```bash
git diff
```
מציג שינויים ב-Working Directory שעדיין לא Staged.

```bash
git diff --staged
```
מציג שינויים שנמצאים ב-Staging ביחס ל-Commit האחרון.

## 20. git restore

### ביטול שינוי מקומי
```bash
git restore file.txt
```
מבטל שינוי מקומי שלא נשמר ב-Commit.

### הוצאה מ-Staging
```bash
git restore --staged file.txt
```
מוציא את השינוי מה-Staging אבל משאיר את השינוי בקובץ.

כלל קצר:
```text
git restore file
→ בטל את השינוי המקומי

git restore --staged file
→ בטל רק את ה-Staging
```

## 21. מחיקת Branch
```bash
git branch -d feature-name
```
מחיקה בטוחה אחרי Merge.

## 22. Workflow בסיסי
```text
create branch
↓
make changes
↓
git status
↓
git diff
↓
git add
↓
git commit
↓
switch master
↓
merge
↓
git push
```

## משפטי מפתח
```text
git add    → Staging
git commit → שמירה בהיסטוריה
```

```text
HEAD → איפה אני נמצא כרגע
```

```text
master        → Branch מקומי
origin/master → ייצוג מקומי של מצב ה-Remote האחרון ש-Git מכיר
```

```text
push  → שולח ל-Remote
fetch → מביא מידע
pull  → מביא וגם משלב
```

## הערת רש"צ
ברמת Team Lead חשוב להבין:
- באיזה Branch עובדים
- מה Staged ומה Committed
- האם Local מסונכרן עם Remote
- האם Feature Branch מוזג
- האם יש Conflict
- האם Secrets הוכנסו בטעות ל-Git
- מה בדיוק השתנה לפני Commit/Merge
