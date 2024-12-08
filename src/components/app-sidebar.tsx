import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useAuthStore from "@/store/useAuthStore";
import { NavLink, useMatch } from "react-router";

import DocIcon from "@/assets/doc";
import StarIcon from "@/assets/star";
import EventsIcon from "@/assets/events";
import WaiverIcon from "@/assets/waiver";

const items = [
  { title: "Recommendations", url: "/recommendations", Icon: StarIcon },
  { title: "Policies", url: "/policies", Icon: DocIcon },
  { title: "Events", url: "/events", Icon: EventsIcon },
  { title: "Waivers", url: "/waivers", Icon: WaiverIcon },
];

const SidebarItem = ({
  item,
}: {
  item: { title: string; url: string; Icon: () => JSX.Element };
}) => {
  const match = useMatch(item.url);
  const IconPath = item.Icon;
  return (
    <NavLink
      to={item.url}
      key={item.title}
      className={({ isActive }) =>
        `mb-1 flex items-center gap-2 text-sm transition px-3 py-1 ${
          isActive ? "bg-slate-200 text-primary rounded" : ""
        }`
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill="none"
        viewBox="0 0 24 24"
        className={`w-5 h-5 transition ${
          match ? "fill-primary stroke-primary" : "fill-white stroke-black"
        }`}
      >
        <IconPath />
      </svg>
      <p>{item.title}</p>
    </NavLink>
  );
};
export function AppSidebar() {
  const { logout } = useAuthStore();

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
              <SidebarItem item={item} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex gap-3 items-center">
              <div className="bg-primary300 w-8 h-8 flex items-center justify-center rounded-lg">
                <p>YJ</p>
              </div>
              <div>
                <p className="font-semibold text-sm">Yair Lad</p>
                <p className="text-xs">yarilad@aryon.security</p>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenuButton asChild>
          <span
            role="button"
            onClick={logout}
            className="text-sm cursor-pointer text-red-800"
          >
            Sign out
          </span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
