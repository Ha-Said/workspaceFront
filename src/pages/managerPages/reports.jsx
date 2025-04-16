import BasicArea from '../../components/managerComponents/chart';
import PaymentGraph from '../../components/managerComponents/PaymentGraph';
import ColumnChart from '../../components/managerComponents/columnChart';
import ManagerRanks from '../../components/managerComponents/managerRanks';
import ManagerSpendingRanks from '../../components/managerComponents/managerSpendingRanks';

export default function Reports() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4 p-4">
      <div className="flex flex-row w-full space-x-4">
        <div className="w-[70%]">
          <PaymentGraph />
        </div>
        <div className="w-[30%]">
          <ColumnChart />
        </div>
      </div>
      <div className="flex flex-row w-full space-x-4">
        <div className="w-1/2">
          <ManagerRanks />
        </div>
        <div className="w-1/2">
          <ManagerSpendingRanks />
        </div>
      </div>
    </div>
  );
}