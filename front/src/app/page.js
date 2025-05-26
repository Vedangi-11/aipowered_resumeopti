'use client'
import axios from "axios";
import Link from "next/link";
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { registerSuccess } from "./store/slice/authSlice";
export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/user/registeruser`, {
        username,
        email,
        password,
      });
      const data = response.data; 
      console.log(data);
      if (response.status === 200) {
        dispatch(registerSuccess({ user: data.user, token: data.token }));
        alert("Registration successful!");
      } else {
        console.error("Registration failed:", data.message);
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.log("An error occurred:", error.response?.data?.message || error.message);
      alert("An error occurred: " + (error.response?.data?.message || error.message));
    }
  };
  return (
    <div className="">
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5 mt-[100px]">
          <label className="block mb-2 text-sm font-medium text-gray-900">Username</label>
          <input type="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} name="username" />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
          <input type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
          <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5" required placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="text-white bg-blue-700 font-medium mx-[150px] text-sm w-full sm:w-auto px-5 py-2.5 text-center">Register</button>
        <p className="my-4">Alredy registered <Link href={'/login'} className="text-blue-500">Login</Link></p>
      </form>
    </div>
  );
}
