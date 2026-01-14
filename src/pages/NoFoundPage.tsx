import { Link } from "react-router-dom"

export const NotFoundPage = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-slate-950">
            <h1 className="text-6xl font-bold text-zinc-200">404</h1>
            <p className="text-2xl mt-4 text-blue-500">Página No Encontrada</p>
            <p className="mt-2 text-zinc-500">
                Lo sentimos, la página que estás buscando no existe.
            </p>
            <Link to="/">
                <button className="mt-6 px-4 py-2 hover:bg-slate-800 text-white bg-blue-500 cursor-pointer">
                    Volver al Home
                </button>
            </Link>
        </div>
    )
}