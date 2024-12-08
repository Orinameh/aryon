import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router";


export default function PrivateRoute() {
  const { isAuthenticated } = useAuthStore()
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isAuthenticated) {
      timerId = setTimeout(() => navigate(location.pathname));
    } else {
      timerId = setTimeout(() => navigate("/"));
    }
    return () => clearTimeout(timerId);
  }, [navigate, isAuthenticated, location.pathname]);

  return isAuthenticated ? (
    <SidebarProvider>
      <Sidebar />
      <main className="flex-1 bg-[#eceded] relative px-6 py-4 min-h-screen">
        <Outlet />
      </main>
    </SidebarProvider>
  ) : (
    <Navigate to="/" />
  );
}
