import { styled, Box, Paper, TableCell, tableCellClasses, TableRow, alpha } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 4),
  background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)",
  minHeight: "100vh",
  direction: "rtl",
}));

export const TableWrapper = styled(Paper)(({ theme }) => ({
  borderRadius: "24px",
  overflow: "hidden",
  border: "1px solid rgba(226, 232, 240, 0.8)",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#ffffff",
    color: "#64748B",
    fontWeight: 800,
    fontSize: "0.85rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    padding: theme.spacing(2, 3),
    borderBottom: "2px solid #F1F5F9",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.95rem",
    padding: theme.spacing(2.5, 3),
    color: "#1E293B",
    borderBottom: "1px solid #F1F5F9",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.02),
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const RoleBadge = styled(Box)<{ role: string }>(({ role }) => {
  const isAdmin = role === 'admin';
  const isAgent = role === 'agent';
  
  return {
    display: "inline-flex",
    padding: "4px 12px",
    borderRadius: "8px",
    fontSize: "0.75rem",
    fontWeight: 800,
    backgroundColor: isAdmin ? alpha("#ef4444", 0.1) : isAgent ? alpha("#3b82f6", 0.1) : alpha("#64748b", 0.1),
    color: isAdmin ? "#ef4444" : isAgent ? "#3b82f6" : "#64748b",
    border: `1px solid ${isAdmin ? alpha("#ef4444", 0.1) : isAgent ? alpha("#3b82f6", 0.1) : alpha("#64748b", 0.1)}`,
  };
});