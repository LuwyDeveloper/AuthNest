import { ChartAreaRangePart } from "../charts/ChartAreaRange";
import { ChartLinePart } from "../charts/ChartLine";
import { ChartTimelinePart } from "../charts/ChartTimeline";
export const HomePage = () => {
  return (
    <div className="text-white flex flex-col gap-6">
      <div>
        <h3 className="text-3xl not-md:text-xl font-bold mb-2">
          Bienvenido al Dashboard
        </h3>
        <p className="text-lg">
          Esto es lo que está sucediendo con su tienda hoy.
        </p>
      </div>

      <div className="grid grid-cols-2 not-md:grid-cols-1 grid-rows-1 not-md:grid-row-2 gap-6">
        <div className="grid border-blue-950 bg-slate-900 pt-4 px-5 border rounded-xl">
          <ChartLinePart />
        </div>
        <div className="grid border-blue-950 bg-slate-900 pt-4 px-5 border rounded-xl">
        <ChartAreaRangePart />
        </div>
      </div>
       <div className="grid grid-cols-1 border-blue-950 bg-slate-900 pt-4 px-5 border rounded-xl">
          <ChartTimelinePart />
      </div>
    </div>
  );
};
