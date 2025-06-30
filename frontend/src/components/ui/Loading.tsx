import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`} />
  );
};

interface LoadingProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  text = 'Cargando...',
  size = 'md',
  centered = true
}) => {
  const content = (
    <div className="flex flex-col items-center space-y-2">
      <LoadingSpinner size={size} />
      {text && (
        <p className="text-gray-500 text-sm">{text}</p>
      )}
    </div>
  );
  
  if (centered) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        {content}
      </div>
    );
  }
  
  return content;
};

export { LoadingSpinner };
export default Loading;
