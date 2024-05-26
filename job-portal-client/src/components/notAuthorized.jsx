import React from 'react';

const NotAuthorized = () => {
 return (
    <div className="flex flex-col items-center justify-center  bg-white">
      <div className="bg-gradient-to-r from-red-500 to-red-300 text-white shadow-2xl my-48 rounded-2xl px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4">
          <h1 className="font-bold text-xl mb-2">Not Authorized</h1>
          <p className="text-base">
            Either You are not logged in or
          </p>
        </div>
        <div className="mb-6">
          <p className="text-gray-700 text-base">
           You do not have permission to access this page.<br/>
            Please contact your administrator for more information.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-white  hover:scale-110 duration-100 text-gray-800 font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline" onClick={()=>{
            window.location.replace('/home')
          }}>
            Go Back
          </button>
        </div>
      </div>
    </div>
 );
};

export default NotAuthorized;
