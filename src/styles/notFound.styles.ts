import { styled, Box, Button, Typography } from "@mui/material";

export const FullPageWrapper = styled(Box)({
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "20px",
  direction: "rtl",
});

export const ErrorCode = styled(Typography)(({ theme }) => ({
  fontSize: "8rem",
  fontWeight: 900,
  background: "linear-gradient(135deg, #0f172a 0%, #38bdf8 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  lineHeight: 1,
  marginBottom: theme.spacing(2),
}));

// נוסיף הגדרת טיפוס קטנה <{ component?: any; to?: string }>
export const ActionButton = styled(Button)<{ component?: any; to?: string }>(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: "10px 30px",
  borderRadius: "12px",
  fontWeight: 700,
  background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)",
  color: "#fff",
  boxShadow: "0 10px 20px rgba(15, 23, 42, 0.2)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 25px rgba(15, 23, 42, 0.3)",
    background: "#1e293b", // צבע כהה אחיד במעבר עכבר
  },
}));