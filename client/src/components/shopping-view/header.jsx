import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem, idx) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium text-[#114AB1] cursor-pointer hover:text-[#E4580B] transition-all duration-300 wave-effect"
          style={{ animationDelay: `${idx * 0.2}s` }}
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-3">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative border-[#6793AC]/30 hover:bg-[#6793AC]/10 rounded-lg transition-all duration-300"
        >
          <ShoppingCart className="w-5 h-5 text-[#114AB1]" />
          <span className="absolute top-[-8px] right-[-8px] bg-[#E4580B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-[#114AB1] hover:scale-105 transition-all duration-300">
            <AvatarFallback className="bg-[#114AB1] text-white font-bold text-sm">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-white shadow-md rounded-lg border border-[#6793AC]/20 font-poppins">
          <DropdownMenuLabel className="text-[#114AB1] font-medium text-sm">
            Logged in as {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-[#6793AC]/20" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/account")}
            className="text-gray-600 hover:bg-[#6793AC]/10 hover:text-[#E4580B] transition-all duration-200"
          >
            <UserCog className="mr-2 h-4 w-4 text-[#114AB1]" />
            <span className="text-sm">Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-[#6793AC]/20" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-gray-600 hover:bg-[#6793AC]/10 hover:text-[#E4580B] transition-all duration-200"
          >
            <LogOut className="mr-2 h-4 w-4 text-[#114AB1]" />
            <span className="text-sm">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#6793AC]/20 font-poppins">
      <div className="relative flex h-16 items-center justify-between px-4 md:px-6 bg-gradient-to-r from-[#6793AC]/10 to-[#114AB1]/10">
        {/* Wave Background */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 w-full h-8"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C360,20 720,80 1080,20 C1260,0 1440,60 1440,60 L1440,60 L0,60 Z"
              fill="#8ddfffff"
              fillOpacity="0.3"
              className="wave-1"
            />
            <path
              d="M0,60 C400,40 800,80 1200,40 C1320,20 1440,60 1440,60 L1440,60 L0,60 Z"
              fill="#FFFFFF"
              fillOpacity="0.2"
              className="wave-2"
            />
            <path
              d="M0,60 C320,30 640,70 960,30 C1280,10 1440,60 1440,60 L1440,60 L0,60 Z"
              fill="#ffffffff"
              fillOpacity="0.1"
              className="wave-3"
            />
          </svg>
        </div>

         <Link to="/shop/home" className="flex items-center gap-2 z-10">
    <img
    src="\src\assets\logo.png" 
    alt="Walkup Logo"
    className="h-10 w-10 object-contain animate-walkup"
  />
  <span className="font-bold text-base">
    <span className="text-[#000000]">Walk</span>
    <span className="text-[#E4580B]">Up</span>
  </span>
</Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden border-[#6793AC]/30 hover:bg-[#6793AC]/10 rounded-lg transition-all duration-300"
            >
              <Menu className="h-5 w-5 text-[#114AB1]" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white border-[#6793AC]/20 font-poppins">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block z-10">
          <MenuItems />
        </div>
        <div className="hidden lg:block z-10">
          <HeaderRightContent />
        </div>
      </div>
      <style>{`
        .wave-1 {
          animation: wave1 6s ease-in-out infinite;
        }
        .wave-2 {
          animation: wave2 8s ease-in-out infinite;
        }
        .wave-3 {
          animation: wave3 10s ease-in-out infinite;
        }
        @keyframes wave1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-100px); }
        }
        @keyframes wave2 {
          0%, 100% { transform: translateX(-50px); }
          50% { transform: translateX(50px); }
        }
        @keyframes wave3 {
          0%, 100% { transform: translateX(-25px); }
          50% { transform: translateX(25px); }
        }
        .wave-effect {
          animation: ripple 6s ease-in-out infinite;
        }
        @keyframes ripple {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
          
      `
      }
      <style>{`
  .wave-1 {
    animation: wave1 6s ease-in-out infinite;
  }
  .wave-2 {
    animation: wave2 8s ease-in-out infinite;
  }
  .wave-3 {
    animation: wave3 10s ease-in-out infinite;
  }
  @keyframes wave1 {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-100px); }
  }
  @keyframes wave2 {
    0%, 100% { transform: translateX(-50px); }
    50% { transform: translateX(50px); }
  }
  @keyframes wave3 {
    0%, 100% { transform: translateX(-25px); }
    50% { transform: translateX(25px); }
  }
  .wave-effect {
    animation: ripple 6s ease-in-out infinite;
  }
  @keyframes ripple {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  .animate-walkup {
    animation: walkup 2s ease-in-out infinite;
  }
  @keyframes walkup {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.1) rotate(5deg); }
  }
`}</style></style>
    </header>
  );
}

export default ShoppingHeader;