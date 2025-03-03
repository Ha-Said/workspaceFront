import * as React from 'react';
import { NewSidebar } from '../components/newSideBar';
import { Header } from '../components/header';
import { Outlet } from "react-router-dom";

export function Dashboard() {
  return (
    <>
      <div className='mb-10 mt-3'>
        <Header />
      </div>
      <div className="flex h-full mr-20">
        <div className=""> {/* Increased margin-left to move the sidebar further from the left */}
          <NewSidebar />
        </div>
        <div className="w-3/4 "> {/* Reduced margin-left to decrease the gap */}
          <main className="bg-gray-900 p-4 space-y-6  flex flex-col rounded-lg">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}