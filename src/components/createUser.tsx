import React, { useState } from 'react';
import {  MenuItem,Typography, Alert, Stack, IconButton, Container, InputAdornment
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import BadgeIcon from '@mui/icons-material/Badge';
import { useNavigate } from 'react-router-dom';
import { adminCreateUser } from '../api/user';

import * as S from "../styles/Auth.styles"; 

const CreateUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer' 
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await adminCreateUser(formData);
            setSuccess(true);
            setTimeout(() => navigate('/users'), 2000);
        } catch (err: any) {

            setError(err.response?.data?.message || 'חלה שגיאה ביצירת המשתמש');

        }
    };

    return (
        <S.AuthPageWrapper>
            <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <IconButton 
                    onClick={() => navigate('/users')} 
                    sx={{ alignSelf: 'flex-start', mb: 2, color: "#64748B" }}
                >
                    <ArrowBackIcon sx={{ transform: 'rotate(180deg)' }} />
                </IconButton>

                <S.AuthCard elevation={0}>
                    <PersonAddIcon sx={{ fontSize: 48, color: "#0f172a", mb: 2 }} />

                    <Typography variant="h4" fontWeight="900" sx={{ color: "#0F172A", mb: 1 }}>
                        יצירת משתמש חדש
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748B", mb: 4 }}>
                        ממשק מנהל להוספת משתמשים למערכת
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 3, textAlign: 'right' }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 3, textAlign: 'right' }}>המשתמש נוצר בהצלחה!</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={1}>
                            <S.StyledTextField
                                fullWidth
                                label="שם מלא"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <BadgeIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <S.StyledTextField
                                fullWidth
                                label="אימייל"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <S.StyledTextField
                                fullWidth
                                label="סיסמה"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <S.StyledTextField
                                fullWidth
                                select
                                label="תפקיד"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <MenuItem value="customer">לקוח (Customer)</MenuItem>
                                <MenuItem value="agent">נציג (Agent)</MenuItem>
                                <MenuItem value="admin">מנהל (Admin)</MenuItem>
                            </S.StyledTextField>

                            <S.AuthButton
                                fullWidth
                                type="submit"
                                variant="contained"
                            >
                                צור משתמש עכשיו
                            </S.AuthButton>
                        </Stack>
                    </form>
                </S.AuthCard>
            </Container>
        </S.AuthPageWrapper>
    );
};

export default CreateUser;