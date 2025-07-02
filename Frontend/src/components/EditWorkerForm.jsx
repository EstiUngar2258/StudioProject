import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateWorkerAsync } from '../redux/thunk';

const EditWorkerForm = ({ worker, onClose }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        firstName: worker?.firstName || '',
        lastName: worker?.lastName || '',
        phone: worker?.phone || '',
        email: worker?.email || '',
        workerType: worker?.workerType || '',
        salaryForHour: worker?.salaryForHour || '',
        bonus: worker?.bonus || '',
        seniority: worker?.seniority || '',
        age: worker?.age || '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateWorkerAsync({ ...form, id: worker.id }));
        onClose();
    };

    if (!worker) return null;

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
                label="שם פרטי"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="שם משפחה"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="טלפון"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="אימייל"
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="סוג עובד"
                name="workerType"
                value={form.workerType}
                onChange={handleChange}
                fullWidth
            />
            <TextField
                label="שכר לשעה"
                name="salaryForHour"
                value={form.salaryForHour}
                onChange={handleChange}
                type="number"
                fullWidth
            />
            <TextField
                label="בונוס"
                name="bonus"
                value={form.bonus}
                onChange={handleChange}
                type="number"
                fullWidth
            />
            <TextField
                label="ותק"
                name="seniority"
                value={form.seniority}
                onChange={handleChange}
                type="number"
                fullWidth
            />
            <TextField
                label="גיל"
                name="age"
                value={form.age}
                onChange={handleChange}
                type="number"
                fullWidth
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    שמור
                </Button>
                <Button onClick={onClose} variant="outlined" color="secondary" fullWidth>
                    ביטול
                </Button>
            </Box>
        </Box>
    );
};

export default EditWorkerForm;