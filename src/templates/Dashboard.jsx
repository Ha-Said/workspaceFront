import * as React from 'react';
import { Header } from '../components/header';
import { Outlet } from "react-router-dom";
import { Navbar } from '../components/NavBar';

export function Dashboard() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <div className="flex flex-1">
    
        <div className="flex-1 flex flex-col items-center justify-center">
          <main className="bg-gray-900 p-4 space-y-6 flex flex-col rounded-lg w-full max-w-7xl">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}