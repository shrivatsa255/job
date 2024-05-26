import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [skills, setSkills] = useState([]);
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/all-jobs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setJob(data))
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        Swal.fire("Error", "Failed to load job details.", "error");
      });
  }, [id]);

  const handleApply = async () => {
    const { value: file } = await Swal.fire({
      input: 'file',
      inputAttributes: {
        accept: 'application/pdf',
        'aria-label': 'Upload your resume as a PDF',
      },
      inputLabel: 'Select your resume (PDF)',
    });

    if (file) {
      setResume(file);
      submitApplication(file);
    }
  };

  const submitApplication = async (file) => {
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('http://localhost:3000/store-resume-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { success, filePath } = data;
        if (success) {
          Swal.fire("Success", "Resume uploaded successfully", "success");
          setResumeUrl(filePath);
        } else {
          throw new Error("Failed to upload resume");
        }
      } else {
        throw new Error("Failed to upload resume");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to upload resume", "error");
    }
  };

  const getSkills = async () => {
    if (job && job.skills) {
      const skillsArray = await job.skills;
      const skillList = skillsArray.map(skill => skill.value);
      setSkills(skillList);
    }
  };

  useEffect(() => {
    getSkills();
  }, [job]);

  return (
    <div className='max-w-screen xl:px-24 px-4'>
      <img src={job?.companyLogo} width={120} height={120} alt="Company Logo" />
      <h1 className="font-semibold text-lg my-1">Posted By : {job?.postedBy}</h1>
      <h2 className="font-semibold text-lg mb-1">Job ID: {id}</h2>
      <div className="flex flex-row gap-4">
        <button
          className='bg-blue px-8 py-2 text-white'
          onClick={handleApply}>
          Apply Now
        </button>
        {resumeUrl && (
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="bg-green-500 px-8 py-2 text-white">
            View Resume
          </a>
        )}
      </div>
      {job ? (
        <div className="flex flex-row gap-3">
          <div className='flex flex-col gap-3 basis-1/2'>
            <div className='flex flex-col mt-7'>
              <h1 className='text-blue text-xl font-bold'>Company</h1>
              <p className='text-lg font-semi-bold'>{job.companyName}</p>
            </div>
            <div className='flex flex-col'>
              <h1 className='text-blue text-xl font-bold'>Role</h1>
              <p className='text-lg font-semibold'>{job.jobTitle}</p>
            </div>
            <div>
              <h1 className='text-blue text-xl font-bold'>Job Type</h1>
              <p className='text-lg font-semibold'>{job.employmentType}</p>
            </div>
            <div>
              <h1 className='text-blue text-xl font-bold'>Job Info</h1>
              <div className='flex flex-row gap-1'>
                <p className='text-lg font-semibold'>Location :</p>
                <p className='text-lg'>{job.jobLocation}</p>
              </div>
              <div className='flex flex-row gap-1'>
                <p className='text-lg font-semibold'>Salary :</p>
                <p className='text-lg'>
                  {job.minPrice}K - {job.maxPrice}K
                </p>
              </div>
              <div className='flex flex-row gap-1'>
                <p className='text-lg font-semibold'>Experience Level :</p>
                <p className='text-lg'>{job.experienceLevel}</p>
              </div>
              <div className='flex flex-row gap-1'>
                <p className='text-lg font-semibold'>Posting date :</p>
                <p className='text-lg'>{job.postingDate}</p>
              </div>
            </div>
          </div>
          <div>
            <div className='flex flex-col mt-8 basis-1/2'>
              <h1 className='text-blue text-xl font-bold'>Description</h1>
              <p className='text-lg font-normal'>{job.description}</p>
            </div>
            <div className='flex flex-col mt-8 basis-1/2'>
              <h1 className='text-blue text-xl font-bold'>Skills</h1>
              <p className='text-lg font-normal'>{skills.join(', ')}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
};

export default JobDetails;
