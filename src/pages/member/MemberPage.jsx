
import React, { useState, useEffect } from "react";
import { fetchMember } from "../../api/member";
import Button from "../../components/MemberButton";
import { useNavigate } from "react-router-dom";

const MemberPage = () => {
  const [members, setMember] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10; // Number of members to display per page
  const navigate = useNavigate();

  useEffect(() => {
    const getMember = async () => {
      const data = await fetchMember();
      console.log("Fetched API Member:", data);
      setMember(data);
    };
    getMember();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(members.length / membersPerPage);

  // Slice the data for the current page
  const currentMembers = members.slice(
    (currentPage - 1) * membersPerPage,
    currentPage * membersPerPage
  );

  // Handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Member</h1>

      <Button onClick={() => navigate('/member/create')} text="Create" type="button-create" />

      <table className="w-full bg-white rounded-2xl overflow-hidden">
        <thead>
          <tr className="border-2 border-zinc-300 bg-gray-200 text-slate-600">
            <th className="px-4 py-4">Action</th>
            <th className="px-4 py-4">Member Code</th>
            <th className="px-4 py-4">Fullname</th>
            <th className="px-4 py-4">Phone</th>
            <th className="px-4 py-4">Address</th>
            <th className="px-4 py-4">Start Date</th>
            <th className="px-4 py-4">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member, index) => (
            <tr className="border-2 border-zinc-300 text-slate-500" key={index}>
              <td className="px-4 py-2">
                <Button onClick={() => navigate(`/detail/${member.id}`)} text="View" type="button-sky" />
              </td>
              <td className="px-4 py-2">{member.member_code}</td>
              <td className="px-4 py-2">{member.fullname}</td>
              <td className="px-4 py-2">{member.phone_number}</td>
              <td className="px-4 py-2">{member.address}</td>
              <td className="px-4 py-2">{member.start_date}</td>
              <td className="px-4 py-2">{member.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          &larr; Prev
        </button>
        <span className="px-4 py-2">
           {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

export default MemberPage;

