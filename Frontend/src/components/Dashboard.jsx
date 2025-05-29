import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUserAppointments } from '../redux/userAppointmentsSlice';
import UserAppointments from './UserAppointments';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showUserAppointments = useSelector((state) => state.userAppointments.showUserAppointments);
    const user = useSelector((state) => state.auth.user);
    const isLoged = useSelector((state) => state.auth.isLoggedIn);

    const handleToggleUserAppointments = () => {
        dispatch(toggleUserAppointments());
    };

    // ניווט לאזור האישי בלחיצה על תיבת פרטי המשתמש
  

    return (
        <div className="container mt-5">
           

            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">ברוך הבא לאזור האישי</h1>
                    <p className="card-text">כאן תוכל לראות את המידע האישי שלך ולעדכן פרטים.</p>
                    <button
                        className="btn btn-primary"
                        onClick={handleToggleUserAppointments}
                    >
                        {showUserAppointments ? 'הסתר תורים' : 'הראה תורים'}
                    </button>
                    {showUserAppointments && (
                        <div>
                            <UserAppointments />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
