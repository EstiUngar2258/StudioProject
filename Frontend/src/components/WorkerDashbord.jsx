import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import bgImg from '../img/Music_Equalizer_5_by_Merlin2525.svg';
import { fetchWorkerByIdAsync } from '../redux/thunk';
import { useDispatch, useSelector } from 'react-redux';
import WorkerSchedule from './WorkerSchedule';
import { setUser } from '../redux/authSlice';

const WorkerDashboard = () => {
    const [showSchedule, setShowSchedule] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const worker = useSelector(state => state.worker.worker);
    const workerStatus = useSelector(state => state.worker.status);
    const workerError = useSelector(state => state.worker.error);

    useEffect(() => {
        if (user?.userId) {
            dispatch(fetchWorkerByIdAsync(user.userId));
        }
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            dispatch(setUser(JSON.parse(savedUser)));
        }
    }, [dispatch, user?.userId]);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                background: `linear-gradient(135deg, #181828cc 0%, #23234acc 100%), url(${bgImg}) center/cover no-repeat`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            {/* קישוט עליון */}
            <svg
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "22vh",
                    zIndex: 0
                }}
                viewBox="0 0 1440 320"
            >
                <path
                    fill="#43cea2"
                    fillOpacity="0.18"
                    d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,181.3C1200,192,1320,192,1380,192L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                ></path>
                <circle cx="1200" cy="60" r="32" fill="#43cea2" fillOpacity="0.13" />
                <circle cx="200" cy="100" r="18" fill="#43cea2" fillOpacity="0.09" />
            </svg>

            <Box
                sx={{
                    zIndex: 2,
                    maxWidth: 850,
                    width: '100%',
                    marginTop: '100px',
                    transition: 'max-width 0.3s'
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        background: "rgba(34, 34, 60, 0.92)",
                        borderRadius: "2.5rem",
                        border: "1.5px solid rgba(67,206,162,0.18)",
                        boxShadow: "0 8px 32px 0 rgba(67,206,162,0.18), 0 1.5px 8px 0 #23234a",
                        backdropFilter: "blur(4px)",
                        padding: "2.5rem 2rem",
                        textAlign: "center",
                        position: "relative" // חשוב לכפתור בפינה
                    }}
                >
                    {/* כפתור פרטי עובד קטן בפינה בלבד */}
                    <IconButton
                        aria-label="פרטי עובד"
                        onClick={() => setOpenDetails(true)}
                        sx={{
                            position: 'absolute',
                            top: 18,
                            right: 18,
                            background: "rgba(67,206,162,0.12)",
                            color: "#43cea2",
                            borderRadius: "50%",
                            width: 38,
                            height: 38,
                            boxShadow: "0 2px 8px #43cea222",
                            transition: "background 0.2s",
                            '&:hover': {
                                background: "#43cea2",
                                color: "#fff",
                            },
                            zIndex: 2
                        }}
                    >
                        <i className="bi bi-person-lines-fill" style={{ fontSize: "1.25rem" }}></i>
                    </IconButton>

                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        sx={{
                            fontFamily: "'Rubik', 'Heebo', Arial, sans-serif",
                            fontWeight: 900,
                            color: "#43cea2",
                            textShadow: "0 2px 24px #23234a, 0 1px 1px #43cea2",
                            fontSize: "2rem",
                            letterSpacing: "1.5px"
                        }}
                    >
                        <i className="bi bi-person-gear" style={{ color: "#43cea2", marginLeft: 8 }}></i>
                        אזור עובד
                    </Typography>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "1.18rem",
                            textShadow: "0 1px 8px #23234a"
                        }}
                    >
                        שלום {user?.userName}!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "#e0e0e0",
                            fontSize: "1.08rem",
                            marginBottom: 2
                        }}
                    >
                        כאן תוכל לנהל משימות, לצפות בלוח הזמנים שלך ולעדכן את הפרופיל.
                    </Typography>

                    {/* הצגת פרטי העובד */}
                    {workerStatus === 'loading' && (
                        <Typography sx={{ color: "#43cea2", mt: 2 }}>טוען פרטי עובד...</Typography>
                    )}
                    {workerStatus === 'failed' && (
                        <Typography sx={{ color: "#ff5252", mt: 2 }}>שגיאה: {workerError}</Typography>
                    )}

                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
                            color: "#fff",
                            borderRadius: 8,
                            fontWeight: 900,
                            letterSpacing: 1.5,
                            fontFamily: "'Heebo', 'Rubik', Arial, sans-serif",
                            boxShadow: "none",
                            py: 1.2,
                            fontSize: "1.13rem",
                            textShadow: "0 1px 8px #23234a"
                        }}
                        onClick={() => setShowSchedule(s => !s)}
                    >
                        {showSchedule ? "הסתר לוח זמנים" : "לוח זמנים"}
                    </Button>
                    {showSchedule && (
                        <Box sx={{ mt: 4 }}>
                            <WorkerSchedule />
                        </Box>
                    )}

                    {/* דיאלוג פרטי עובד */}
                    <Dialog open={openDetails} onClose={() => setOpenDetails(false)} maxWidth="xs" fullWidth>
                        <DialogTitle sx={{ color: "#43cea2", fontWeight: 700, textAlign: "center", fontSize: "1.15rem" }}>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <i className="bi bi-person-lines-fill" style={{ marginLeft: 8 }}></i>
                                פרטי עובד
                                <IconButton
                                    aria-label="close"
                                    onClick={() => setOpenDetails(false)}
                                    sx={{
                                        position: 'absolute',
                                        left: 8,
                                        top: 8,
                                        color: "#43cea2",
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </DialogTitle>
                        <DialogContent dividers sx={{ background: "rgba(67,206,162,0.07)" }}>
                            {workerStatus === 'loading' && (
                                <Typography sx={{ color: "#43cea2", mt: 2, textAlign: "center" }}>טוען פרטי עובד...</Typography>
                            )}
                            {workerStatus === 'failed' && (
                                <Typography sx={{ color: "#ff5252", mt: 2, textAlign: "center" }}>שגיאה: {workerError}</Typography>
                            )}
                            {worker && (
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr",
                                        gap: 1.2,
                                        alignItems: "center",
                                        color: "#23234a",
                                        fontSize: "1.02rem"
                                    }}
                                >
                                    <div>
                                        <i className="bi bi-person me-2" style={{ color: "#43cea2" }}></i>
                                        <b>שם:</b> {worker.firstName} {worker.lastName}
                                    </div>
                                    <div>
                                        <i className="bi bi-telephone me-2" style={{ color: "#43cea2" }}></i>
                                        <b>טלפון:</b> {worker.phone}
                                    </div>
                                    <div>
                                        <i className="bi bi-person-badge me-2" style={{ color: "#43cea2" }}></i>
                                        <b>סוג:</b> {worker.workerType}
                                    </div>
                                    <div>
                                        <i className="bi bi-cake2 me-2" style={{ color: "#43cea2" }}></i>
                                        <b>גיל:</b> {worker.age ?? '-'}
                                    </div>
                                    <div>
                                        <i className="bi bi-cash-coin me-2" style={{ color: "#43cea2" }}></i>
                                        <b>שכר/שעה:</b> {worker.salaryForHour} ₪
                                    </div>
                                    <div>
                                        <i className="bi bi-award me-2" style={{ color: "#43cea2" }}></i>
                                        <b>ותק:</b> {worker.seniority} שנים
                                    </div>
                                    <div>
                                        <i className="bi bi-gift me-2" style={{ color: "#43cea2" }}></i>
                                        <b>בונוס:</b> {worker.bonus ?? '-'}
                                    </div>
                                    <div>
                                        <i className="bi bi-envelope-at me-2" style={{ color: "#43cea2" }}></i>
                                        <b>אימייל:</b> {worker.email}
                                    </div>
                                </Box>
                            )}
                        </DialogContent>
                    </Dialog>
                </Paper>
            </Box>
        </Box>
    );
};

export default WorkerDashboard;