import {
    FileTextOutlined,
    UserOutlined,
    LogoutOutlined,
    SolutionOutlined,
    ProjectOutlined,
  } from "@ant-design/icons";
  import Image from "next/image";
//   import Logo from '/public/icons/logo-black-transparent.png';
  
  export default function Sidebar({ isSidebarOpen }) {
    return (
      <div
        className={`bg-[#f0f4f8] text-black w-64 space-y-6 py-7 px-4 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
      >
        <h1 className="text-2xl font-semibold text-center mb-8">
         {/* <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={150}
            style={{ width: 'auto', height: 'auto' }}
            priority
          /> */}
        </h1>
        <h2 className="text-xl font-semibold">InnovateEDU Hub</h2>
        <nav className="space-y-4">
          <a
              href="/dashboard/my_publications"
              className="flex items-center space-x-2 hover:bg-[#053d57] px-4 py-2 rounded"
            >
              <FileTextOutlined className="text-lg" /> <span>My Publications</span>
          </a>
          <a
            href="/dashboard/mentorship"
            className="flex items-center space-x-2 hover:bg-[#053d57] px-4 py-2 rounded"
          >
            <SolutionOutlined className="text-lg" /> <span>Mentorship</span>
          </a>
          <a
            href="/dashboard/collaboration"
            className="flex items-center space-x-2 hover:bg-[#053d57] px-4 py-2 rounded"
          >
            <ProjectOutlined className="text-lg" /> <span>Collaboration</span>
          </a>
          <a
            href="/logout"
            className="flex items-center space-x-2 hover:bg-[#053d57] px-4 py-2 rounded"
          >
            <LogoutOutlined className="text-lg" /> <span>Logout</span>
          </a>
        </nav>
      </div>
    );
  }
  