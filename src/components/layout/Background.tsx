import React from "react";

const Background = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex h-full w-full items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Background;
