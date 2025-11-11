import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Calendar, Home, Inbox, Settings, User2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import UploadSample from "./UploadSample";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: Inbox,
  },
  {
    title: "Cabins",
    url: "/cabins",
    icon: Calendar,
  },
  {
    title: "Guests",
    url: "/guests",
    icon: User2,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="justify-between">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} className="nav-link">
                    <item.icon size={20} />
                    <span className="font-medium">{item.title}</span>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <UploadSample />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
