import React from 'react';

function Input({ label, name, type = 'text', placeholder = '', value, onChange, required=false }) {
  return (
    <div className='input-field'>
      {label && <label htmlFor={name}>{label} {required && <span className='text-red-600'>*</span>}</label>}
      <input
      required={required}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
