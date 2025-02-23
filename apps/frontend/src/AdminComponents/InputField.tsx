import React from 'react';

export const InputField = ({ label, name, type = 'text', register, placeholder }:{ label: string, name: string, type: string|number, register: any, placeholder?: string }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name,  { required: true })}
        placeholder={placeholder}
        className=" p-2 border w-full rounded"
      />
    </div>
  );
};

export const UpdateInputField = ({
  label,
  name,
  type = "text",
  register,
  placeholder,
  value, // Used for initial value
}: {
  label: string;
  name: string;
  type: string | number;
  register: any;
  placeholder?: string;
  value?: string | number;
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        defaultValue={value} // Use defaultValue instead of value
        {...register(name, { required: true })}
        placeholder={placeholder}
        className="p-2 border w-full rounded"
      />
    </div>
  );
};
