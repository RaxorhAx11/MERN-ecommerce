import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-muted/30 text-foreground">
      {/* Sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />

      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <AdminHeader setOpen={setOpenSidebar} />

        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6 space-y-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
