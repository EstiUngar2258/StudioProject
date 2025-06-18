// CalendarAppointments.jsx
import * as React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
import { useEffect, useState } from 'react';



const CustomDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isBusy',
})(({ theme, isBusy }) => ({
  color: '#fff', // כתב לבן לכל יום
  ...(isBusy && {
    backgroundColor: '#ff6b6b',
    color: '#fff',
    borderRadius: '50%',
  }),
}));

const calendarSx = {
  '& .MuiPickersCalendarHeader-label': { color: '#fff' },
  '& .MuiPickersDay-root': { color: '#fff' },
  '& .MuiPickersDay-root.Mui-selected': { backgroundColor: '#43cea2', color: '#23234a' },
  '& .MuiPickersDay-root.Mui-disabled': { color: '#aaa' },
  '& .MuiPickersCalendarHeader-switchViewButton': { color: '#fff' },
  '& .MuiPickersArrowSwitcher-root button': { color: '#fff' },
  '& .MuiDayCalendar-weekDayLabel': { color: '#fff' },
  '& .MuiPickersDay-root.MuiPickersDay-today': { borderColor: '#fff', color: '#fff' }, // עיגול היום הנוכחי
};

export default function CalendarAppointments({ onDateSelect }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, []);

  const isBusy = (date) =>
    appointments.some(a => a.date === date.toISOString().split('T')[0] && a.status === 'busy');

  
  return (
    <DateCalendar
      sx={calendarSx}
      renderDay={(day, _value, DayComponentProps) => {
        const busy = isBusy(day);
        return (
          <Badge
            key={day.toString()}
            overlap="circular"
            badgeContent={busy ? "✖" : undefined}
            color="error"
          >
            <CustomDay {...DayComponentProps} isBusy={busy} />
          </Badge>
        );
      }}
      onChange={onDateSelect}
    />
  );
}
