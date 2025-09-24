import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string | null;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Allow time for fade-out animation before clearing the message
        setTimeout(onClose, 300);
      }, 2700); // Message visible for 2.7s

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [message, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      {message && (
         <div className="bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
           {message}
         </div>
      )}
    </div>
  );
};

export default Notification;
