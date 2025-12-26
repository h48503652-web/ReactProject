import { styled, Box, Paper, Button, TextField, alpha } from "@mui/material";

// רקע לכל המסך שממשיך את הקו של ה-Header/Footer
export const AuthPageWrapper = styled(Box)({
  minHeight: "80vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  padding: "20px",
});

// הכרטיס המרכזי
// בתוך Auth.styles.ts - עדכון קטן ל-AuthCard
export const AuthCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  width: "100%",
  maxWidth: "550px", // הגדלנו מעט בשביל תיאור הפנייה
  borderRadius: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  border: "1px solid rgba(255,255,255,0.8)",
  background: alpha("#fff", 0.9),
  backdropFilter: "blur(10px)",
  textAlign: "center",
}));

// כפתור התחברות/הרשמה יוקרתי
export const AuthButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: "12px",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "1rem",
  background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
  color: "#fff",
  "&:hover": {
    background: "#334155",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
}));

// שדה קלט מעוצב
export const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
});