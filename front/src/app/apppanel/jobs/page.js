'use client'
import axios from 'axios';
import React, { useState } from 'react';

function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const fetchJobs = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a job title to search.');
      return;
    }
    setError(null);
    try {
      const response = await axios.get(`${API_BASE}/jobs/jobbyname?query=${searchQuery}`);
      if (response.status!==200) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.data;
      setJobs(data);
    } catch (err) {
      console.log('Error fetching jobs:', err);
      setError('Could not fetch jobs. Please try again.');
    }
  };

  return (
    <div>
      <div className="mb-5">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Search jobs"
          required
        />
        <label
          htmlFor="email"
          className="block mt-2 ms-1 text-sm font-bold text-orange-400 dark:text-white"
        >
          Type your desired job role
        </label>
        <button onClick={fetchJobs} className="mt-3 bg-blue-500 text-white py-1 px-3 rounded">
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {jobs.length > 0 ? (
          <ul>
            {jobs.map((job) => (
              <li key={job._id} className="mb-4">
                <h3 className="font-bold">{job.title}</h3>
                <p>About company</p>
                <p>{job.description}</p>
                <p>
                  <strong>Company:</strong> {job.companyName}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          !error && <p>No jobs found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
