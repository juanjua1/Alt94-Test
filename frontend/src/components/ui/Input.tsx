import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  prefix?: string;
  hideSpinners?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  prefix,
  hideSpinners = false,
  className = '',
  id,
  style,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  const inputClasses = `
    w-full py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${prefix ? 'pl-8 pr-3' : 'px-3'}
    ${error 
      ? 'border-red-300 focus:ring-red-500' 
      : 'border-gray-300 hover:border-gray-400'
    }
    ${hideSpinners ? 'hide-spinners' : ''}
    ${className}
  `;

  const inputStyle = hideSpinners ? {
    ...style,
    // Ocultar spinners en inputs de tipo number
    WebkitAppearance: 'none' as const,
    MozAppearance: 'textfield' as const
  } : style;
  
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm font-medium">{prefix}</span>
          </div>
        )}
        <input
          id={inputId}
          className={inputClasses}
          style={inputStyle}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {hint && !error && (
        <p className="text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
};

export default Input;

// Estilos CSS adicionales para ocultar spinners
const additionalStyles = `
  .hide-spinners::-webkit-outer-spin-button,
  .hide-spinners::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .hide-spinners[type=number] {
    -moz-appearance: textfield;
  }
`;

// Inyectar estilos si no existen
if (typeof document !== 'undefined' && !document.getElementById('input-spinner-styles')) {
  const style = document.createElement('style');
  style.id = 'input-spinner-styles';
  style.textContent = additionalStyles;
  document.head.appendChild(style);
}
