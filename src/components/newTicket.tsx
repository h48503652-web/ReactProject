import { useForm } from "react-hook-form";
import { createTicket, getPriorities } from "../api/tickets";
import { useNavigate } from "react-router-dom";
import type { Priority } from "./tickets";
import { useEffect, useState } from "react";
import { Typography, Box, CircularProgress, MenuItem, Stack } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import * as S from "../styles/Auth.styles"; 
import { useAuth } from "../context/AuthContext";

interface NewTicketForm {
  subject: string;
  description: string;
  priority_id?: number;
}

const NewTicket = () => {
  const { setError, setLoading } = useAuth();
  const navigate = useNavigate();
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewTicketForm>({
    defaultValues: { priority_id: 1 }
  });

  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const data = await getPriorities();
        setPriorities(data);
      } catch (err) { setError(err); }
      finally { setLoading(false); }
    };
    fetchPriorities();
  }, []);

  const onSubmit = async (data: NewTicketForm) => {
    try {
      await createTicket({ ...data, priority_id: Number(data.priority_id) });
      navigate("/tickets");
    } catch (err) {
      alert("שגיאה ביצירת הפניה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.AuthPageWrapper>
      <S.AuthCard elevation={0}>
        <Box sx={{ mb: 3 }}>
          <AddBoxIcon sx={{ fontSize: 40, color: '#0f172a', mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>פנייה חדשה</Typography>
          <Typography variant="body2" sx={{ color: "#64748b" }}>נשמח לעזור בכל נושא, פרט את פנייתך כאן</Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} style={{ direction: 'rtl' }}>
          <Stack spacing={2.5}>
            <S.StyledTextField
              fullWidth
              label="נושא הפניה"
              id="subject"
              {...register("subject", { required: "נא להזין נושא" })}
              error={!!errors.subject}
              helperText={errors.subject?.message}
            />

            <S.StyledTextField
              fullWidth
              label="תיאור הבעיה"
              id="description"
              multiline
              rows={4}
              {...register("description", { required: "נא להזין תיאור" })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            {priorities.length > 0 && (
            <S.StyledTextField
              select
              fullWidth
              label="רמת דחיפות"
              id="priority_id"
              defaultValue={1}
              {...register("priority_id")}
            >
              {priorities.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              ))}
            </S.StyledTextField>
            )}

            <S.AuthButton type="submit" fullWidth variant="contained" disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "שלח פנייה עכשיו"}
            </S.AuthButton>
          </Stack>
        </form>
      </S.AuthCard>
    </S.AuthPageWrapper>
  );
};

export default NewTicket;