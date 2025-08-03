import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen font-poppins relative overflow-hidden">
      {/* Wave Background */}
      <div className="absolute inset-0">
        <svg className="absolute bottom-0 left-0 w-full h-8" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,60 C360,20 720,80 1080,20 C1260,0 1440,60 1440,60 L1440,60 L0,60 Z" fill="#FFFFFF" fillOpacity="0.3" className="wave-1" />
          <path d="M0,60 C400,40 800,80 1200,40 C1320,20 1440,60 1440,60 L1440,60 L0,60 Z" fill="#FFFFFF" fillOpacity="0.2" className="wave-2" />
        </svg>
      </div>
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full z-10">
        <Outlet />
      </main>
      <style>{`
        .wave-1 { animation: wave1 6s ease-in-out infinite; }
        .wave-2 { animation: wave2 8s ease-in-out infinite; }
        @keyframes wave1 {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-100px); }
        }
        @keyframes wave2 {
          0%, 100% { transform: translateX(-50px); }
          50% { transform: translateX(50px); }
        }
      `}</style>
    </div>
  );
}

export default ShoppingLayout;