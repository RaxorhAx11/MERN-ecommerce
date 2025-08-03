import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

function AuthLayout() {
  return (
    <motion.div
      className="flex min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Left Panel */}
      <motion.div
        className="hidden lg:flex items-center justify-center w-1/2 px-12 relative"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-xl shadow-2xl"></div>
        <motion.div
          className="relative z-10 max-w-md space-y-6 text-center text-white"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl font-bold tracking-tight leading-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Welcome to
            <br />
            <span className="text-pink-400">WalkUp Online Store</span>
          </motion.h1>
          <p className="text-lg text-gray-300">
            Discover the latest trends in fashion, gadgets, and more.
          </p>
        </motion.div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Outlet />
      </motion.div>
    </motion.div>
  );
}

export default AuthLayout;
