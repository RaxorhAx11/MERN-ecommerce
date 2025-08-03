import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PackageIcon, ShoppingBagIcon, UsersIcon, SettingsIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Animation variants for text and cards
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
  }),
};

function AdminDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    { label: "Manage Products", path: "/admin/products", icon: <PackageIcon className="w-6 h-6" /> },
    { label: "View Orders", path: "/admin/orders", icon: <ShoppingBagIcon className="w-6 h-6" /> },
    { label: "Manage Users", path: "/admin/users", icon: <UsersIcon className="w-6 h-6" /> },
    { label: "Settings", path: "/admin/settings", icon: <SettingsIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6793AC]/20 to-[#E4580B]/20 flex flex-col items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#114AB1]/10 to-[#E4580B]/10 animate-pulse" />

      {/* Animated Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#114AB1] to-[#E4580B] mb-8"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Admin Panel
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        className="text-lg text-gray-600 mb-12 text-center max-w-2xl"
        variants={textVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3 }}
      >
        Welcome to your admin dashboard! Manage your e-commerce platform with ease.
      </motion.p>

      {/* Animated Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.label}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card
              className="bg-white/80 backdrop-blur-sm border-[#6793AC]/20 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(action.path)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#114AB1]">
                  {action.icon}
                  {action.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-[#114AB1] hover:bg-[#114AB1]/90 text-white"
                  onClick={() => navigate(action.path)}
                >
                  Go to {action.label}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;