import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MemberForm from '../../components/MemberForm';
import Button from '../../components/MemberButton';

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
      const response = await axios.post('https://wmad-library-backend-six.vercel.app/api/members', {
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

        <Button onClick={() => navigate('/member')} text="Cancel" />
        <Button text="Save" type="button-blue" />

        </div>
      </form>
    </div>
  );
};

export default CreateMemberPage;
