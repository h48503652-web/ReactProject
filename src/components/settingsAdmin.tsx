import React, { useState, useEffect } from 'react';
import {  getStatuses, adminCreatePriority, getPriorities, adminCreateStatus 
} from '../api/tickets';
import type { Status } from './tickets';
import { Typography, Container, TextField, Button, MenuItem, Stack, Divider, List, ListItemText, Chip, Box
} from "@mui/material";
import { alpha } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListIcon from '@mui/icons-material/List';
import * as S from "../styles/AdminSettings.styles";
import { useAuth } from '../context/AuthContext';

const AdminSettings = () => {
  const [newName, setNewName] = useState("");
  const [type, setType] = useState("status");
  const [list, setList] = useState<Status[]>([]);
  const [loading, setLoading] = useState(false);
  const { setError } = useAuth();

  const refreshData = async () => {
    setLoading(true);
    try {
      const data = type === "status" ? await getStatuses() : await getPriorities();
      setList(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    try {
      if (type === "status") {
        await adminCreateStatus({ name: newName });
      } else {
        await adminCreatePriority({ name: newName });
      }
      setNewName("");
      refreshData();
    } catch (err) {
      setError(err);
     
    }
  };

  return (
    <S.PageContainer>
      <Container maxWidth="md">
        <Stack direction="row" spacing={2} alignItems="center" mb={5}>
          <SettingsIcon sx={{ fontSize: 40, color: "#0F172A" }} />
          <Box>
            <Typography variant="h3" fontWeight="900" sx={{ color: "#0F172A", letterSpacing: "-1.5px" }}>
              הגדרות מערכת
            </Typography>
            <Typography variant="body1" sx={{ color: "#64748B", fontWeight: 500 }}>
              ניהול סטטוסים ורמות דחיפות של פניות
            </Typography>
          </Box>
        </Stack>

        <S.SettingsCard elevation={0}>
          <S.SectionHeader variant="h6">
            <AddCircleOutlineIcon color="primary" />
            הוספת הגדרה חדשה
          </S.SectionHeader>
          
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                select
                label="סוג ההגדרה"
                value={type}
                onChange={(e) => setType(e.target.value)}
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              >
                <MenuItem value="status">סטטוס (Status)</MenuItem>
                <MenuItem value="priority">רמת דחיפות (Priority)</MenuItem>
              </TextField>

              <TextField
                label={`שם ה${type === "status" ? "סטטוס" : "עדיפות"}`}
                placeholder="למשל: בטיפול דחוף, ממתין לספק..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                fullWidth
                required
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />

              <Button 
                type="submit" 
                variant="contained" 
                disableElevation
                fullWidth
                sx={{ 
                  borderRadius: '12px', 
                  py: 1.5, 
                  background: '#0F172A',
                  fontWeight: 800,
                  fontSize: '1rem',
                  '&:hover': { background: '#1E293B' }
                }}
              >
                הוסף למערכת
              </Button>
            </Stack>
          </Box>
        </S.SettingsCard>

        <S.SettingsCard elevation={0}>
          <S.SectionHeader variant="h6">
            <ListIcon color="primary" />
            רשימת {type === "status" ? "סטטוסים" : "עדיפויות"} קיימים
          </S.SectionHeader>
          
          <Divider sx={{ mb: 2, opacity: 0.6 }} />

          <List sx={{ width: '100%' }}>
            {list.map((item) => (
              <S.StyledListItem key={item.id}>
                <ListItemText 
                  primary={item.name} 
                  primaryTypographyProps={{ fontWeight: 700, color: "#1E293B" }}
                />
                <Chip 
                  label={`ID: ${item.id}`} 
                  size="small" 
                  sx={{ 
                    borderRadius: '8px', 
                    fontWeight: 800, 
                    bgcolor: alpha("#0F172A", 0.05),
                    color: "#64748B"
                  }} 
                />
              </S.StyledListItem>
            ))}
            {list.length === 0 && !loading && (
              <Typography sx={{ py: 4, textAlign: 'center', color: '#94A3B8' }}>
                לא נמצאו נתונים
              </Typography>
            )}
          </List>
        </S.SettingsCard>
      </Container>
    </S.PageContainer>
  );
};

export default AdminSettings;