import React, { useEffect, useState } from "react";
import "./Loader.css";

const Loader = () => {
  const [mounted, setMounted] = useState(false);

  // Ensure rendering only happens after the component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid rendering on the server
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
