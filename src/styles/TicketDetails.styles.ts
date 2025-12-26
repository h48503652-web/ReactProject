import { styled, Box, Paper, alpha, Typography } from "@mui/material";

export const PageWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
  minHeight: "100vh",
  direction: "rtl",
}));

// הקסם קורה כאן: סידור הדף ל-2 עמודות בלי Grid של MUI
export const DetailsLayout = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 350px", // תוכן ראשי גמיש וסיידבר קבוע
  gap: theme.spacing(4),
  alignItems: "start",
  
  // בטלפונים זה יהפוך לעמודה אחת
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const MainContent = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "24px",
  backgroundColor: "#ffffff",
  border: "1px solid rgba(226, 232, 240, 0.8)",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
}));

export const SidebarCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "20px",
  backgroundColor: "#ffffff",
  border: "1px solid rgba(226, 232, 240, 0.8)",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
  position: "sticky",
  top: theme.spacing(4),
}));

export const CommentBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})<{ isOwn?: boolean }>(({ theme, isOwn }) => ({
  padding: theme.spacing(2.5),
  borderRadius: "18px",
  backgroundColor: isOwn ? alpha(theme.palette.primary.main, 0.05) : "#F1F5F9",
  marginBottom: theme.spacing(2),
  border: `1px solid ${isOwn ? alpha(theme.palette.primary.main, 0.1) : "transparent"}`,
  maxWidth: "85%",
  alignSelf: isOwn ? "flex-start" : "flex-end",
  position: "relative",
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "0.7rem",
  fontWeight: 900,
  textTransform: "uppercase",
  color: "#94A3B8",
  letterSpacing: "1px",
  marginBottom: theme.spacing(1.5),
}));