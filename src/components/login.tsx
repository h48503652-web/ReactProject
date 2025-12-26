import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../api/auth";
import { Typography, Box, CircularProgress } from "@mui/material";
import * as S from "../styles/Auth.styles";

interface LoginForm { email: string; password: string; }

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/dashboard");
  }, [user, loading, navigate]);

  const onSubmit = async (data: LoginForm) => {
    try {
      const { token, user: userData } = await loginRequest(data.email, data.password);
      login(userData, token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "פרטי התחברות שגויים");
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <S.AuthPageWrapper>
      <S.AuthCard elevation={0}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#0f172a" }}>ברוכים השבים</Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "#64748b" }}>התחבר כדי לנהל את הפניות שלך</Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ direction: 'rtl' }}>
          <S.StyledTextField
            fullWidth
            label="מייל"
            {...register("email", { required: "מייל הוא שדה חובה" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <S.StyledTextField
            fullWidth
            type="password"
            label="סיסמה"
            {...register("password", { required: "סיסמה היא שדה חובה" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <S.AuthButton type="submit" fullWidth variant="contained">התחבר למערכת</S.AuthButton>
        </form>

        <Typography variant="body2" sx={{ mt: 3, color: "#64748b" }}>
          אין לך חשבון? <Link to="/register" style={{ color: "#38bdf8", textDecoration: 'none', fontWeight: 600 }}>הירשם כאן</Link>
        </Typography>
      </S.AuthCard>
    </S.AuthPageWrapper>
  );
};

export default Login;