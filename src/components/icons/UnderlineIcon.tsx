import React from 'react';

interface UnderlineIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const UnderlineIcon: React.FC<UnderlineIconProps> = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      preserveAspectRatio="none"
      viewBox="0 0 100 10"
      {...props}
    >
      <path
        d="M0 5 Q 50 10 100 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </svg>
  );
};
