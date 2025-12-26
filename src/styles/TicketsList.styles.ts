import { styled, Box, Paper, Chip, alpha, TextField } from "@mui/material";

export const ListContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
  minHeight: "100vh",
  direction: "rtl",
}));

// פתרון בעיית הרווחים - שימוש ב-Grid עם gap מוגדר
export const TicketsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  // יוצר עמודות ברוחב מינימלי של 320 פיקסלים שמתרחבות לפי המסך
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
  // רווח ברור בין הכרטיסים (אנכי ואופקי)
  gap: "32px", 
  width: "100%",
  boxSizing: "border-box",
}));

export const TicketCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "24px",
  background: "#ffffff",
  border: "1px solid rgba(226, 232, 240, 0.8)",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  display: "flex",
  flexDirection: "column",
  height: "100%", 
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08)",
    borderColor: theme.palette.primary.light,
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    right: 0,
    width: "6px",
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    opacity: 0.9,
  }
}));

interface StatusChipProps {
  statusColor?: string;
}

export const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'statusColor',
})<StatusChipProps>(({ statusColor }) => {
  const isClosed = statusColor === 'סגור';
  return {
    fontWeight: 800,
    fontSize: "0.75rem",
    height: "26px",
    borderRadius: "10px",
    backgroundColor: isClosed ? "#F1F5F9" : alpha("#0F172A", 0.05),
    color: isClosed ? "#64748B" : "#0F172A",
    border: `1px solid ${isClosed ? "#E2E8F0" : alpha("#0F172A", 0.1)}`,
  };
});



// מיכל לסינון שמעניק לו מראה נקי ומרווח
export const FilterWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  maxWidth: "450px",
  width: "100%",
}));

// שדה חיפוש מעוצב בסגנון ה-Auth
export const SearchField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    transition: "all 0.2s ease-in-out",
    border: "1px solid rgba(226, 232, 240, 0.8)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    
    "&:hover": {
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.08)",
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused": {
      backgroundColor: "#fff",
      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.1)}`,
    }
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));