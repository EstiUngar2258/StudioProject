import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUserAppointments } from '../redux/userAppointmentsSlice';


const Dashboard = () => {
    const dispatch = useDispatch();
    const showUserAppointments = useSelector((state) => state.userAppointments.showUserAppointments);

    const handleToggleUserAppointments = () => {
        dispatch(toggleUserAppointments());
    };

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
                            {/* כאן תוכל להוסיף את הקומפוננטה שתציג את התורים */}
                            <UserAppointments />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
