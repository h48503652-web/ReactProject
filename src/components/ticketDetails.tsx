import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {Box, Container, Typography, Divider, Stack, Avatar,
  Button, TextField, MenuItem, Select, Skeleton, alpha
} from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';
import * as S from "../styles/TicketDetails.styles";
import { getTicketById, getComments, addComment, updateTicket, getStatuses } from "../api/tickets";
import { getUsers } from "../api/user";
import type { Ticket, Comment, Status } from "../components/tickets";
import type { User } from "../context/AuthContext";
import { useAuth } from "../context/AuthContext";
import { useTickets } from "../context/TicketsContext";

interface CommentForm { content: string; }

const TicketDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ticketId = id ? Number(id) : null;
  const { user: currentUser } = useAuth();
  const { upsertTicket } = useTickets();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [agents, setAgents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<CommentForm>();

  useEffect(() => {
    if (!ticketId) return;
    const fetchData = async () => {
      try {
        const [t, c, s] = await Promise.all([
          getTicketById(ticketId),
          getComments(ticketId),
          getStatuses()
        ]);
        setTicket(t);
        setComments(c);
        setStatuses(s);

        if (currentUser?.role === "admin") {
          try {
            const allUsers = await getUsers();
            setAgents(allUsers.filter((u: User) => u.role === "agent" || u.role === "admin"));
          } catch (userErr) {
            console.warn("User is admin but still got 403 on getUsers - check backend");
          }
        }
      } catch (err) {
        console.error("Critical error loading ticket details:", err);
      }
      finally { setLoading(false); }
    };
    fetchData();
  }, [ticketId, currentUser?.role]);

  const onCommentSubmit = async (data: CommentForm) => {
    if (!ticketId) return;
    try {
      const newComment = await addComment(ticketId, data.content);
      setComments(prev => [...prev, newComment]);
      reset();
    } catch (err) { alert("שגיאה בשליחה"); }
  };

  if (loading) return <S.PageWrapper><Container maxWidth="lg"><Skeleton variant="rectangular" height="80vh" sx={{ borderRadius: '24px' }} /></Container></S.PageWrapper>;
  if (!ticket) return <S.PageWrapper><Typography>הפנייה לא נמצאה</Typography></S.PageWrapper>;

  return (
    <S.PageWrapper>
      <Container maxWidth="lg">
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIosNewIcon sx={{ fontSize: 14, ml: 1 }} />}
          sx={{ mb: 4, color: "#64748B", fontWeight: 700 }}
        >
          חזרה לרשימה
        </Button>

        <S.DetailsLayout>

          <S.MainContent elevation={0}>
            <Stack direction="row" spacing={2} alignItems="center" mb={4}>
              <Avatar sx={{ bgcolor: "#0F172A", width: 48, height: 48 }}>{ticket.created_by ? ticket.created_by : "?"}</Avatar>
              <Box>
                <Typography variant="h4" fontWeight="900" color="#0F172A" sx={{ letterSpacing: "-1px" }}>
                  {ticket.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">פורסם על ידי <b>{ticket.created_by}</b></Typography>
              </Box>
            </Stack>

            <Typography variant="body1" sx={{ color: "#334155", lineHeight: 1.8, mb: 4, whiteSpace: 'pre-wrap', fontSize: '1.1rem' }}>
              {ticket.description}
            </Typography>

            <Divider sx={{ my: 5, borderStyle: 'dashed' }} />

            <Typography variant="h6" fontWeight="900" mb={3}>ציר זמן ושיחה</Typography>

            <Stack direction="column" spacing={0} mb={4} sx={{ display: 'flex' }}>
              {comments.map(c => (
                <S.CommentBubble key={c.id} isOwn={c.author_id === currentUser?.id}>
                  <Typography variant="caption" fontWeight="900" color="primary" sx={{ display: 'block', mb: 0.5 }}>
                    {c.author_name}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#1E293B" }}>{c.content}</Typography>
                  <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.5 }}>
                    {new Date(c.created_at).toLocaleString('he-IL')}
                  </Typography>
                </S.CommentBubble>
              ))}
            </Stack>

            <Box component="form" onSubmit={handleSubmit(onCommentSubmit)} sx={{ mt: 4 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="כתוב תגובה מקצועית..."
                {...register("content", { required: true })}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px", bgcolor: "#F8FAFC" } }}
              />
              <Stack direction="row" justifyContent="flex-end" mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  endIcon={<SendIcon sx={{ mr: 1, transform: 'rotate(180deg)' }} />}
                  sx={{ borderRadius: "14px", px: 5, py: 1.2, bgcolor: "#0F172A", fontWeight: 800 }}
                >
                  שלח תגובה
                </Button>
              </Stack>
            </Box>
          </S.MainContent>

          {/* עמודת צד (Sidebar) */}
          <S.SidebarCard elevation={0}>
            <Stack spacing={4}>
              <Box>
                <S.SectionTitle>סטטוס נוכחי</S.SectionTitle>
                {(currentUser?.role === "agent" || currentUser?.role === "admin") ? (
                  <Select
                    fullWidth
                    size="small"
                    value={ticket.status_id || ''}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      updateTicket(ticketId!, { status_id: val } as any).then(res => {
                        setTicket(res);
                        upsertTicket(res);
                      });
                    }}
                    sx={{ borderRadius: "12px", fontWeight: 800 }}
                  >
                    {statuses.map(s => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
                  </Select>
                ) : (
                  <Typography variant="h6" fontWeight="900" color="primary">{ticket.status_name}</Typography>
                )}
              </Box>

              {(currentUser?.role === "admin") && (
                <Box>
                  <S.SectionTitle>נציג אחראי</S.SectionTitle>
                  <Select
                    fullWidth
                    size="small"
                    value={ticket.assigned_to || ''}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      updateTicket(ticketId!, { assigned_to: val } as any).then(res => {
                        setTicket(res);
                        upsertTicket(res);
                      });
                    }}
                    sx={{ borderRadius: "12px", fontWeight: 800 }}
                  >
                    <MenuItem value="">ללא נציג</MenuItem>
                    {agents.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
                  </Select>
                </Box>
              )}

              <Box sx={{ p: 2.5, borderRadius: "16px", bgcolor: alpha("#0F172A", 0.03) }}>
                <S.SectionTitle>פרטי פנייה</S.SectionTitle>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" fontWeight="700" color="text.secondary">עדיפות:</Typography>
                    <Typography variant="caption" fontWeight="900" color="primary">{ticket.priority_name}</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" fontWeight="700" color="text.secondary">תאריך פתיחה:</Typography>
                    <Typography variant="caption" fontWeight="900">
                      {new Date(ticket.created_at).toLocaleDateString('he-IL')}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </S.SidebarCard>

        </S.DetailsLayout>
      </Container>
    </S.PageWrapper>
  );
};

export default TicketDetails;