import axios from 'axios';
const BASE = 'http://127.0.0.1:8000/api';

// API calls
export const getAttendance = () => axios.get(`${BASE}/attendance/`);
export const addAttendance = data => axios.post(`${BASE}/attendance/`, data);
export const getAdmins = () => axios.get(`${BASE}/admins/`);
export const getResults = () => axios.get(`${BASE}/results/`);
export const getStudents = () => axios.get(`${BASE}/students/`);

// Testing all API calls for site administration
export const testAllAPIs = async () => {
    try {
        const attendance = await getAttendance();
        console.log('Attendance:', attendance.data);
        const admins = await getAdmins();
        console.log('Admins:', admins.data);
        const results = await getResults();
        console.log('Results:', results.data);
        const students = await getStudents();
        console.log('Students:', students.data);
        const addAttendanceResult = await addAttendance({ studentId: 1, date: '2026-03-25', status: 'Present' });
        console.log('Add Attendance:', addAttendanceResult.data);
        // Add more API tests as needed
    } catch (error) {
        console.error('Error testing APIs:', error);
    }
};