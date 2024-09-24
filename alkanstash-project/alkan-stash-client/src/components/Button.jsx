import React from 'react';

const Button = ({ children, className, ...props }) => (
  <button
    className={`w-full py-2 px-4 font-semibold rounded-md shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
