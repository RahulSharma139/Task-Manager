import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed: useRouter should be from 'react-router-dom'
import { useAuth } from "../context/authContext";
import ToggleBarButton from "./tooglebarButton";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { ImJoomla } from "react-icons/im";
import { SiTask } from "react-icons/si";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [tooltip, setTooltip] = useState<string | null>(null);
  const { barWidth, setBarWidth, setPageTitle } = useAuth();
  const navigate = useNavigate();
  const toggleBar = barWidth ? "w-[250px]" : "w-[50px]";

  const handleLogout = (): void => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-0 left-0 ${toggleBar} h-full bg-gray-900 transition-all duration-300 ease-linear`}
    >
      <div className="relative z-0 h-full p-3">
        {window.innerWidth > 768 && (
          <ToggleBarButton barWidth={barWidth} setBarWidth={setBarWidth} />
        )}

        {barWidth ? (
          <>
            <Link to={"/"}>
              <ImJoomla className="mx-auto text-green-600 text-6xl mt-5 animate-ease-spin" />
            </Link>
            <ul className="mt-10">
              <Link
                onClick={() => {
                  setPageTitle("Users");
                }}
                to={"/taskmanager/users"}
              >
                <li className="border-b-2 border-gray-50 px-2 py-3 uppercase flex items-center justify-start gap-5">
                  <CgProfile className="text-white text-3xl" />
                  <p className="text-white font-bold">Users</p>
                </li>
              </Link>
            </ul>
          </>
        ) : (
          <>
            <Link to={"/"}>
              <ImJoomla className="mx-auto text-green-600 text-2xl mt-5 animate-ease-spin" />
            </Link>
            <ul className="mt-10">
              <li className="relative border-b-2 border-gray-50 py-3 uppercase flex items-center justify-center gap-5">
                <div onClick={() => setTooltip("users")}>
                  <CgProfile className="text-white text-3xl" />
                </div>

                {/* {tooltip === "users" && (
                  <div className="absolute -right-5 translate-x-full mt-2 w-32 text-center bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Link
                        onClick={() => {
                          setPageTitle("Users");
                          setTooltip(null);
                        }}
                        to={"/taskmanager/users"}
                      >
                      </Link>
                    </div>
                  </div>
                )} */}
              </li>
            </ul>
          </>
        )}
        {barWidth ? (
          <>
            <ul className="mt-10">
              <Link
                className="transform transition-all duration-300 ease-out scale-95 animate-fade-in"
                onClick={() => {
                  setPageTitle("Task");
                }}
                to={"/taskmanager/task"}
              >
                <li className="border-b-2 border-gray-50 px-2 py-3 uppercase flex items-center justify-start gap-5">
                  <SiTask className="text-white text-3xl" />
                  <p className="text-white font-bold">Task</p>
                </li>
              </Link>
            </ul>
          </>
        ) : (
          <>
            <ul className="mt-10">
              <Link to={"/taskmanager/task"}>
                <li className="relative border-b-2 border-gray-50 py-3 uppercase flex items-center justify-center gap-5">
                  <div onClick={() => setTooltip("task")}>
                    <SiTask className="text-white text-3xl" />
                  </div>

                  {/* {tooltip === "task" && (
                  <div className="absolute -right-5 translate-x-full mt-2 w-32 ">
                  <div className="py-1">
                  <Link
                  onClick={() => {
                    setPageTitle("task");
                    setTooltip(null);
                    }}
                    to={"/taskmanager/task"}
                    >
                    </Link>
                    </div>
                    </div>
                    )} */}
                </li>
              </Link>
            </ul>
          </>
        )}

        <div className="absolute bottom-0 left-0 p-3 w-full">
          <button
            className={`flex items-center justify-center gap-2 w-full ${
              barWidth ? "bg-red-500 py-2 px-3 rounded text-white" : ""
            }`}
            onClick={handleLogout}
          >
            <FiLogOut className="text-white text-3xl" />
            <p className={`${barWidth ? "block" : "hidden"}`}>Logout</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
