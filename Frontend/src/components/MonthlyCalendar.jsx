import React, { useState } from 'react';
import { Paper, Typography, Box, Grid, Button } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from 'date-fns';
import HoursDialog from './HoursDialog';

// ימים בעברית
const daysShort = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

const MonthlyCalendar = ({ shifts }) => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false); // חדש

    const today = new Date();
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // הפקת אובייקט: { 'YYYY-MM-DD': [שעות, ...] }
    const appointmentsByDay = {};
    shifts.forEach(app => {
        if (!app.dateTime || !app.hour) return;
        if (!appointmentsByDay[app.dateTime]) appointmentsByDay[app.dateTime] = [];
        appointmentsByDay[app.dateTime].push(app.hour);
    });

    const firstDayOfWeek = getDay(monthStart);

    // פותח דיאלוג ומעדכן יום נבחר
    const handleDayClick = (dateStr) => {
        setSelectedDay(dateStr);
        setDialogOpen(true);
    };

    // סוגר דיאלוג
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    // איפוס יום נבחר אחרי סגירה מלאה
    const handleDialogExited = () => {
        setSelectedDay(null);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Paper
                sx={{
                    borderRadius: 5,
                    background: "rgba(34,34,60,0.92)",
                    boxShadow: "0 8px 32px 0 rgba(67,206,162,0.18), 0 1.5px 8px 0 #23234a",
                    p: 3,
                    maxWidth: 600,
                    mx: "auto"
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        color: "#43cea2",
                        fontWeight: 700,
                        textAlign: "center",
                        mb: 2,
                        letterSpacing: 1.2
                    }}
                >
                    יומן חודשי
                </Typography>
                <Grid container spacing={1} justifyContent="center">
                    {daysShort.map((d, idx) => (
                        <Grid item xs={1.71} key={idx}>
                            <Box sx={{ color: "#43cea2", fontWeight: 700, textAlign: "center" }}>{d}</Box>
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                    {[...Array(firstDayOfWeek)].map((_, idx) => (
                        <Grid item xs={1.71} key={`empty-${idx}`}></Grid>
                    ))}
                    {daysInMonth.map((day) => {
                        const dateStr = format(day, 'yyyy-MM-dd');
                        const hasHours = !!appointmentsByDay[dateStr];
                        return (
                            <Grid item xs={1.71} key={dateStr}>
                                <Button
                                    fullWidth
                                    variant={hasHours ? "contained" : "outlined"}
                                    sx={{
                                        minWidth: 0,
                                        minHeight: 0,
                                        background: hasHours
                                            ? (isToday(day) ? "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)" : "#43cea2")
                                            : "rgba(67,206,162,0.07)",
                                        color: hasHours ? "#fff" : "#bbb",
                                        borderRadius: 2,
                                        fontWeight: 700,
                                        border: hasHours ? "none" : "1px solid #43cea2",
                                        boxShadow: hasHours ? "0 2px 8px #43cea2a0" : "none",
                                        fontSize: "1.1rem"
                                    }}
                                    disabled={!hasHours}
                                    onClick={() => handleDayClick(dateStr)}
                                >
                                    {format(day, 'd')}
                                </Button>
                            </Grid>
                        );
                    })}
                </Grid>
                <HoursDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    selectedDay={selectedDay}
                    hours={appointmentsByDay[selectedDay] || []}
                    onExited={handleDialogExited}
                />
            </Paper>
        </Box>
    );
};

export default MonthlyCalendar;