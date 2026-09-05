import React from 'react';

interface CircularProgressIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  bgClassName?: string;
  fgClassName?: string;
}

export const CircularProgressIcon: React.FC<CircularProgressIconProps> = ({ 
  className, 
  bgClassName, 
  fgClassName, 
  ...props 
}) => {
  return (
    <svg className={className} viewBox="0 0 100 100" {...props}>
      <circle 
        className={bgClassName} 
        cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" 
      />
      <circle 
        className={fgClassName} 
        cx="50" cy="50" fill="transparent" r="40" stroke="currentColor" 
        strokeDasharray="251.2" strokeDashoffset="60" strokeLinecap="round" strokeWidth="8" 
      />
    </svg>
  );
};
