import React, { useState, useEffect } from "react";
import { fetchMember } from "../../api/member";
// import { Link } from "react-router-dom";
import Button from "../../components/MemberButton";
import { useNavigate } from "react-router-dom";

const MemberPage = () => {
  const [members, setMember] = useState([]);
  const navigate = useNavigate ();
 

  useEffect(() => {
    const getMember = async () => {
      const data = await fetchMember();
      console.log("Fetched API Member:", data);
      setMember(data);
    };
    getMember();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Member</h1>

      {/* <Link to="/member/create">
        <button className="text-xl py-2 px-7 bg-sky-500/100 text-white rounded-lg shadow-md hover:bg-sky-600 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75 mb-5">
          Create
        </button>
      </Link> */}
      <Button onClick={() => navigate('/member/create')} text="Create" type="button-create" />

      <table className="w-full bg-white   rounded-2xl overflow-hidden">
        <thead>
          <tr className="border-2 border-zinc-300  bg-gray-200 text-slate-600">
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
          {members.map((member, index) => (
            <tr className="border-2 border-zinc-300 text-slate-500" key={index}>
              <td className="px-4 py-2">
                {/* <Link to={`/detail/${member.id}`}> */}
                   {/* <button class="py-1 px-7 bg-sky-500/100 text-white rounded-lg shadow-md hover:bg-sky-600 focus:ring focus:ring-violet-400 focus:ring-opacity-75 mb-5">
                    view
                  </button> */}
                {/* </Link> */}
                <Button onClick={() => navigate (`/detail/${member.id}`)} text="view" type="button-sky"/>

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
     
    </>
  );
};

export default MemberPage;
