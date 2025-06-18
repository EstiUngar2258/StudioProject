import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Services from './components/Services';
import AddClient from './components/AddClient';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateAppointmentForm from './components/CreateAppointmentForm';
import AppointmentList from './components/AppointmentList';
import AvailableAppointmentsList from "./components/AvailableAppointmentsList";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import WorkerDashboard from './components/WorkerDashbord';


const App = () => {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/addClient" element={<AddClient />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workerDashboard" element={<WorkerDashboard />} />
             <Route path="/newAppointment/:courseId" element={<CreateAppointmentForm />} />
          <Route path="/newAppointment" element={<CreateAppointmentForm />} /> // הוספת המסלול החדש
          <Route path="/appointmentList" element={<AppointmentList />} /> // הוספת המסלול החדש
          <Route path="/availableAppointments" element={<AvailableAppointmentsList />} /> // הוספת המסלול החדש
        </Routes>
      </LocalizationProvider>
    </BrowserRouter>
  );
};

export default App;



