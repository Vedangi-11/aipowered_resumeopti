'use client';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../store/slice/authSlice';

export default function Sidebarpanel() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout()); // Reset Redux state
    localStorage.removeItem('token'); // Clear the token from storage
    alert('You are logged out now');
    router.push('/login?logout=true'); // Pass query parameter to indicate logout
  };

  return (
    <div>
      <div className="absolute top-24 left-10 text-lg">
        <button className="block p-1 border-none">
          <Link href="/apppanel/uploadresume" className="text-black no-underline">
            Upload Resume
          </Link>
        </button>
        <button className="block p-1 mt-2 border-none">
          <Link href="/apppanel/jobs" className="text-black no-underline">
            Jobs
          </Link>
        </button>
        <button
          className="block p-1 mt-2 border-none text-black no-underline"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
    </div>
  );
}
