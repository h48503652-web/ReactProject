import { styled, Box, Paper, Typography, alpha, ListItem } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
  minHeight: "100vh",
  direction: "rtl",
}));

export const SettingsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "24px",
  backgroundColor: "#ffffff",
  border: "1px solid rgba(226, 232, 240, 0.8)",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
  marginBottom: theme.spacing(4),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: "12px",
  marginBottom: theme.spacing(1),
  backgroundColor: alpha(theme.palette.primary.main, 0.02),
  border: "1px solid transparent",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "#ffffff",
    borderColor: theme.palette.primary.light,
    transform: "translateX(-4px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
}));

export const SectionHeader = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  color: "#0F172A",
  marginBottom: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));