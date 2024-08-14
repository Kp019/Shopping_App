import { useState } from "react";

interface DropdownItem {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownItem[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange }) => {
  return (
      <select className=' border-b-2 border-gray-300 text-black px-1 py-2 text-sm focus:shadow-xl' value={value} onChange={onChange}>
          <option value="">{label}</option>
          {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
          ))}
      </select>
  );
};


export const DropdownV2: React.FC<DropdownProps> = ({ label, value, options, onChange }) => {
  return (
      <select className='  text-white bg-blue-500 rounded-md px-1 py-2 text-sm focus:shadow-xl' value={value} onChange={onChange}>
          <option value="">{label}</option>
          {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
          ))}
      </select>
  );
};