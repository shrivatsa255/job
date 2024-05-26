import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setIsLoading(true);
    setError(null); 
    fetch(`http://localhost:3000/myJobs/hi@gmail.com`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => {
            throw new Error(err.error || 'An error occurred');
          });
        }
        return res.json();
      })
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("There was a problem with your fetch operation:", error);
        setError(error.message); 
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch resumes data from the database
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await fetch('http://localhost:3000/store-resume-pdf');
      if (!response.ok) {
        throw new Error('Failed to fetch resumes');
      }
      const data = await response.json();
      setResumes(data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
      setError('Failed to fetch resumes');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < jobs.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="my-jobs-container ">
        <h1 className="text-center p-4">ALL My Jobs</h1>
      </div>

      {error && <div className="error">{error}</div>}

      {/* Existing Jobs Table */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">All Jobs</h3>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        NO.
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        TITLE
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        COMPANY NAME
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        SALARY
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        EDIT
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        DELETE
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={index}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">{index + 1}</td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{job.jobTitle}</td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{job.companyName}</td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">${job.minPrice} - ${job.maxPrice}</td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button className='bg-red-500 py-2 px-6 text-white rounded-sm'>
                            <Link to={`/edit-job/${job?._id}`}>Edit</Link>
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button onClick={() => handleDelete(job._id)} className='bg-red-700 py-2 px-6 text-white rounded-sm'>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Resumes Table */}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">Resumes</h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      NO.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Resume Name
                    </th>
                    {/* Add more table headers if needed */}
                  </tr>
                </thead>

                <tbody>
                  {resumes.map((resume, index) => (
                    <tr key={index}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">{index + 1}</td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{resume.name}</td>
                      {/* Add more table cells for resume details if needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="flex justify-center text-black space-x-8 mb-8">
        {currentPage > 1 && (
          <button className='hover:underline' onClick={prevPage}>Previous</button>
        )}
        {indexOfLastItem < jobs.length && (
          <button onClick={nextPage} className="hover:underline">Next</button>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
