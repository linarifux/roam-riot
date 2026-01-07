import React from 'react';

const Input = ({ label, type = "text", name, placeholder, value, onChange, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-slate-900/50 border ${
          error ? 'border-red-500' : 'border-slate-700'
        } text-white text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 block p-3 placeholder-slate-500 backdrop-blur-sm transition-all duration-300 focus:bg-slate-900/80 outline-none`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;