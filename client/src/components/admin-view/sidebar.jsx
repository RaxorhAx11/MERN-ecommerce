import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [

  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket className="w-5 h-5" />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck className="w-5 h-5" />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="mt-8 flex flex-col gap-1">
      {adminSidebarMenuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => {
            navigate(item.path);
            setOpen?.(false);
          }}
          className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          {item.icon}
          <span className="text-sm font-medium">{item.label}</span>
        </div>
      ))}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  const BrandHeader = () => (
    <div
      onClick={() => navigate("/admin/dashboard")}
      className="flex items-center gap-3 px-4 py-3 cursor-pointer"
    >
      <ChartNoAxesCombined size={28} className="text-primary" />
      <span className="text-lg font-bold tracking-tight">WalkUp Admin</span>
    </div>
  );

  return (
    <Fragment>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="border-b px-4 py-3">
            <SheetTitle asChild>
              <BrandHeader />
            </SheetTitle>
          </SheetHeader>
          <MenuItems setOpen={setOpen} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-background px-4 py-6">
        <BrandHeader />
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
