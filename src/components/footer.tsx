import React from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Typography, Stack, Avatar, Divider, Box } from "@mui/material";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

import * as S from "../styles/Footer.styles"; 

const Footer: React.FC = () => {
  const { user } = useAuth();

  return (
    <S.StyledFooterRoot>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          {/* מיתוג */}
          <Box sx={{ maxWidth: "300px", textAlign: { xs: "center", md: "right" } }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
              <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40, boxShadow: "0 0 15px rgba(25, 118, 210, 0.4)" }}>
                <SupportAgentIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff" }}>
                HELPDESK <span style={{ color: "#38bdf8", fontWeight: 300 }}>PRO</span>
              </Typography>
            </Stack>
            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
              מערכת התמיכה המובילה לניהול פניות חכם. חווית שירות בסטנדרט הגבוה ביותר.
            </Typography>
          </Box>

          {/* ניווט */}
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2" sx={{ mb: 2, color: "#38bdf8", fontWeight: 700 }}>
              ניווט מהיר
            </Typography>
            <Stack direction="row" spacing={3}>
              {["דשבורד |" , "טיקטים |" ," עזרה"].map((item) => (
                <S.FooterLink key={item}>{item}</S.FooterLink>
              ))}
            </Stack>
          </Box>

          {/* כרטיס משתמש */}
          {user && (
            <S.UserBadgeCard>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "#38bdf8" }}>{user.name[0]}</Avatar>
              <Box>
                <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>מחובר כעת</Typography>
                <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: 600 }}>{user.name}</Typography>
              </Box>
              <VerifiedUserIcon sx={{ fontSize: 16, color: "#38bdf8" }} />
            </S.UserBadgeCard>
          )}
        </Stack>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.05)" }} />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" sx={{ color: "#64748b" }}>
            © {new Date().getFullYear()} Helpdesk Premium. כל הזכויות שמורות.
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <S.StatusDot />
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>שרת פעיל ותקין</Typography>
          </Stack>
        </Stack>
      </Container>
    </S.StyledFooterRoot>
  );
};

export default Footer;