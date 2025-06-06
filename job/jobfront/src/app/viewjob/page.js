'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function page() {
    const [jobdetails, setjobDetails] = useState([]);
    const getjobdetails = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/jobs/getjobs");
            setjobDetails(response.data.data); 
            console.log(response.data.data)
        } catch (error) {
            console.log(error); 
        }
    };
    const handleDelete = async (jobId) => {
        try {
            await axios.delete(`http://localhost:5000/api/jobs/deletejob/${jobId}`);
            setjobDetails(jobdetails.filter((job) => job.id !== jobId));
            getjobdetails();
        } catch (error) {
            console.log('Error deleting job:', error);
        }
    };
    useEffect(() => {
        getjobdetails()
    }, [])
    return (
        <div className='mt-[40px] mx-[20px]'>
            <Link href={'/main'} ><svg className="w-6 h-6 text-gray-800 dark:text-white mb-[10px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13" />
            </svg></Link>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
                    <div>
                        <button className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5" type="button">
                            <span className="sr-only">Action button</span>
                            Delete
                        </button>
                    </div>
                    <label className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search for users" />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                    <label className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                COMPANY Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                JOB Position
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Skills
                            </th>
                            <th scope="col" className="px-6 py-3">
                                JOB Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobdetails.map((v, i) => (
                            <tr key={v._id || i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                                        <label className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src={`http://localhost:5000/companylogo/${v.companyLogo}`} alt="Jese image"/>
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{v.companyName}</div>
                                        <div className="font-normal text-gray-500">{v.email}</div>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    <p className='font-extrabold text-orange-400'>{v.title}</p>
                                    <p className='font-semibold mt-2 text-blue-500'>Location:{v.location}</p>
                                </td>
                                <td>
                                    {v.skills.join(',')}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button className={`p-[8px] ${v.status === true ? 'bg-green-500' : 'bg-red-500'
                                            } text-white`}>{v.status===true?'Active':"Inactive"}</button>
                                    </div>
                                </td>
                                <td className="flex gap-2 px-6 py-4">
                                    <Link href={`/editjob/${v._id}`} className="font-medium"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-yellow-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                    </Link>
                                    <button onClick={() => handleDelete(v._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28" strokeWidth="1.5" stroke="currentColor" className="size-6 stroke-red-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
