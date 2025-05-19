import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Services = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">שירותים שלנו</h1>
            <p className="lead text-center">
                אנו מציעים מגוון שירותים בתחום המוזיקה.
            </p>
            <div className="text-center">
                {/* קישור להוספת תור חדש */}
                <Link to="/newAppointment" className="btn btn-primary">
                    הוסף תור חדש
                </Link>
            </div>
        </div>
    );
};

export default Services;
