import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EyeOff, Eye } from "lucide-react";
import { useAuthStore } from "../auth/auth.store";
import { logo_luwydyro_dark } from "../assets/images";

type LocationState = {
  from?: {
    pathname: string;
  };
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);
  const login = useAuthStore((state) => state.login);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [usuario, setUsuario] = useState("emilys");
  const [contrasena, setContrasena] = useState("emilyspass");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const from = state?.from?.pathname || "/";

  useEffect(() => {
    if (_hasHydrated && token && user) {
      console.log("Usuario ya autenticado, redirigiendo...");
      navigate(from, { replace: true });
    }
  }, [_hasHydrated, token, user, from, navigate]);

  if (!_hasHydrated) {
    console.log("Esperando hidratación...");
    return null;
  }

  const toggleVisibility = (field: string) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!usuario || !contrasena) {
      setError("Por favor, completa todos los campos");
      return;
    }

    setLoading(true);
    try {
      await login(usuario, contrasena);
      console.log("Bienvenido a Authentication - LuwyDyro");
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error.", err);
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error login Google", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="bg-slate-950  rounded-xl relative border-slate-800  border shadow-lg w-95  text-center px-5 sm:px-8 py-10">
        <form className="space-y-4" onSubmit={handleLogin} noValidate>
          <div className="mx-auto flex items-center justify-center mb-5">
            <img
              src={logo_luwydyro_dark}
              alt="Luwy Dyro"
              width={260}
              loading="lazy"
              decoding="async"
            />
          </div>
          <h1 className="text-blue-50 mb-4 text-xl font-medium">
            Iniciar Sesión
          </h1>
          <button
            type="button"
            aria-label="Submit"
            onClick={handleGoogleLogin}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-x-2 px-4 py-2.5 text-sm shadow-xs hover:bg-blue-100 disabled:pointer-events-none rounded-md bg-slate-950  border border-bluedark-300 focus:outline-none focus:border-blue-400 text-blue-100 mb-2 hover:text-blue-600"
          >
            <svg
              className="h-auto w-4"
              width="46"
              height="47"
              viewBox="0 0 46 47"
              fill="none"
            >
              <path
                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                fill="#4285F4"
              />
              <path
                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                fill="#34A853"
              />
              <path
                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                fill="#FBBC05"
              />
              <path
                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                fill="#EB4335"
              />
            </svg>
            Google
          </button>
          <div className="flex items-center py-3 mb-2 text-xs before:flex-1 before:border-t before:border-blue-300 after:flex-1 after:border-t after:border-blue-300"></div>
          <div className="mb-4 text-left">
            <label
              className="label-1 text-blue-100 mb-1 block text-sm cursor-pointer"
              htmlFor="usuario"
            >
              Usuario
            </label>

            <div className="relative">
              <input
                id="usuario"
                type="text"
                placeholder="Escribe tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="body w-full text-blue-100 text-sm rounded-md bg-slate-950  border border-bluedark-600 px-4 py-2.5 focus:outline-none focus:border-blue-400"
                required
              />
            </div>
          </div>
          <div className="mb-3 text-left">
            <label
              className="label-1 text-blue-100 mb-1 block text-sm cursor-pointer"
              htmlFor="contrasena"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                id="contrasena"
                name="contrasena"
                type={visibility.password ? "text" : "password"}
                placeholder="Escribe tu contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="body w-full text-blue-100 text-sm rounded-md bg-slate-950  border border-bluedark-600 px-4 py-2.5 focus:outline-none focus:border-blue-400"
                required
              />
              <div className="absolute top-0.5 bottom-0.5 flex justify-center items-center px-1 rounded-sm end-2">
                <div
                  className="text-blue-600"
                  onClick={() => toggleVisibility("password")}
                  tabIndex={-1}
                >
                  {visibility.password ? <Eye /> : <EyeOff />}
                </div>
              </div>
            </div>
          </div>
          {error && (
            <p className="text-red-300 text-left text-sm mb-3" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full 
            bg-blue-400 text-white rounded-md text-md font-medium mt-5 p-2.5 hover:bg-primary-green-600 transition-colors
            cursor-pointer"
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};
