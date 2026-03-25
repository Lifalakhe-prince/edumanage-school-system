import React, { useEffect, useState } from 'react';
import { getAdmins, getStudents, getResults } from '../api/attendenceApi';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const role = localStorage.getItem('edu_user') ? JSON.parse(localStorage.getItem('edu_user')).role : 'student';
                let response;
                if (role === 'admin') {
                    response = await getAdmins(); // Fetch admin data
                } else {
                    response = await getStudents(); // Fetch student data
                    const results = await getResults(); // Fetch student results
                    setUser({ ...response.data[0], results: results.data }); // Combine user and results data
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>{user ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile` : 'Profile'}</h1>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    {user.results && (
                        <div>
                            <h2>Results:</h2>
                            {user.results.map((result, index) => (
                                <p key={index}>{result.subject}: {result.score}</p>
                            ))}
                        </div>
                    )}
                    {/* Add more fields as necessary */}
                </div>
            ) : (
                <p>No user data available.</p>
            )}
        </div>
    );
};

export default Profile;
