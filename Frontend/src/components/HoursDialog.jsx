import React from 'react';
import { Dialog, DialogTitle, Box, List, ListItem, ListItemIcon, ListItemText, Button, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format, parseISO } from 'date-fns';
import Slide from '@mui/material/Slide';

const HoursDialog = ({ open, onClose, selectedDay, hours, onExited }) => {
    // ממיין את השעות (מספרים או מחרוזות)
    const sortedHours = [...hours].sort();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Slide}
            TransitionProps={{ onExited }}
        >
            <DialogTitle>
                שעות עבודה ליום {selectedDay && format(parseISO(selectedDay), 'dd/MM/yyyy')}
            </DialogTitle>
            <Box sx={{ p: 3, minWidth: 300, background: "#f7fafc" }}>
                <Typography variant="subtitle1" sx={{ mb: 2, color: "#185a9d" }}>
                    {sortedHours.length === 0 ? "אין שעות עבודה ליום זה" : "שעות:"}
                </Typography>
                <List>
                    {sortedHours.map((hour, idx) => (
                        <ListItem key={idx} sx={{ borderBottom: "1px solid #e0e0e0" }}>
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
                    onClick={onClose}
                >
                    סגור
                </Button>
            </Box>
        </Dialog>
    );
};

export default HoursDialog;