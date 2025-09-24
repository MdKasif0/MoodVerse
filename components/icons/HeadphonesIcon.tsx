import React from 'react';

const HeadphonesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125v-3.375M17.25 9.75h1.5c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5v-3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 9.75h-1.5c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h1.5v-3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 17.25v-7.5a6 6 0 1112 0v7.5" />
    </svg>
);
export default HeadphonesIcon;
