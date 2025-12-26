import { useAuth } from "../context/AuthContext";
import { Toolbar, Container, Typography, Box, Skeleton } from "@mui/material";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import * as S from "../styles/header.styles";

const Header = () => {
  const { user, logout, loading } = useAuth();

  return (
    <S.StyledAppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0 } }}>
          
          <S.LogoLink to="/dashboard">
            <SupportAgentIcon sx={{ color: "#38bdf8" }} />
            HELPDESK <span>PRO</span>
          </S.LogoLink>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {loading ? (
              <Skeleton variant="rectangular" width={200} height={30} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
            ) : user ? (
              <>
                <S.UserSection sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                  <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                    שלום, <strong>{user.name}</strong>
                  </Typography>
                </S.UserSection>

                <S.NavLink to="/dashboard">דשבורד</S.NavLink>
                <S.NavLink to="/tickets">פניות שירות</S.NavLink>

                {user.role === "customer" && (
                  <S.NavLink to="/tickets/new">פנייה חדשה</S.NavLink>
                )}

                

                {(user.role=="admin")&&(
                  <S.NavLink to="/users">ניהול משתמשים</S.NavLink>

                  
                )}

                {(user.role=="admin")&&(
                  <S.NavLink to="/users/new">יצירת משתמש חדש</S.NavLink>
                )}

                {(user.role=="admin")&&(
                  <S.NavLink to="/settings">הגדרות מערכת</S.NavLink>
                )}

                <S.LogoutButton onClick={logout} size="small">
                  התנתק
                </S.LogoutButton>
              </>
            ) : (
              <>
                <S.NavLink to="/login">כניסה</S.NavLink>
                <S.LogoutButton 
                    component={S.NavLink} 
                    to="/register" 
                    sx={{ borderColor: "#38bdf8", color: "#38bdf8" }}
                >
                  הרשמה
                </S.LogoutButton>
              </>
            )}
          </Box>
          
        </Toolbar>
      </Container>
    </S.StyledAppBar>
  );
};

export default Header;