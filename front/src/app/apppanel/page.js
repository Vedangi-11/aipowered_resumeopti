'use client';
export const dynamic = 'force-dynamic';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import { useSelector } from 'react-redux';

function AppPanelContent() {
  const nav = useRouter();
  const searchParams = useSearchParams();
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth.isAuthenticated === undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      const isLogout = searchParams.get('logout') === 'true';
      if (!auth.isAuthenticated && !isLogout) {
        nav.push('/login');
      }
    }
  }, [auth.isAuthenticated, searchParams, nav]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">App Panel</h1>
      {auth.isAuthenticated ? (
        <div>
          <p className="text-lg mb-2">
            Welcome, <strong>{auth.user?.email}</strong>!
          </p>
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading App Panel...</p>}>
      <AppPanelContent />
    </Suspense>
  );
}
