import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarContent>
        <SidebarHeader className="bg-sidebar border-b">
          <Header />
        </SidebarHeader>
        <main className="flex flex-col mx-auto gap-12 w-full max-w-7xl p-[3%]">
          <Outlet />
        </main>
      </SidebarContent>
    </SidebarProvider>
  );
}
