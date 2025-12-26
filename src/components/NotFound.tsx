import { Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import * as S from "../styles/notFound.styles";

const NotFound = () => {
  return (
    <S.FullPageWrapper>
      <Container maxWidth="sm">
        <ErrorOutlineIcon sx={{ fontSize: "4rem", color: "#38bdf8", mb: 2 }} />
        
        <S.ErrorCode>404</S.ErrorCode>
        
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: "#0f172a" }}>
          אופס! הדף לא נמצא
        </Typography>
        
        <Typography variant="body1" sx={{ color: "#64748b", mb: 4 }}>
          מצטערים, נראה שהדף שחיפשת אינו קיים או שהועבר לכתובת אחרת.
        </Typography>

        <S.ActionButton 
          component={Link} 
          to="/dashboard" 
          variant="contained"
        >
          חזרה לדף הבית
        </S.ActionButton>
      </Container>
    </S.FullPageWrapper>
  );
}

export default NotFound;



