import { ChartAreaRangePart } from "../charts/ChartAreaRange";
import { ChartLinePart } from "../charts/ChartLine";
import { ChartTimelinePart } from "../charts/ChartTimeline";
export const HomePage = () => {
  return (
    <div className="text-white flex flex-col gap-6">
      <div>
        <div className="pb-7">
          <h3 className="text-3xl not-md:text-xl font-bold mb-3">Dashboard</h3>
          <p className="text-base not-md:text-sm">
            Este proyecto implementa un sistema de autenticación en React +
            TypeScript, con Zustand como estado global, integrado con backend
            propio en NestJS y Firebase Authentication, con control avanzado de
            sesión, expiración, inactividad y UX en dashboard..
          </p>
        </div>
        <div className="grid grid-cols-2 not-md:grid-cols-1 grid-rows-1 not-md:grid-row-2 gap-6">
          <div className="pb-5 grid col-span-2 border-blue-950 bg-slate-900 pt-4 px-5 border rounded-xl">
            <p className="font-mono text-base font-medium tracking-widest text-blue-500 uppercase mb-3">
              AUTENTICACIÓN
            </p>
            <ul className="list-disc pl-5 ">
              <li className="marker:text-blue-900 text-white ">
                Autenticación mediante credenciales vía API REST{" "}
                <strong className="italic">(NestJS)</strong> y Google Sign-In{" "}
                <strong className="italic">(Firebase)</strong>.
              </li>
              <li className="marker:text-blue-900 text-white ">
                Uso de <strong className="italic">Zustand</strong> para el
                manejo global del estado de autenticación.
              </li>
              <li className="marker:text-blue-900 text-white ">
                Persistencia segura de sesión en{" "}
                <span className="font-mono text-blue-500">sessionStorage</span>.
              </li>
              <li className="marker:text-blue-900 text-white ">
                Cierre de sesión automático y manual.
              </li>
            </ul>
          </div>
          <div className="pb-5 grid border-blue-950 bg-slate-900 pt-4 px-5 border rounded-xl">
            <p className="font-mono text-base font-medium tracking-widest text-blue-500 uppercase mb-3">
              Control de Sesión
            </p>
            <ul className="list-disc pl-5 ">
              <li className="marker:text-blue-900 text-white ">
                Cada sesión tiene una duración configurable(TTL).
              </li>
              <li className="marker:text-blue-900 text-white ">
                Se almacena un <span className="font-mono text-blue-500">expiresAt</span> que define el tiempo exacto de
                expiración.
              </li>
              <li className="marker:text-blue-900 text-white ">
                Modal de advertencia 2 minutos antes de expirar la sesión
              </li>
              
            </ul>
          </div>
          <div className="pb-5 grid border-blue-950 bg-slate-900 pt-4 px-5 border rounded-xl">
            <p className="font-mono text-base font-medium tracking-widest text-blue-500 uppercase mb-3">
              Inactividad
            </p>
            <ul className="list-disc pl-5 ">
              <li className="marker:text-blue-900 text-white ">
                Sistema de logout automático por inactividad.
              </li>
              <li className="marker:text-blue-900 text-white ">
                Implementación de un período de gracia <strong className="italic">(2–3 segundos)</strong> antes de iniciar el conteo real.
              </li>
              <li className="marker:text-blue-900 text-white ">
                Detección global de inactividad del usuario (mouse, teclado, scroll, touch).
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mb-2 list-none rounded-full border-b border-blue-700/50"></div>
      <div>
        <h3 className="text-3xl not-md:text-xl font-bold mb-2">Mocks</h3>
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
