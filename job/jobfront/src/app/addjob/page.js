'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import addjob from '../image/jobs.png'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        companyName: '',
        title: '',
        location: '',
        email: '',
        salary: '',
        description: '',
        skills: '',
        status: true,
    });
    const [companyLogo, setCompanyLogo] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'status' ? value === 'true' : value // Handle boolean conversion for status
        });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCompanyLogo(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!companyLogo) {
            alert('Company logo is required');
            return;
        }
        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));
        data.append('companyLogo', companyLogo);
        try {
            const response = await axios.post(`http://localhost:5000/api/jobs/addjobs`, data);
            if (response.status === 200) {
                alert('Job added successfully');
                router.push('/viewjob');
            } else {
                alert('Job not added successfully');
            }
        } catch (error) {
            console.log('Error adding job:', error);
            alert('Failed to add job');
        }
    };
    return (
        <div className='w-[1295px] h-[500px]'>
            <p className='text-5xl p-[20px] ms-[570px] my-[20px]'>Add Job</p>
            <div className='flex gap-[40px]'>
                <Image src={addjob} width={700} height={700} alt='' />
                <div>
                    <form className="max-w-md mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none" required name="companyName" value={formData.companyName} onChange={handleChange} />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input type="file" name='companyLogo' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none" onChange={handleFileChange} />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Logo</label>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none" required name="title" value={formData.title} onChange={handleChange} />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Post</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none " required name="location" value={formData.location} onChange={handleChange} />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Location</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none " required name="email" value={formData.email} onChange={handleChange} />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none " required name="salary" value={formData.salary} onChange={handleChange} />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Salary</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label name="description" className="block mb-2 text-sm font-medium text-gray-900 ">Company Description</label>
                                <textarea id="message" rows="4" className="block p-2.5 w-[220px] text-sm text-gray-900 bg-gray-50  border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="description" value={formData.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none " required name="skills" value={formData.skills} onChange={handleChange} />
                                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Skills</label>
                                <div className='flex gap-2 mt-[35px]'>
                                <input type='radio' name='status' value={true} checked={formData.status === true}
                                    onChange={handleChange}/>
                                <label>Show</label>
                                <input type='radio' name='status' value={false} checked={formData.status === false}
                                    onChange={handleChange}/>
                                <label>Hide</label>
                            </div>
                            </div>   
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add Job</button>
                    </form>
                    <Link href={'/main'} ><svg className="w-6 h-6 text-gray-800 dark:text-white mt-[10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
                    </svg></Link>
                </div>
            </div>
        </div>
    )
}

export default page