import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MemberInfo from "../../components/MemberInfo";
import Button from "../../components/MemberButton";

const MemberInformationPage = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://wmad-library-backend-six.vercel.app/api/members/${id}`,
          {
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
        await axios.delete(`https://wmad-library-backend-six.vercel.app/api/members/${id}`, {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        });
        navigate("/member");
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
      <h1 className="text-3xl font-bold mb-8">Member Information</h1>

   <div className="space-x-4 mb-8">
      <Button onClick={() => navigate("/member")} text="Back" />
      <Button  text="Update" type="button-blue"/>
      <Button onClick={handleDelete} text="Delete" type="button-red" />
    </div>
  
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
