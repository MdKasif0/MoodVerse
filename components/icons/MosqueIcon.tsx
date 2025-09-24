import React from 'react';

const MosqueIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-3.866 0-7-3.134-7-7h14c0 3.866-3.134 7-7 7z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a4.5 4.5 0 00-4.5 4.5h9a4.5 4.5 0 00-4.5-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 2.25z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.75h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.75V21" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 14.75V21" />
    </svg>
);
export default MosqueIcon;
