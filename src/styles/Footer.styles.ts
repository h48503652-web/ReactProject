import { styled, Box, alpha } from "@mui/material";

// רכיב ה-Container הראשי של הפוטר
export const StyledFooterRoot = styled(Box)(({ theme }) => ({
  marginTop: "auto",
  position: "relative",
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
  color: "#f8fafc",
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(3),
  direction: "rtl",
  boxShadow: "0px -10px 30px rgba(0,0,0,0.1)",
  borderTop: "2px solid rgba(255,255,255,0.05)",
}));

// כרטיס המשתמש עם אפקט הזכוכית (Glassmorphism)
export const UserBadgeCard = styled(Box)(({ theme }) => ({
  backgroundColor: alpha("#334155", 0.5),
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  border: "1px solid rgba(255,255,255,0.1)",
  backdropFilter: "blur(10px)",
  minWidth: "200px",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

export const FooterLink = styled(Box)(({ theme }) => ({
  fontSize: "0.875rem",
  color: "#cbd5e1",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#fff",
    transform: "translateY(-2px)",
  },
}));

export const StatusDot = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: "#22c55e",
  boxShadow: "0 0 8px #22c55e",
}));