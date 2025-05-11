
import React from "react";

const LogoIcon = ({ className = "w-6 h-6" }) => {
  return (
    <div className={`bg-[#1a2b3d] text-white font-bold flex items-center justify-center rounded-sm ${className}`}>
          <img
            src="/lovable-uploads/Images/Logo.svg"
            alt="Logo"/>
        </div>
  );
};

export default LogoIcon;
