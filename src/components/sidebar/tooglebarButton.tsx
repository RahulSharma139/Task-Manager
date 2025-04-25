import React from "react";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";


interface ToggleBarButtonProps {
  barWidth: boolean;
  setBarWidth: (value: boolean) => void;
}

const ToggleBarButton: React.FC<ToggleBarButtonProps> = ({ barWidth, setBarWidth }) => {
  return (
    <>
      <div className="absolute top-0 right-0 border-green-600 border-r-2 w-0.5 h-full" />
      <button
        className="absolute top-10 -right-3 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center"
        onClick={() => setBarWidth(!barWidth)}
      >
        {barWidth ? (
          <MdKeyboardDoubleArrowLeft className="text-white" />
        ) : (
          <MdKeyboardDoubleArrowRight className="text-white" />
        )}
      </button>
    </>
  );
};

export default ToggleBarButton;
