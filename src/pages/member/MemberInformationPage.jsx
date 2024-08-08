import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MemberInfo from '../../components/MemberInfo';

const MemberInformationPage = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/members/${id}`, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [id, token]);

    const handleDelete = async () => {
        const userConfirmed = window.confirm("Would you like to delete?");
        if (userConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/api/members/${id}`, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                navigate('/member');
            } catch (error) {
                setError(error.message);
            }
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full h-screen p-4">
            <h1 className='text-3xl font-bold mb-8'>Member Information</h1>

            <button 
                onClick={() => navigate('/member')} 
                className="px-8 py-2 rounded-md bg-stone-400 mr-4 mb-8"
            >
                Back
            </button>
            <button 
                className="px-8 py-2 rounded-md bg-sky-400 mr-4 mb-8"
            >
                Update
            </button>
            <button 
                onClick={handleDelete} 
                className="px-8 py-2 rounded-md bg-red-400 mb-8"
            >
                Delete
            </button>

            <table className="w-full">
                <tbody>
                    <MemberInfo label="Member Code" value={data.member_code} />
                    <MemberInfo label="Fullname" value={data.fullname} />
                    <MemberInfo label="Birthday" value={data.date_of_birth} />
                    <MemberInfo label="Address" value={data.address} />
                    <MemberInfo label="Phone Number" value={data.phone_number} />
                    <MemberInfo label="Email" value={data.email} />
                    <MemberInfo label="Start Date" value={data.start_date} />
                    <MemberInfo label="Expiry Date" value={data.expiry_date} />
                    <MemberInfo label="Active" value={data.is_active ? "Yes" : "No"} />
                </tbody>
            </table>
        </div>
    );
};

export default MemberInformationPage;
