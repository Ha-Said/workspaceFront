import React from 'react';
import BasicArea from '../../components/managerComponents/chart';
import PaymentGraph from '../../components/managerComponents/PaymentGraph';
import ColumnChart from '../../components/managerComponents/columnChart';
import ManagerRanks from '../../components/managerComponents/managerRanks';
import SpendingRanks from '../../components/managerComponents/SpendingRanks';
import WorkspaceUtilization from '../../components/managerComponents/workspaceUtilization';

const Reports = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
          <PaymentGraph />
        </div>
        <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
          <ColumnChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
          <ManagerRanks />
        </div>
        <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
          <SpendingRanks />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6">
        <WorkspaceUtilization />
      </div>
    </div>
  );
};

export default Reports;