import React, { ReactNode } from "react";
import Sidebar from "../sidebar/SideBar";



interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  return (
    <div>
      <div >
        <Sidebar/> 
      </div>
      <div >
       
        {children}
      
      </div>
    </div>
  );
};

export default Layout;
