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
    const response = await axios.post('http://localhost:5235/api/User/Login', credentials);
    return response.data; // מחזיר את הנתונים של המשתמש שנכנס
};
