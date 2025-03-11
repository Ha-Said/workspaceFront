import * as React from 'react';
import { DashboardFooter } from '../components/managerComponents/dashboardFooter';
import { Suspense } from 'react';
import { Outlet } from "react-router-dom";
import { UserNavbar } from '../components/userComponents/userNavBar';
import Loading from '../components/loading';

export function UserDashboard() {
  return (
    <div className="min-h-full flex flex-col">
      <UserNavbar />
      <div className="flex flex-1 flex-col mt-16 sm:ml-64 h-full mb-20"> 
        <div className="flex-1 flex flex-col items-center justify-center pl-10 pr-10">
          <main className="p-4 space-y-6 flex flex-col rounded-lg w-full mb-5 h-full" style={{ minHeight: 'calc(100vh - 64px - 80px)' }}>
            <div className="flex-1">
              <Suspense fallback={<Loading />}>
                <Outlet />
              </Suspense>
            </div>
          </main>
        </div>
      </div>
      <DashboardFooter className="mt-20" />
    </div>
  );
}