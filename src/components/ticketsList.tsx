import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketsContext";
import { Link } from "react-router-dom";
import {
  Typography, Button, Box, Divider, Stack, Container, Avatar, alpha, InputAdornment
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import * as S from "../styles/TicketsList.styles";

const TicketsList = () => {
  const { user } = useAuth();
  const { tickets, loading, fetchTickets, removeTicket } = useTickets();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toString().includes(searchTerm)
    );
  }, [tickets, searchTerm]);

  if (loading) {
    return (
      <S.ListContainer>
        <Container maxWidth="xl">
          <Typography variant="h6" sx={{ color: "#64748B", textAlign: "center", mt: 10 }}>
            טוען פניות...
          </Typography>
        </Container>
      </S.ListContainer>
    );
  }

  return (
    <S.ListContainer>
      <Container maxWidth="xl">

        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
          <Box>
            <Typography variant="h3" fontWeight="900" sx={{ color: "#0F172A", letterSpacing: "-1.5px" }}>
              פניות שירות
            </Typography>
            <Typography variant="body1" sx={{ color: "#64748B" }}>מרכז שליטה ובקרה בזמן אמת</Typography>
          </Box>
             {user?.role == "customer" && (
          <Button
        
            component={Link} to="/tickets/new"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              borderRadius: '14px',
              background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)',
              px: 4,
              py: 1.5,
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(15, 23, 42, 0.2)",
              "&:hover": { background: "#334155" }
            }}
          >
            פנייה חדשה
          </Button>
             )}
        </Stack>

        <S.FilterWrapper>
          <S.SearchField
            fullWidth
            placeholder="חיפוש לפי נושא או מס' פנייה..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#94A3B8", ml: 1 }} />
                </InputAdornment>
              ),
            }}
          />
        </S.FilterWrapper>

        <S.TicketsGrid>
          {filteredTickets.length === 0 ? (
            <Box sx={{ gridColumn: '1/-1', textAlign: 'center', py: 10 }}>
              <Typography variant="h5" fontWeight="700" color="#94A3B8">
                {searchTerm ? "לא נמצאו פניות תואמות לחיפוש" : "אין פניות במערכת"}
              </Typography>
            </Box>
          ) : (
            filteredTickets.map((ticket) => (
              <S.TicketCard key={ticket.id} elevation={0}>

                <Stack direction="row" justifyContent="space-between" mb={3}>
                  <S.StatusChip
                    label={ticket.status_name || "בטיפול"}
                    statusColor={ticket.status_name as string}
                    size="small"
                  />
                  <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 700 }}>
                    #{ticket.id}
                  </Typography>
                </Stack>

                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="800" sx={{ color: "#1E293B", mb: 1, lineHeight: 1.3 }}>
                    {ticket.subject}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#475569", lineHeight: 1.6 }}>
                    {ticket.description.length > 95 ? `${ticket.description.substring(0, 95)}...` : ticket.description}
                  </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed', my: 2.5, opacity: 0.6 }} />


                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem' }}>
                      {String(ticket.created_by)}
                    </Avatar>
                    <Typography variant="caption" fontWeight="800" sx={{ color: "#38bdf8" }}>
                      {ticket.priority_name}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={0.5}>
                    <Button
                      component={Link} to={`/tickets/${ticket.id}`}
                      size="small"
                      sx={{
                        color: "#0F172A",
                        fontWeight: 800,
                        borderRadius: "8px",
                        "&:hover": { bgcolor: alpha("#0F172A", 0.04) }
                      }}
                    >
                      צפייה
                    </Button>

                    {user?.role === 'admin' && (
                      <Button
                        onClick={() => removeTicket(ticket.id)}
                        sx={{ minWidth: 0, color: "#FDA4AF", "&:hover": { color: "#F43F5E", bgcolor: "transparent" } }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </Button>
                    )}
                  </Stack>
                </Stack>
              </S.TicketCard>
            ))
          )}
        </S.TicketsGrid>
      </Container>
    </S.ListContainer>
  );
};

export default TicketsList;