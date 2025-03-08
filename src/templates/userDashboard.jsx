import * as React from 'react';
import { DashboardFooter } from '../components/managerComponents/dashboardFooter';
import { Outlet } from "react-router-dom";
import { UserNavbar } from '../components/userComponents/userNavBar';

export function UserDashboard() {
  return (
    <div className="min-h-full flex flex-col">
      <UserNavbar />
      <div className="flex flex-1 flex-col mt-16 sm:ml-64"> 
        <div className="flex-1 flex flex-col items-center justify-center pl-10 pr-10">
          <main className="p-4 space-y-6 flex flex-col rounded-lg w-full">
            <Outlet />
          </main>
        </div>
      </div>
      <DashboardFooter className="relative z-50" /> {/* Ensure footer has a higher z-index */}
    </div>
  );
}