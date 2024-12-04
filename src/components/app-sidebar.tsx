import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useAuthStore from "@/store/useAuthStore";
import { NavLink } from "react-router";

const items = [
  { title: "Recommendations", url: "/recommendations" },
  { title: "Archived", url: "/archived" },
];
export function AppSidebar() {
    const {logout} = useAuthStore()
  return (
    <Sidebar>
      <SidebarContent>
        <div className="my-4 p-3">
          <p className="text-2xl">ARYON</p>
          <small className="-mt-3 mb-4">Enterprise</small>
        </div>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="px-2">
              <NavLink
                to={item.url}
                key={item.title}
                className={({ isActive }) =>
                  `mb-1 flex text-sm transition px-3 py-1 ${
                    isActive ? "bg-slate-200 text-primary rounded" : ""
                  }`
                }
              >
                <p>{item.title}</p>
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <span role="button" onClick={logout} className="text-sm cursor-pointer text-red-800">Sign out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
