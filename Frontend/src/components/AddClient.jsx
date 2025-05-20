import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClientAsync } from '../redux/thunk';

const AddClient = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const error = useSelector((state) => state.clients.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newClient = {
            id,
            firstName,
            lastName,
            phone,
            age: age ? parseInt(age) : null,
            email,
        };
        
        const resultAction = await dispatch(addClientAsync(newClient));
        if (addClientAsync.fulfilled.match(resultAction)) {
            setSuccessMessage('נוסף בהצלחה!');
            setId('');
            setFirstName('');
            setLastName('');
            setPhone('');
            setAge('');
            setEmail('');
            setShowForm(false);
        } else {
            setSuccessMessage('');
        }
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        setSuccessMessage('');
    };

    return (
        <div className="container mt-4">
            <h2>Add Client</h2>
            <button className="btn btn-primary mb-3" onClick={toggleForm}>
                {showForm ? 'Cancel' : 'Add Client'}
            </button>
            {showForm && (
                <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
                    <div className="mb-3">
                        <label className="form-label">Id:</label>
                        <input type="text" className="form-control" value={id} onChange={(e) => setId(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">First Name:</label>
                        <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name:</label>
                        <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone:</label>
                        <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age:</label>
                        <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    {error && <p className="text-danger">{error.message || error}</p>}
                    <button type="submit" className="btn btn-success">Add Client</button>
                </form>
            )}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
        </div>
    );
};

export default AddClient;
