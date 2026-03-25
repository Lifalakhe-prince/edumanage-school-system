import React, { useEffect, useState } from 'react';
import { getTeachers, getResults } from '../api/attendenceApi';

const TeacherDashboard = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await getTeachers();
                const resultsResponse = await getResults(); // Fetch student results
                setTeachers(response.data.map(teacher => ({ ...teacher, results: resultsResponse.data }))); // Combine teacher data with results
            } catch (error) {
                console.error('Error fetching teachers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTeachers();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome to the Teacher Dashboard</h1>
            <ul>
                {teachers.map(teacher => (
                    <li key={teacher.id}>
                        {teacher.name}
                        <ul>
                            {teacher.results.map(result => (
                                <li key={result.id}>{result.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherDashboard;
