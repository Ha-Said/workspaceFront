import * as React from 'react';
import { DashboardFooter } from '../components/dashboardFooter';
import { Outlet } from "react-router-dom";
import { Navbar } from '../components/NavBar';

export function Dashboard() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col">
        <div className="flex-1 flex flex-col items-center justify-center pl-10 pr-10">
          <main className="p-4 space-y-6 flex flex-col rounded-lg w-full mb-20">
            <Outlet />
          </main>
        </div>
      </div>
      <DashboardFooter />
    </div>
  );
}