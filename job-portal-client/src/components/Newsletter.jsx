import React, { useState } from 'react';
import { FaEnvelopeOpenText } from "react-icons/fa";

const Newsletter = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleClick = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FaEnvelopeOpenText />
            Contact Us
          </h3>
          <p className="text-gray-600 mb-4">Hi there! How can we assist you?</p>
          <div className="w-full">
            <button
              onClick={handleClick}
              style={{
                width: '100%',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '0.375rem',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                color: 'white',
                background: '#6CB2EB',
                transition: 'background-color 0.3s',
                cursor: 'pointer',
              }}
              onMouseOver={e => e.target.style.background = '#85d0f4'}
              onMouseOut={e => e.target.style.background = '#6CB2EB'}
            >
              Click Here!
            </button>
          </div>
        </div>

        {showContactInfo && (
          <div className="mt-4">
            <p className="text-gray-600 mb-2"><span className="font-semibold">Name:</span> Srijana</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">USN:</span> 4CB20CS113</p>
            <p className="text-gray-600 mb-2"><span className="font-semibold">Email:</span> srujanashetty@gmail.com</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Newsletter;
