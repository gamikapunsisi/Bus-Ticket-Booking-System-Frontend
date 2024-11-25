import React from 'react';

function Input({
  label,
  id, 
  error, 
  isError = false,
  containerStyle = '', 
  labelStyle = '', 
  inputStyle = '', 
  errorTextStyle = '', 
  errorInputStyle = '',
  ...props
}) {
  return (
    <div className={`${containerStyle} w-full`}>
      <label htmlFor={id} className={` form-label block ${labelStyle}`}>
        {label}
      </label>
      <input
        {...props}
        className={`mt-2 px-[10px] font-sans py-[6px] h-[32px] block rounded-[5px] text-gray-700 text-[14px] border border-gray-500 focus:outline-none ${inputStyle} ${
          error || isError ? ` border-red-600 ${errorInputStyle}` : ''
        }`}
      />
      {error && (
        <p
          className={`text-red-500 text-sm mt-1 font-sans ${errorTextStyle}`}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
