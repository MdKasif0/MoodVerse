import React from 'react';

const MosqueIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`relative w-8 h-8 rounded-full bg-yellow-900/50 flex items-center justify-center ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-300" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-3.866 0-7-3.134-7-7h14c0 3.866-3.134 7-7 7z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a4.5 4.5 0 00-4.5 4.5h9a4.5 4.5 0 00-4.5-4.5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 2.25z" />
        </svg>
    </div>
);
export default MosqueIcon;
