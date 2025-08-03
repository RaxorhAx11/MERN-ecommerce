import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b">
      {/* Sidebar toggle button */}
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        className="lg:hidden sm:inline-flex text-muted-foreground"
      >
        <AlignJustify className="w-6 h-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Logout button */}
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="flex items-center gap-2 text-sm font-medium hover:bg-red-50 hover:text-red-600 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
