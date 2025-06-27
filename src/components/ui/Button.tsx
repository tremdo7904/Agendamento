import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  children: React.ReactNode;
}

const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded font-semibold transition flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
    disabled={loading || props.disabled}
    {...props}
  >
    {loading && (
      <svg className="animate-spin mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
    )}
    {children}
  </button>
);

export default Button; 