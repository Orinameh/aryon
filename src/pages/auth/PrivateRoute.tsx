import Spinner from "@/components/Spinner";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router";

const links = [
  { name: "Recommendations", route: "/recommendations" },
  { name: "Archived", route: "/archived" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const signOut = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    dispatch({ type: "LOGOUT", payload: { user: { token: "" } } });
  };
  return (
    <aside className="w-[220px] bg-[#f7f7f7] h-full py-6 px-4 overflow-x-hidden overflow-y-auto fixed top-0 hidden md:flex flex-col">
      <div className="my-4">
        <p className="text-2xl">ARYON</p>
        <small className="-mt-3 mb-4">Enterprise</small>
      </div>
      <nav className="mt-6">
        {links.map((link) => (
          <NavLink
            to={link.route}
            key={link.name}
            className={({ isActive }) =>
              `mb-1 flex text-sm transition px-3 py-1 ${
                isActive ? "bg-slate-200 text-primary rounded" : ""
              }`
            }
          >
            <p>{link.name}</p>
          </NavLink>
        ))}

        <span
          className="absolute bottom-4 text-sm cursor-pointer text-red-800"
          onClick={signOut}
        >
          Sign out
        </span>
      </nav>
    </aside>
  );
};

export default function PrivateRoute() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const isAuthenticated = user?.token !== "" || user.token !== undefined;
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isAuthenticated) {
      timerId = setTimeout(() => navigate("/recommendations"));
    } else {
      timerId = setTimeout(() => navigate("/"));
    }
    return () => clearTimeout(timerId);
  }, [navigate, isAuthenticated]);
  if (user === undefined) return <Spinner />;
  return isAuthenticated ? (
    <div className="flex relative">
      <Sidebar />
      <main className="flex-1 bg-[#eceded] relative px-6 py-4 ml-56 min-h-screen">
        <Outlet />
      </main>
    </div>
  ) : (
    <Navigate to="/" />
  );
}
