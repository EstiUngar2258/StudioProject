import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import bgImg from '../img/Music_Equalizer_5_by_Merlin2525.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';
import WorkerSchedule from './WorkerSchedule';

const WorkerDashboard = () => {
    const [showSchedule, setShowSchedule] = useState(false);
    const user = useSelector(state => state.auth.user);
    localStorage.setItem('user', JSON.stringify(user));
    const dispatch = useDispatch();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            dispatch(setUser(JSON.parse(savedUser)));
        }
    }, [dispatch]);

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
                    maxWidth: 850, // הרחבה משמעותית
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
                        textAlign: "center"
                    }}
                >
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
                </Paper>
            </Box>
        </Box>
    );
};

export default WorkerDashboard;