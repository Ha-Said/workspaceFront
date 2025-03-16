import BasicArea from '../../components/managerComponents/chart';
import PaymentGraph from '../../components/managerComponents/PaymentGraph';
import ColumnChart from '../../components/managerComponents/columnChart';
export default function Reports(){
return (
    <div className="flex items-center justify-center w-full h-full space-y-4">
        <div className="flex flex-row w-[70%] mr-6"> 
        <PaymentGraph />
        </div>
        <div className="flex flex-row w-[30%] h-[60%]">
        <ColumnChart />
        </div>
    </div>
    );}