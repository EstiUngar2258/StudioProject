import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { addFreeQueuesAsync } from '../redux/thunk';

const MonthlyScheduleManager = () => {
    const dispatch = useDispatch();
    const [schedule, setSchedule] = useState([]);
    const [month, setMonth] = useState(new Date().getMonth() + 1); // חודש הבא
    const [year, setYear] = useState(new Date().getFullYear());

    // יצירת ימים ושעות לחודש הבא
    const generateSchedule = () => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const newSchedule = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day);
            newSchedule.push({
                date: date.toISOString().split('T')[0], // תאריך בפורמט YYYY-MM-DD
                hours: Array.from({ length: 24 }, (_, i) => ({
                    time: `${i.toString().padStart(2, '0')}:00`,
                    isFree: false,
                })),
            });
        }
        setSchedule(newSchedule);
    };

    // הוספת שעה לתאריך מסוים
    const addHourToDate = (date) => {
        const updatedSchedule = schedule.map((item) =>
            item.date === date ? { ...item, hours: [...item.hours, '08:00'] } : item
        );
        setSchedule(updatedSchedule);
    };

    // אישור המערכת
    const handleApproveSchedule = async () => {
        const freeQueues = schedule.flatMap((item) =>
            item.hours
                .filter((hour) => hour.isFree)
                .map((hour) => ({
                    workerId: 0, // יש להחליף ב-ID של העובד המתאים
                    dateTime: item.date,
                    hour: hour.time,
                }))
        );

        for (const queue of freeQueues) {
            try {
                await dispatch(addFreeQueuesAsync(queue)); // שליחת כל תור בנפרד
                console.log('Queue added successfully:', queue);
            } catch (error) {
                console.error('Failed to add queue:', queue, error);
            }
        }
    };

    const toggleHoursVisibility = (date) => {
        const updatedSchedule = schedule.map((item) =>
            item.date === date ? { ...item, isHoursVisible: !item.isHoursVisible } : item
        );
        setSchedule(updatedSchedule);
    };

    const toggleHourAvailability = (date, time) => {
        const updatedSchedule = schedule.map((item) =>
            item.date === date
                ? {
                      ...item,
                      hours: item.hours.map((hour) =>
                          hour.time === time ? { ...hour, isFree: !hour.isFree } : hour
                      ),
                  }
                : item
        );
        setSchedule(updatedSchedule);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', color: '#43cea2', fontWeight: 700 }}>
                ניהול מערכת חודשית לחודש הבא
            </Typography>
            <Button
                variant="contained"
                sx={{ mb: 3, background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)' }}
                onClick={generateSchedule}
            >
                יצירת מערכת חודשית
            </Button>
            {schedule.length === 0 ? (
                <Typography sx={{ textAlign: 'center', color: '#fff' }}>אין מערכת חודשית</Typography>
            ) : (
                <Table sx={{ background: '#23234acc', borderRadius: 3 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: '#43cea2', fontWeight: 700 }}>תאריך</TableCell>
                            <TableCell sx={{ color: '#43cea2', fontWeight: 700 }}>שעות</TableCell>
                            <TableCell sx={{ color: '#43cea2', fontWeight: 700 }}>פעולות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schedule.map((item) => (
                            <TableRow key={item.date}>
                                <TableCell sx={{ color: '#fff' }}>{item.date}</TableCell>
                                <TableCell sx={{ color: '#fff' }}>
                                    <Button
                                        variant="outlined"
                                        sx={{ color: '#43cea2', borderColor: '#43cea2' }}
                                        onClick={() => toggleHoursVisibility(item.date)}
                                    >
                                        הצג שעות
                                    </Button>
                                    {item.isHoursVisible && (
                                        <Box sx={{ mt: 2 }}>
                                            {item.hours.map((hour, index) => (
                                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography sx={{ color: '#fff' }}>{hour.time}</Typography> {/* הצגת הזמן */}
                                                    <IconButton
                                                        sx={{ color: hour.isFree ? '#43cea2' : '#e57373' }}
                                                        onClick={() => toggleHourAvailability(item.date, hour.time)}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                            ))}
                                        </Box>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
            <Button
                variant="contained"
                sx={{ mt: 3, background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)' }}
                onClick={handleApproveSchedule}
            >
                אישור מערכת חודשית
            </Button>
        </Box>
    );
};



export default MonthlyScheduleManager;