import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

export default function Navbar({ toggleSidebar }) {
  return (
    <header className="bg-[#053d57] text-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50">
      <button className="text-blue-800 md:hidden" onClick={toggleSidebar}>
        <MenuOutlined className="text-xl" />
      </button>
      <h2 className="text-xl font-semibold">Welcome, User!</h2>
      <div className="flex items-center space-x-4">
        <Avatar size={40} icon={<UserOutlined />} />
        <span className="font-medium rounded-lg bg-white hover:bg-[#f0f4f8] text-black text-md px-4 py-2 shadow-md">
            Profile
        </span>
      </div>
    </header>
  );
}
