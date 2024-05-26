import React from 'react';
import { Link } from 'react-router-dom';
import { FaReact, FaNodeJs, FaDatabase, FaUserTie } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss } from 'react-icons/si';

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-4xl px-8 py-12 bg-white shadow-lg rounded-lg">
        <div className="flex items-center mb-8">
          <FaUserTie className="text-4xl text-gray-500 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">About JobHorizon</h1>
        </div>
        <p className="text-lg text-gray-700 mb-6">
          JobHorizon is a cutting-edge platform built on the MERN stack — MongoDB, Express.js, React, and Node.js — to revolutionize the job search and recruitment process.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          With a user-centric approach, JobHorizon empowers both employers and job seekers by offering a seamless and feature-rich experience. Our platform provides advanced search and filtering options based on parameters such as role, salary, and location, enabling job seekers to effortlessly navigate through an array of job listings.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Tailwind CSS is utilized for styling, providing a visually appealing and responsive design for an optimal user experience across devices.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          The user authentication system ensures data security and personalized experiences, while employers have the ability to post job listings, complete with details about the role and desired qualifications, creating a dynamic job marketplace.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Leveraging MongoDB for efficient data storage and retrieval, JobHorizon ensures a scalable and reliable solution. React powers the platform's search and filter functionalities, delivering real-time updates and a dynamic user interface.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Additionally, JobHorizon incorporates an advanced recommendation engine, suggesting relevant job opportunities based on user profiles and preferences, along with tailored job alerts to keep users informed about new listings.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          The admin dashboard, built with Node.js and Express, provides administrators with the tools to manage users, monitor activities, and maintain the overall health of the platform.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          To enhance user engagement and foster communication, JobHorizon features an integrated messaging system that facilitates seamless interactions between employers and job seekers, along with notifications to keep users informed about application updates and relevant events.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          With localization support for multiple languages and regions, JobHorizon is designed with international users in mind, ensuring compliance with legal standards and relevant labor laws.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Join us on JobHorizon and take your career to new heights!
        </p>
        <div className="flex justify-center mt-8">
          <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">Explore JobHorizon</Link>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <FaReact className="text-4xl text-blue-500" />
          <FaNodeJs className="text-4xl text-green-500" />
          <SiMongodb className="text-4xl text-green-500" />
          <FaDatabase className="text-4xl text-gray-500" />
          <SiTailwindcss className="text-4xl text-indigo-500" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
