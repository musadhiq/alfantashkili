import React from 'react';

function Input({ label, name, placeholder = '', value, onChange }) {
  return (
    <div className='input-field'>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={10}
      />
    </div>
  );
}

export default Input;
