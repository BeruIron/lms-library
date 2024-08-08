import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MemberForm from '../../components/MemberForm';

const CreateMemberPage = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState(""); 
  const [birthday, setBirthday] = useState("");
  const [start, setStart] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState(""); 

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/members', {
        fullname,
        email,
        date_of_birth: birthday,
        start_date: start,
        expiry_date: expiry,
        address: "string", 
        phone_number: "string",
        is_active: true,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log(response.data);
      navigate("/member");
    } catch (error) {
      console.log(error); // Log the entire error object for debugging
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">New Member</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <MemberForm 
          label="Fullname"
          type="text"
          name="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <MemberForm 
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MemberForm 
          label="Date of Birth"
          type="date"
          name="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <MemberForm 
          label="Start Date"
          type="date"
          name="start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <MemberForm 
          label="Expiry Date"
          type="date"
          name="expiry"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error if present */}
        <div className="flex space-x-4">
          <button 
            type="button" 
            onClick={() => navigate('/member')}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMemberPage;
