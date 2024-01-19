import React, { useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}

      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-black 
        text-white outline-none focus:border-sky-500
        duration-200 border border-gray-200 w-full ${className}`}
      >
        <option key={options[0]} value={options[0]}>
          {options[0]}
        </option>
        <option key={options[1]} value={options[1]}>
          {options[1]}
        </option>
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
