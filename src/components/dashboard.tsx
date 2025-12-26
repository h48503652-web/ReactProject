import { useAuth } from "../context/AuthContext";
import {  Typography, Container, Box, Grid } from "@mui/material";

import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import * as S from "../styles/dashboard.styles";

const Dashboard = () => {
  const { user } = useAuth();

  const renderCard = (to: string, title: string, subtitle: string, icon: React.ReactNode) => (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <S.CardLink to={to}>
        <S.ActionCard elevation={0}>
          <S.IconWrapper>{icon}</S.IconWrapper>
          <Typography variant="h6" fontWeight="700" color="text.primary">{title}</Typography>
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        </S.ActionCard>
      </S.CardLink>
    </Grid>
  );

  return (
    <S.DashboardWrapper>
      <Container maxWidth="lg">
        <S.WelcomeHeader>
          <Typography variant="h3" fontWeight="800" color="#0f172a">שלום, {user?.name}</Typography>
          <Typography variant="h6" color="text.secondary">
            תפקיד במערכת: <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>{user?.role}</Box>
          </Typography>
        </S.WelcomeHeader>

        <Grid container spacing={3}>

          {renderCard("/tickets", "רשימת פניות", "צפייה וניהול כל הקריאות", <ConfirmationNumberIcon fontSize="large" />)}

          {user?.role == "customer" && 
            renderCard("/tickets/new", "פנייה חדשה", "פתיחת קריאת שירות חדשה", <AddCircleOutlineIcon fontSize="large" />)
          }

          {user?.role == "admin" && (
            <>
              {renderCard("/users", "ניהול משתמשים", "צפייה ועריכת משתמשי המערכת", <PeopleIcon fontSize="large" />)}
              {renderCard("/users/new", "יצירת משתמש", "הוספת איש צוות או לקוח חדש", <PersonAddIcon fontSize="large" />)}
              {renderCard("/settings", "הגדרות מערכת", "ניהול סטטוסים, עדיפויות והרשאות", <SettingsIcon fontSize="large" />)}
            </>
          )}
        </Grid>
      </Container>
    </S.DashboardWrapper>
  );
}

export default Dashboard;