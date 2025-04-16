import React from 'react';
import BasicArea from '../../components/managerComponents/chart';
import PaymentGraph from '../../components/managerComponents/PaymentGraph';
import ColumnChart from '../../components/managerComponents/columnChart';
import ManagerRanks from '../../components/managerComponents/managerRanks';
import ManagerSpendingRanks from '../../components/managerComponents/managerSpendingRanks';
import WorkspaceUtilization from '../../components/managerComponents/workspaceUtilization';

const Reports = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-[400px]">
          <PaymentGraph />
        </div>
        <div className="h-[400px]">
          <ColumnChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ManagerRanks />
        <ManagerSpendingRanks />
      </div>

      <WorkspaceUtilization />
    </div>
  );
};

export default Reports;