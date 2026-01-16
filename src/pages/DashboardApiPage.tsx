import { ChartLineAPI } from "../charts/API/ChartLineAPI";
import { ChartBarAPI } from "../charts/API/ChartBarAPI";
import { ChartStoreAPI } from "../charts/API/ChartStoreAPI";
export const DashboardApiPage = () => {
  return (
    <div className="text-white flex flex-col gap-6">
      <div>
        <div className="pb-7">
          <h3 className="text-3xl not-md:text-xl font-bold mb-3">
            Dashboard - API
          </h3>
        </div>
      </div>
      <div className="mb-2 list-none rounded-full border-b border-blue-700/50"></div>
      <p className="font-mono text-base font-medium tracking-widest text-blue-500 uppercase mb-3">
        API: https://fakestoreapi.com
      </p>
      <div className="grid md:grid-cols-2 grid-cols-1  gap-6">
        <div className="grid border-blue-950 bg-slate-900 pt-4 px-5 border rounded-xl">
          <p className="text-base not-md:text-sm"></p>
          <ChartBarAPI />
        </div>
        <div className="grid border-blue-950 bg-slate-900 pt-4 px-5 border rounded-xl">
          <ChartStoreAPI />
        </div>
      </div>
      <p className="font-mono text-base font-medium tracking-widest pt-4 text-blue-500 uppercase mb-3">
        API: https://www.coingecko.com/en/api
      </p>
      <div className="grid grid-cols-1 border-blue-950 bg-slate-900 pt-4 px-5 border rounded-xl">
        <ChartLineAPI />
      </div>
    </div>
  );
};
