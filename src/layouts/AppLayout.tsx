import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
