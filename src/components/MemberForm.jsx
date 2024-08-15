import React from "react";

const MemberForm = ({ label, type, name, value, onChange }) => { 
  return (
    <div className="mb-4">
      <label className="block mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange} 
        className="w-1/2 p-2 border rounded-lg  border-gray-300"
        id={name} 
      />
    </div>
  );
};

export default MemberForm;
