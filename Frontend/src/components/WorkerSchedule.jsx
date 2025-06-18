import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Typography, Box, Grid, Button, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, parseISO } from 'date-fns';
import { fetchWorkerShifts } from '../redux/thunk';

// ימים בעברית
const daysShort = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

const WorkerSchedule = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    // קבלת המשמרות מהסטור
    const shifts = useSelector(state => state.worker.shifts || []);

    useEffect(() => {
        if (user?.userId) {
            dispatch(fetchWorkerShifts(user.userId));
        }
    }, [dispatch, user?.userId]);

    // יומן חודשי בלבד
    return <MonthlyCalendar shifts={shifts} />;
};

const MonthlyCalendar = ({ shifts }) => {
    const [selectedDay, setSelectedDay] = useState(null);

    // החודש הנוכחי
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

    // פונקציה להצגת השעות של יום מסוים
    const renderHoursDialog = () => (
        <Dialog
            open={!!selectedDay}
            onClose={() => setSelectedDay(null)}
        >
            <DialogTitle>
                שעות עבודה ליום {selectedDay && format(parseISO(selectedDay), 'dd/MM/yyyy')}
            </DialogTitle>
            <DialogContent>
                <List>
                    {(appointmentsByDay[selectedDay] || []).map((hour, idx) => (
                        <ListItem key={idx}>
                            <ListItemIcon>
                                <AccessTimeIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={hour} />
                        </ListItem>
                    ))}
                </List>
                <Button
                    variant="outlined"
                    sx={{ mt: 2, float: "left" }}
                    onClick={() => setSelectedDay(null)}
                >
                    סגור
                </Button>
            </DialogContent>
        </Dialog>
    );

    // מיקום היום הראשון בשבוע (0=ראשון)
    const firstDayOfWeek = getDay(monthStart);

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
                    {/* רווחים ריקים עד היום הראשון */}
                    {[...Array(firstDayOfWeek)].map((_, idx) => (
                        <Grid item xs={1.71} key={`empty-${idx}`}></Grid>
                    ))}
                    {daysInMonth.map((day, idx) => {
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
                                    onClick={() => setSelectedDay(dateStr)}
                                >
                                    {format(day, 'd')}
                                </Button>
                            </Grid>
                        );
                    })}
                </Grid>
                {renderHoursDialog()}
            </Paper>
        </Box>
    );
};

export default WorkerSchedule;