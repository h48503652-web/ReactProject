import { styled, Box, Paper, alpha, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// קונטיינר ראשי
export const DashboardWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  direction: "rtl",
  minHeight: "85vh",
  background: "#f8fafc",
}));

// כרטיס פעולה (הקישורים)
export const ActionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  transition: "all 0.3s ease",
  cursor: "pointer",
  border: "1px solid rgba(0,0,0,0.05)",
  height: "100%",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    borderColor: theme.palette.primary.main,
  },
}));

// לינק שעוטף את הכרטיס
export const CardLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  width: "100%",
});

// אייקון בתוך כרטיס
export const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  background: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
}));

// כותרת עליונה
export const WelcomeHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  borderRight: `4px solid ${theme.palette.primary.main}`,
  paddingRight: theme.spacing(2),
}));