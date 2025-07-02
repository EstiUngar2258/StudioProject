import axios from 'axios';

export const fetchData = async () => {
    const response = await axios.get('http://localhost:5235/api/Clients');
    console.log(response);
    return response.data; // מחזיר את הנתונים עצמם
};


export const addClient = async (clientData) => {
    const response = await axios.post('http://localhost:5235/api/Clients', clientData);
    return response.data; // מחזיר את הנתונים של הלקוח שנוסף
};

export const loginUser = async (credentials) => {
    console.log('Sending to API:', credentials); // בדיקה של הנתונים שנשלחים לשרת
    const response = await axios.post('http://localhost:5235/api/User/Login', {
        IdNumber: credentials.idNumber, // ודא שהשדה תואם את מה שהשרת מצפה לו
        Name: credentials.username,    // ודא שהשדה תואם את מה שהשרת מצפה לו
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const fetchAppointments = async () => {
    const response = await axios.get('http://localhost:5235/api/FullQueue');
    return response.data; // מחזיר את הנתונים של התורים
};

export const getFreeAppointments = async () => {
    const response = await axios.get('http://localhost:5235/api/FreeQueue');
    return response.data; // מחזיר את הנתונים של התורים
};

export const addAppointment = async (appointmentData) => {
    const response = await axios.post('http://localhost:5235/api/FullQueue', appointmentData);
    return response.data; // מחזיר את הנתונים של התור שנוסף
};


// פונקציה לשליפת תורים פנויים לפי תאריך
export const fetchAvailableAppointmentsByDate = async ({ dateOnly, timeOnly }) => {
    const response = await axios.post('http://localhost:5235/api/FreeQueue/forClientDay', {
        dateOnly,
    });
    return response.data;
};

// קריאה לשרת לקבלת כל התורים של עובד מסוים
export const fetchFullQueuesForWorker = async (workerId) => {
    const response = await axios.get(`http://localhost:5235/api/FullQueue/forWorker/${workerId}`);
    return response.data;
};

export const getAllServices = async () => {
    const response = await axios.get('http://localhost:5235/api/StudioService'); // שנה לכתובת ה-API שלך אם צריך
    return response.data;
};

export const getWorkerById = async (id) => {
    const response = await axios.get(`http://localhost:5235/api/Worker/${id}`);
    return response.data; // רק הנתונים!
};

export const fetchAllWorkers = async () => {
    const response = await axios.get('http://localhost:5235/api/Worker');
    return response.data; // מחזיר מערך עובדים
};

export const addWorker = async (workerData) => {
    const response = await axios.post('http://localhost:5235/api/Worker', workerData);
    return response.data;
};

export const updateWorker = async (workerData) => {
    // workerData כולל את ה-id
    const response = await axios.put('http://localhost:5235/api/Worker', workerData);
    return response.data;
};