import { useEffect, useState } from "react";
import { getUsers } from "../api/user";
import { useAuth, type User } from "../context/AuthContext";
import {
  Table, TableBody, TableContainer, TableHead, TableRow,
  Typography, Container, Stack, Avatar, Box, Skeleton
} from "@mui/material";
import * as S from "../styles/UsersList.styles";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { setError } = useAuth();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err);
      } finally {
       
        setIsInitialLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isInitialLoading) return (
    <S.PageContainer>
      <Container maxWidth="lg">
        <Skeleton variant="text" width={200} height={60} sx={{ mb: 4 }} />
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: '24px' }} />
      </Container>
    </S.PageContainer>
  );

  return (
    <S.PageContainer>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
          <Box>
            <Typography variant="h3" fontWeight="900" sx={{ color: "#0F172A", letterSpacing: "-1.5px" }}>
              ניהול משתמשים
            </Typography>
            <Typography variant="body1" sx={{ color: "#64748B", fontWeight: 500 }}>
              צפייה וניהול הרשאות צוות המערכת
            </Typography>
          </Box>
        </Stack>

        <S.TableWrapper elevation={0}>
          <TableContainer>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <S.StyledTableCell>מזהה</S.StyledTableCell>
                  <S.StyledTableCell>משתמש</S.StyledTableCell>
                  <S.StyledTableCell>אימייל</S.StyledTableCell>
                  <S.StyledTableCell align="center">תפקיד במערכת</S.StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <S.StyledTableCell colSpan={4} align="center" sx={{ py: 10 }}>
                      <Typography color="text.secondary">אין משתמשים להצגה.</Typography>
                    </S.StyledTableCell>
                  </TableRow>
                ) : (
                  users.map((u) => (
                    <S.StyledTableRow key={u.id}>
                      <S.StyledTableCell sx={{ color: "#94A3B8", fontWeight: 700 }}>
                        #{u.id}
                      </S.StyledTableCell>
                      <S.StyledTableCell>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: '#0F172A' }}>
                            {u.name ? u.name[0].toUpperCase() : "?"}
                          </Avatar>
                          <Typography fontWeight="700">{u.name}</Typography>
                        </Stack>
                      </S.StyledTableCell>
                      <S.StyledTableCell sx={{ color: "#64748B" }}>
                        {u.email}
                      </S.StyledTableCell>
                      <S.StyledTableCell align="center">
                        <S.RoleBadge role={u.role || 'user'}>
                          {u.role === 'admin' ? 'מנהל מערכת' : u.role === 'agent' ? 'נציג שירות' : 'לקוח'}
                        </S.RoleBadge>
                      </S.StyledTableCell>
                    </S.StyledTableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </S.TableWrapper>
      </Container>
    </S.PageContainer>
  );
};

export default UsersList;