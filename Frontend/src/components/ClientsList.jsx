import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataAsyncAction } from '../redux/thunk';
import AddClient from './AddClient';
// ודא שהנתיב נכון

const ClientsList = () => {
    const dispatch = useDispatch();
    const clients = useSelector(state => state.clients.clientsList); // ודא שהנתיב נכון
    const error = useSelector(state => state.clients.error); // ודא שהנתיב נכון
    const loading = useSelector(state => state.clients.loading); // הוספת מצב טעינה

    useEffect(() => {
    dispatch(fetchDataAsyncAction()); // קריאה לפונקציה אסינכרונית
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>; // מצב טעינה
    }

    if (error) {
        return <div>Error: {error.message}</div>; // הצגת שגיאה
    }

    if (clients.length === 0) {
        return <div>No clients available</div>; // אם אין לקוחות
    }

    return (
        <div>
            <h1>Clients</h1>
           
            <ul>
                {clients.map((client, index) => (
                    <li key={client.id || index}> {/* השתמש ב-index רק אם אין id ייחודי */}
                        <div><strong>First Name:</strong> {client.firstName}</div>
                        <div><strong>Last Name:</strong> {client.lastName}</div>
                        <div><strong>Phone:</strong> {client.phone}</div>
                        <div><strong>Age:</strong> {client.age !== null ? client.age : 'N/A'}</div>
                        <div><strong>Email:</strong> {client.email ? client.email : 'N/A'}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
    
    
};

export default ClientsList;
