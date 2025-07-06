import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addWorkerAsync } from '../redux/thunk';

const AddWorkerForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        workerType: '',
        age: '',
        salaryForHour: '',
        seniority: '',
        bonus: '',
        email: '',
    });

    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addWorkerAsync(formData)).unwrap(); // שולח את הנתונים ל-Thunk
            onClose(); // סוגר את הדיאלוג
        } catch (err) {
            setError(err); // מציג שגיאה אם יש בעיה
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ textAlign: 'center', color: '#43cea2', fontWeight: 700 }}>
                הוספת עובד חדש
            </Typography>
            {error && (
                <Typography sx={{ color: 'red', textAlign: 'center' }}>
                    {error.message || 'שגיאה בהוספת עובד'}
                </Typography>
            )}
            <TextField
                label="שם פרטי"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                label="שם משפחה"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                label="טלפון"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                label="סוג עובד"
                name="workerType"
                value={formData.workerType}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                label="גיל"
                name="age"
                value={formData.age}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="שכר לשעה"
                name="salaryForHour"
                value={formData.salaryForHour}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                label="ותק"
                name="seniority"
                value={formData.seniority}
                onChange={handleChange}
                required
                fullWidth
            />
            <TextField
                label="בונוס"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="אימייל"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button type="button" onClick={onClose} variant="outlined" sx={{ color: '#43cea2', borderColor: '#43cea2' }}>
                    ביטול
                </Button>
                <Button type="submit" variant="contained" sx={{ background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)' }}>
                    שמור
                </Button>
            </Box>
        </Box>
    );
};

export default AddWorkerForm;