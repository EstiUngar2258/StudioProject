import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, Dialog, DialogTitle, DialogContent, IconButton, Tabs, Tab, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWorkersAsync, fetchDataAsyncAction, fetchWorkerByIdAsync, addWorkerAsync } from '../redux/thunk';
import { setUser } from '../redux/authSlice';
import EditWorkerForm from './EditWorkerForm';
import ClientsList from './ClientsList';
import AddWorkerForm from './AddWorkerForm';
import MonthlyScheduleManager from './MonthlyScheduleManager';

// צבעים שונים לעובדים
const workerColors = [
    "#43cea2", "#185a9d", "#ffb347", "#e57373", "#64b5f6", "#ba68c8", "#ffd54f"
];

const AdminDashboard = () => {
    const [tab, setTab] = useState(0);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openMonthlySchedule, setOpenMonthlySchedule] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const workers = useSelector(state => state.workers?.workers || []);
    const clients = useSelector(state => state.clients?.clientsList || []);

    useEffect(() => {
        dispatch(fetchAllWorkersAsync());
        dispatch(fetchDataAsyncAction());
    }, [dispatch]);

    useEffect(() => {
        if (user?.userId) {
            dispatch(fetchWorkerByIdAsync(user.userId));
        }
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                dispatch(setUser(parsedUser));
            } catch (error) {
                console.error("Failed to parse user from localStorage:", error);
            }
        }
    }, [dispatch, user?.userId]);

    const handleCloseEdit = () => {
        setOpenEdit(false);
        setSelectedWorker(null);
    };

    const renderMonthlySchedule = () => (
        <Box sx={{ mt: 3, overflowX: 'auto', px: 1 }}>
            <Typography variant="h6" sx={{
                mb: 2,
                color: "#43cea2",
                fontWeight: 700,
                letterSpacing: 1.2,
                textAlign: "right"
            }}>
                לו"ז חודשי - שעות עבודה
            </Typography>
            <Box sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' }
            }}>
                {workers.length === 0 ? (
                    <Typography sx={{ color: "#fff", textAlign: "center" }}>אין עובדים להצגה</Typography>
                ) : (
                    workers.map((worker, idx) => (
                        <Paper
                            key={worker.id}
                            elevation={3}
                            sx={{
                                minWidth: 200,
                                maxWidth: 240,
                                mb: 2,
                                p: 2,
                                borderRadius: 3,
                                background: "#23234acc",
                                border: `2px solid ${workerColors[idx % workerColors.length]}33`,
                                boxShadow: `0 2px 12px 0 ${workerColors[idx % workerColors.length]}22`
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Box sx={{
                                    width: 16, height: 16, borderRadius: '50%',
                                    background: workerColors[idx % workerColors.length], mr: 1
                                }} />
                                <Typography sx={{
                                    color: workerColors[idx % workerColors.length],
                                    fontWeight: 700,
                                    fontSize: "1.08rem"
                                }}>
                                    {worker.firstName} {worker.lastName}
                                </Typography>
                                <IconButton
                                    size="small"
                                    sx={{
                                        ml: 'auto',
                                        color: workerColors[idx % workerColors.length],
                                        background: "rgba(67,206,162,0.09)",
                                        '&:hover': { background: workerColors[idx % workerColors.length] }
                                    }}
                                    onClick={() => { setSelectedWorker(worker); setOpenEdit(true); }}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <Divider sx={{ mb: 1, borderColor: workerColors[idx % workerColors.length] + "33" }} />
                            <Typography sx={{
                                color: "#fff",
                                fontSize: "0.98rem",
                                textAlign: "right"
                            }}>
                                {worker.schedule || "08:00-16:00 כל יום"}
                            </Typography>
                        </Paper>
                    ))
                )}
            </Box>
        </Box>
    );

    return (
        <Box sx={{
            minHeight: '100vh',
            width: '100vw',
            background: `linear-gradient(135deg, #181828cc 0%, #23234acc 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            py: 5
        }}>
            <Paper sx={{
                maxWidth: 950,
                width: '100%',
                borderRadius: 5,
                p: { xs: 2, md: 4 },
                position: 'relative',
                boxShadow: "0 8px 32px 0 rgba(67,206,162,0.18), 0 1.5px 8px 0 #23234a",
                background: "rgba(34, 34, 60, 0.97)"
            }}>
                <Typography variant="h4" sx={{
                    color: "#43cea2",
                    fontWeight: 900,
                    mb: 3,
                    textAlign: "center",
                    letterSpacing: 1.5,
                    fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                    textShadow: "0 2px 24px #23234a, 0 1px 1px #43cea2"
                }}>
                    <i className="bi bi-person-gear" style={{ color: "#43cea2", marginLeft: 8 }}></i>
                    אזור מנהל
                </Typography>
                <Tabs
                    value={tab}
                    onChange={(_, v) => setTab(v)}
                    centered
                    sx={{
                        mb: 3,
                        '& .MuiTab-root': { color: "#43cea2", fontWeight: 700, fontSize: "1.08rem" },
                        '& .Mui-selected': { color: "#fff", background: "#43cea2", borderRadius: 2 }
                    }}
                >
                    <Tab label="עובדים" />
                    <Tab label="לקוחות" />
                </Tabs>

                {tab === 0 && (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 2 }}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{
                                    background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                                    fontWeight: 900,
                                    borderRadius: 2,
                                    fontFamily: "'Heebo', 'Rubik', Arial, sans-serif",
                                    letterSpacing: 1.2,
                                    boxShadow: "none"
                                }}
                                onClick={() => setOpenAdd(true)}
                            >
                                הוסף עובד
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                sx={{
                                    color: "#43cea2",
                                    borderColor: "#43cea2",
                                    fontWeight: 900,
                                    borderRadius: 2,
                                    fontFamily: "'Heebo', 'Rubik', Arial, sans-serif",
                                    letterSpacing: 1.2
                                }}
                                disabled={!selectedWorker}
                                onClick={() => setOpenEdit(true)}
                            >
                                עדכן עובד
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ background: 'linear-gradient(90deg, #43cea2 0%, #185a9d 100%)' }}
                                onClick={() => setOpenMonthlySchedule(true)}
                            >
                                ניהול מערכת חודשית
                            </Button>
                        </Box>
                        {renderMonthlySchedule()}
                    </>
                )}

                {tab === 1 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography sx={{
                            color: "#43cea2",
                            fontWeight: 900,
                            fontSize: "1.18rem",
                            textAlign: "center",
                            mb: 3,
                            letterSpacing: 1.2
                        }}>
                            רשימת לקוחות
                        </Typography>
                        {clients.length === 0 ? (
                            <Typography sx={{
                                color: "#fff",
                                fontWeight: 700,
                                fontSize: "1.08rem",
                                textAlign: "center"
                            }}>
                                אין לקוחות להצגה
                            </Typography>
                        ) : (
                            <Box sx={{
                                overflowX: 'auto',
                                background: "rgba(67,206,162,0.07)",
                                borderRadius: 3,
                                p: 2,
                                boxShadow: "0 2px 12px 0 #43cea222"
                            }}>
                                <table style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    direction: "rtl",
                                    fontFamily: "'Heebo', 'Rubik', Arial, sans-serif"
                                }}>
                                    <thead>
                                        <tr style={{ background: "#43cea2", color: "#fff" }}>
                                            <th style={{ padding: "8px", borderRadius: "8px 0 0 0" }}>שם פרטי</th>
                                            <th style={{ padding: "8px" }}>שם משפחה</th>
                                            <th style={{ padding: "8px" }}>טלפון</th>
                                            <th style={{ padding: "8px" }}>אימייל</th>
                                            <th style={{ padding: "8px", borderRadius: "0 8px 0 0" }}>סטטוס</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clients.map((client, idx) => (
                                            <tr key={client.id} style={{
                                                background: idx % 2 === 0 ? "#23234acc" : "#23234aee",
                                                color: "#fff"
                                            }}>
                                                <td style={{ padding: "8px", textAlign: "center" }}>{client.firstName}</td>
                                                <td style={{ padding: "8px", textAlign: "center" }}>{client.lastName}</td>
                                                <td style={{ padding: "8px", textAlign: "center" }}>{client.phone}</td>
                                                <td style={{ padding: "8px", textAlign: "center" }}>{client.email}</td>
                                                <td style={{ padding: "8px", textAlign: "center" }}>{client.status || "-"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Box>
                        )}
                    </Box>
                )}

                {/* דיאלוג הוספת עובד */}
                <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="xs" fullWidth>
                    <DialogTitle sx={{ color: "#43cea2", fontWeight: 700, textAlign: "center" }}>
                        הוספת עובד
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenAdd(false)}
                            sx={{ position: 'absolute', left: 8, top: 8, color: "#43cea2" }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <AddWorkerForm onClose={() => setOpenAdd(false)} />
                    </DialogContent>
                </Dialog>

                {/* דיאלוג עריכת עובד */}
                <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="xs" fullWidth>
                    <DialogTitle sx={{ color: "#43cea2", fontWeight: 700, textAlign: "center" }}>
                        עדכון פרטי עובד
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseEdit}
                            sx={{ position: 'absolute', left: 8, top: 8, color: "#43cea2" }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <EditWorkerForm worker={selectedWorker} onClose={handleCloseEdit} />
                    </DialogContent>
                </Dialog>

                {/* דיאלוג ניהול מערכת חודשית */}
                <Dialog open={openMonthlySchedule} onClose={() => setOpenMonthlySchedule(false)} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ color: "#43cea2", fontWeight: 700, textAlign: "center" }}>
                        
                        <IconButton
                            aria-label="close"
                            onClick={() => setOpenMonthlySchedule(false)}
                            sx={{ position: 'absolute', left: 8, top: 8, color: "#43cea2" }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <MonthlyScheduleManager />
                    </DialogContent>
                </Dialog>
            </Paper>
        </Box>
    );
};

export default AdminDashboard;