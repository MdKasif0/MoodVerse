import React from 'react';

const MosqueIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
    >
        <defs>
          <linearGradient id="goldGradient" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop stopColor="#FDE047" stopOpacity="0.8" />
            <stop offset="1" stopColor="#EAB308" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path 
            d="M16 8.56C16 5.49 13.51 3 10.44 3C7.37 3 4.88 5.49 4.88 8.56C4.88 11.85 7.75 14.56 10.44 14.56C10.58 14.56 10.71 14.55 10.85 14.53" 
            stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
        <path 
            d="M14.5 21V12.19C14.5 11.08 15.39 10.19 16.5 10.19H17.5C18.61 10.19 19.5 11.08 19.5 12.19V21" 
            stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
        <path 
            d="M4.5 21H19.5" 
            stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
        <path 
            d="M17.5 7.5H17.51" 
            stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
    </svg>
);
export default MosqueIcon;
