'use client';
import axios from 'axios';
import React, { useState } from 'react';

export default function Page() {
    const [file, setFile] = useState(null);
    const [score, setScore] = useState(null);
    const [optimizations, setOptimizations] = useState(null);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [jobRole, setJobRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [resumeSubmitted, setResumeSubmitted] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            alert("Please upload a PDF file.");
            e.target.value = null;
        }
    };

   const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !jobRole) {
        alert("Please upload a resume and enter a job role.");
        return;
    }

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobTitle', jobRole);
    setLoading(true);

    try {
        const response = await axios.post('http://localhost:5000/api/resume/process', formData);
        const { score, optimizationMessage, recommendedJobs } = response.data;

        setScore(score);
        setOptimizations(optimizationMessage);
        setRecommendedJobs(recommendedJobs || []);
        setResumeSubmitted(true);
    } catch (error) {
        console.error('Error:', error);

        if (
            error.response &&
            error.response.status === 404 &&
            error.response.data?.error?.toLowerCase().includes('no job found')
        ) {
            alert('No job found for the specified title.');
        } else {
            alert('An error occurred while processing your resume.');
        }
    } finally {
        setLoading(false);
    }
};


    return (
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5 mt-[40px]">
                    <label className="block mb-2 text-sm font-medium text-black">Job Role</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Job Role"
                        required
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="resume" className="block mb-2 text-sm font-medium text-black">Resume (PDF only)</label>
                    <input
                        type="file"
                        id="resume"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 font-medium mx-[120px] text-sm w-[150px] px-1 py-2 text-center"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Resume"}
                </button>
            </form>
            {score !== null && (
                <div className="max-w-sm mx-auto mt-[20px]">
                    <p>Score of resume for applied job role: <b className={`${score >= 3 ? 'text-green-500' : 'text-red-400'}`}>{score}</b></p>
                    <p>Optimizations: <br /><span className='text-blue-800'>{optimizations}</span></p>
                </div>
            )}
            {resumeSubmitted && (
                recommendedJobs.length > 0 ? (
                    <div className="ms-[10px] mt-[40px]">
                        <p className="text-lg font-semibold mb-4">Recommended Jobs</p>
                        <div className="grid gap-4">
                            {recommendedJobs.map((job, index) => (
                                <div
                                    key={index}
                                    className="p-4 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition"
                                >
                                    <p><b>Title:</b> {job.title}</p>
                                    <p><b>Company:</b> {job.companyName}</p>
                                    <p><b>Location:</b> {job.location || 'Not specified'}</p>
                                    <p><b>Salary:</b> {job.salary ? `$${job.salary}` : 'Not specified'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">No jobs available for this role</p>
                )
            )}
        </div>
    );
}
