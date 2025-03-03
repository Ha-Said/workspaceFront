import * as React from 'react';
import { Carded } from '../pages/components/card';
import { SideBar } from "../pages/components/sidebar";
import { Header } from '../pages/components/header';
export function Dashboard() {
  return (
    <>
    <div className='mb-10 mt-3'>    <Header /></div>

      <div className="flex h-full">
        <div className="w-1/4">
          <SideBar />
        </div>
        <div className="w-3/4 ml-6 mt-6">
          <Carded />
        </div>
      </div>
    </>
  );
}