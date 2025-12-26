# Helpdesk React Client

אפליקציית לקוח לניהול טיקטים (Helpdesk) המתממשקת לשרת ה־API: http://localhost:4000 לפי ה־Swagger.

## מה המערכת עושה
- הזדהות עם JWT (התחברות/הרשמה).
- ניהול טיקטים: יצירה, צפייה, עדכון סטטוס, הקצאה, מחיקה (לפי הרשאות).
- תגובות לטיקטים.
- ניהול סטטוסים ורמות דחיפות (Admin בלבד).

## תפקידי המשתמשים והרשאות
- Customer
  - רואה רק טיקטים שהוא יצר
  - יכול לפתוח טיקט חדש (/tickets/new)
  - יכול להוסיף תגובות בטיקט שלו
- Agent
  - רואה רק טיקטים שהוקצו אליו
  - יכול לעדכן סטטוס טיקט
  - יכול להוסיף תגובות
- Admin
  - רואה את כל הטיקטים
  - יכול לשנות סטטוסים ורמות דחיפות
  - יכול להקצות טיקטים ל־Agent
  - יכול למחוק טיקטים

## ניתובים
- /login – טופס התחברות
- /register – הרשמה (יוצרת Customer)
- /dashboard – מסך פתיחה מותאם לפי role
- /tickets – רשימת טיקטים
- /tickets/:id – פרטי טיקט + תגובות
- /tickets/new – פתיחת טיקט (Customer בלבד)
- /users, /users/new – ניהול משתמשים (Admin)
- /settings – ניהול סטטוסים/דחיפויות (Admin)
- /* – דף 404

Route Guard:
- משתמש לא מחובר → הפניה ל־/login
- גישה לפי role בצד לקוח

## מצב גלובלי
- Context + useReducer
- מנוהל:
  - auth (login/logout)
  - token
  - פרטי המשתמש (נטענים מהשרת ב־/auth/me באתחול)
  - טעינת טיקטים/שמירתם (TicketsContext)

## עבודה מול השרת
שרת ה־API: https://github.com/sarataber/helpdesk-api
- הפעלה: ראו README של השרת (npm install, npm run dev)
- Swagger: http://localhost:4000/docs
- Postman: כלול בריפו של השרת

ברירת מחדל (Seed) בשרת:
- admin@example.com / password (admin)
- agent@example.com / password (agent)
- customer@example.com / password (customer)

## הפעלת הקליינט
Prerequisites: Node 18+

```
npm install
npm run dev
```
האפליקציה תרוץ בדפדפן (Vite) ותדבר מול http://localhost:4000.

## הערות מימוש

- **ממשק משתמש (UI):** המערכת נבנתה באמצעות ספריית **Material UI (MUI)** תוך שימוש ב-Styled Components להתאמה אישית של העיצוב (Custom Branding).
- **ניהול הרשאות:** יישום מנגנון הרשאות קפדני ב-UI (לדוגמה: כפתורי מחיקה וניהול משתמשים חשופים למנהלים בלבד) ושימוש ב-**ProtectedRoute** להגנה על נתיבים ברמת ה-Client.
- **סנכרון נתונים:** עדכון טיקט במסך הפרטים (שינוי סטטוס או הקצאת נציג) מעדכן את המצב הגלובלי באמצעות פונקציית `upsertTicket`, מה שמבטיח רענון מיידי של הנתונים ברשימת הטיקטים ללא צורך בטעינה מחדש.
- **טפסים וולידציה:** שימוש ב-**React Hook Form** לניהול הטפסים במערכת, כולל טיפול בשגיאות נגישות (Accessibility) וסנכרון מול רכיבי ה-Select וה-Input של MUI.

## מבנה עיקרי
- src/context/AuthContext.tsx – ניהול הזדהות + אימות טוקן ב־/auth/me באתחול
- src/context/TicketsContext.tsx – ניהול גלובלי של טיקטים
- src/api/* – קריאות API (auth, tickets, users)
- src/components/* – קומפוננטות (Dashboard, TicketsList, TicketDetails, NewTicket, Users,createUser, Settings, Login/Register)
- App.tsx – ניתוב + ProtectedRoute

