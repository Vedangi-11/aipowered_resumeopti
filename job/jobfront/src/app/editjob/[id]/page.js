'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
    });

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/jobs/getjobbyid/${id}`);
                    setFormData(response.data.data);
                } catch (error) {
                    console.error('Error fetching job details:', error);
                }
            }
        };

        fetchJobDetails();
    }, [id]);

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            companyLogo: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/api/jobs/updatejob/${formData._id}`,
                {
                    title: formData.title,
                    description:formData.descroption,
                    skills:formData.skills,
                    salary: formData.salary,
                    companyName:formData.companyName,
                    location:formData.loaction,
                    email:formData.email
                }
            );
            if (response.status !== 200) {
                return alert("Job not updated, try again");
            }
            alert("Job updated successfully");
        } catch (error) {
            console.log(error);
            alert("Cannot update");
        }
    };
    return (
        <div className='m-[50px]'>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none" required name="companyName" value={formData.companyName} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Name</label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none" required name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Post</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none " required name="location" value={formData.location} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Location</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none " required name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none " required name="salary" value={formData.salary} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Salary</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label name="description" className="block mb-2 text-sm font-medium text-gray-900 ">Company Description</label>
                        <textarea id="message" rows="4" className="block p-2.5 w-[220px] text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} ></textarea>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none " required name="skills" value={formData.skills} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Skills</label>
                    </div>

                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update Job</button>
            </form>
        </div>
    )
}

export default page