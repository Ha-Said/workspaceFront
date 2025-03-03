import * as React from 'react';
import { SideBar } from "../components/sidebar";
import { Header } from '../components/header';
import {Community} from'./community';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
export function Dashboard() {
  return (
    <>
    <div className='mb-10 mt-3 '>    <Header /></div>

      <div className="flex h-full pr-50">
        <div className="w-1/4">
          <SideBar />
        </div>
        <div className="w-3/4 ml-6 mt-6">
          <Outlet/>
        </div>
      </div>
    </>
  );
}