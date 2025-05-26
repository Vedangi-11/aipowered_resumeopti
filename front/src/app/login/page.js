'use client'
import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../store/slice/authSlice';
import { useRouter } from 'next/navigation';
export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
    const nav=useRouter();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${API_BASE}/user/login`, {
          email,
          password,
        });
        if (response.status === 200) {
          const { user, token } = response.data;
          dispatch(loginSuccess({ user, token }));
          alert('Login successful!');
          nav.push("/apppanel")
        } else {
          console.error('Login failed:', response.data.message);
        }
      } catch (error) {
        console.log(
          'Login error:',
          error.response?.data?.message || error.message
        );
        alert(
          `Login failed: ${
            error.response?.data?.message || 'Unexpected error occurred'
          }`
        );
      }
    };
    return (
        <div>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5 mt-[100px]">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email Address</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5" placeholder="Email" required name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5" required placeholder="Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="text-white bg-blue-700 font-medium mx-[150px] text-sm w-full sm:w-auto px-5 py-2.5 text-center">Login</button>
                <p className="my-4">Do not have an account <Link href={'/'} className="text-blue-500">Register</Link></p>
            </form>
        </div>
    )
}
