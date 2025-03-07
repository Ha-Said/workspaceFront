import BasicArea from '../components/chart';
import TailwindChart from '../components/tailwindChart';
import ColumnChart from '../components/columnChart';
export default function Reports(){
return (
    <div className="flex items-center justify-center w-full h-full space-y-4">
        <div className="flex flex-row w-[70%] mr-6"> 
        <TailwindChart />
        </div>
        <div className="flex flex-row w-[30%] h-[60%]">
        <ColumnChart />
        </div>
    </div>
    );}