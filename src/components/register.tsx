import { useForm } from "react-hook-form";
import { registerRequest, loginRequest } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Typography, Box, CircularProgress } from "@mui/material";
import * as S from "../styles/Auth.styles";

export interface RegisterForm { name: string; email: string; password: string; }

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>();
  const navigate = useNavigate();
  const { login, user, loading, setError, setLoading } = useAuth();

  useEffect(() => {
    if (!loading && user) navigate("/dashboard");
  }, [user, loading, navigate]);

const onSubmit = async (data: RegisterForm) => {
  try {
    await registerRequest(data.name, data.email, data.password);
    
    const loginData = await loginRequest(data.email, data.password);
    
    if (loginData && loginData.token) {
      const userToLogin = loginData.user || loginData; 
      login(userToLogin, loginData.token);
      
      navigate("/dashboard");
    } else {
      navigate("/login");
    }

  } catch (err) {
    setError(err);
  }
  finally {
    setLoading(false);  
  }
};

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;

  return (
    <S.AuthPageWrapper>
      <S.AuthCard elevation={0}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: "#0f172a" }}>יצירת חשבון</Typography>
        <Typography variant="body2" sx={{ mb: 4, color: "#64748b" }}>הצטרף למערכת ה-Helpdesk המקצועית שלנו</Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ direction: 'rtl' }}>
          <S.StyledTextField
            fullWidth
            label="שם מלא"
            {...register("name", { required: "שם הוא שדה חובה" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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
            label="סיסמה (לפחות 6 תווים)"
            {...register("password", { required: "סיסמה היא שדה חובה", minLength: 6 })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <S.AuthButton type="submit" fullWidth variant="contained">הירשם עכשיו</S.AuthButton>
        </form>

        <Typography variant="body2" sx={{ mt: 3, color: "#64748b" }}>
          כבר רשום? <Link to="/login" style={{ color: "#38bdf8", textDecoration: 'none', fontWeight: 600 }}>לחץ כאן להתחברות</Link>
        </Typography>
      </S.AuthCard>
    </S.AuthPageWrapper>
  );
};

export default Register;