import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="flex flex-col mx-auto gap-12 w-full max-w-7xl p-[3%]">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
