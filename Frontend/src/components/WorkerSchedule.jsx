import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MonthlyCalendar from './MonthlyCalendar';
import { fetchWorkerShifts } from '../redux/thunk';

const WorkerSchedule = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const shifts = useSelector(state => state.worker.shifts || []);

    useEffect(() => {
        if (user?.userId) {
            dispatch(fetchWorkerShifts(user.userId));
        }
    }, [dispatch, user?.userId]);

    return <MonthlyCalendar shifts={shifts} />;
};

export default WorkerSchedule;