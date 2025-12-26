import { styled, AppBar, Box, Button, alpha } from "@mui/material";
import { Link } from "react-router-dom";

// הבר הראשי עם אפקט זכוכית וטשטוש
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: alpha("#0f172a", 0.95), // כחול כהה עמוק עם שקיפות קלה
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  borderBottom: "1px solid rgba(255,255,255,0.05)",
  position: "sticky",
  color: "#fff",
  direction: "rtl",
}));

// לוגו מעוצב
export const LogoLink = styled(Link)({
  textDecoration: "none",
  color: "#fff",
  fontWeight: 800,
  fontSize: "1.4rem",
  letterSpacing: "1px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "& span": {
    color: "#38bdf8", // צבע הציאן היוקרתי מהפוטר
    fontWeight: 300,
  },
});

// לינקים בתפריט הניווט
export const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "#cbd5e1",
  fontSize: "0.9rem",
  fontWeight: 500,
  marginRight: theme.spacing(3),
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#38bdf8",
  },
}));

// כפתור התנתקות יוקרתי
// במקום Button, נשתמש ב-any זמני או פשוט נגדיר אותו כרכיב גמיש
export const LogoutButton = styled(Button)<{ to?: string; component?: any }>(({ theme }) => ({
  border: "1px solid rgba(22, 183, 118, 0.5)",
    borderColor: "#26ab36ff",
  color: "#28aa37ff",
  borderRadius: "8px",
  padding: "4px 16px",
  fontSize: "0.85rem",
  textTransform: "none",
  transition: "0.3s",
  "&:hover": {
    background: alpha("#28a64eff", 0.1),
    borderColor: "#2aa739ff",
  },
}));

// קונטיינר למשתמש
export const UserSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(0.5, 2),
  borderRadius: "20px",
  background: "rgba(255,255,255,0.03)",
}));