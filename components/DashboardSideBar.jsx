import {
  FileTextOutlined,
  LogoutOutlined,
  SolutionOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import Logo from "/public/icons/innovateedu-logo.png";
import logout from "@/utils/logout";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Modal, Button, Alert } from "antd"; // Import Alert component
import fetchUserDetails from "@/utils/fetchUserDetails"; // Import fetchUserDetails

export default function Sidebar({ isSidebarOpen }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Store user details
  const [error, setError] = useState(null); // Store error state

  // Fetch user details on component mount
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userData = await fetchUserDetails();
        if (userData && userData.success !== false) {
          setUser(userData); // Store user data in state
        } else {
          setError("Failed to fetch user details."); // Set error message
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching user details."); // Catch any unexpected errors
      }
    };

    getUserDetails();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className={`bg-[#f0f4f8] text-black w-64 space-y-6 py-7 px-4 absolute inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-200 ease-in-out md:relative md:translate-x-0`}
    >
      <div>
        <h1 className="text-2xl font-semibold text-center mb-8">
          <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={150}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </h1>

        {error && <Alert message={error} type="error" showIcon className="mb-4" />} {/* Show error message */}

        <nav className="space-y-4">
          {(user?.user_type === "researcher" || user?.user_type === "educator") && (
            <a
              href="/dashboard/my_publications"
              className="flex items-center space-x-2 hover:bg-[#053d57] hover:text-white px-4 py-2 rounded transition-colors"
            >
              <FileTextOutlined className="text-lg" /> <span>My Publications</span>
            </a>
          )}
          {(user?.user_type === "student") && (
          <a
            href="/dashboard/mentorship"
            className="flex items-center space-x-2 hover:bg-[#053d57] hover:text-white px-4 py-2 rounded transition-colors"
          >
            <SolutionOutlined className="text-lg" /> <span>Mentorship</span>
          </a>
          )}
          <a
            href="/dashboard/collaboration"
            className="flex items-center space-x-2 hover:bg-[#053d57] hover:text-white px-4 py-2 rounded transition-colors"
          >
            <ProjectOutlined className="text-lg" /> <span>Collaboration</span>
          </a>
          <a
            href="/dashboard/view_publications"
            className="flex items-center space-x-2 hover:bg-[#053d57] hover:text-white px-4 py-2 rounded transition-colors"
          >
            <FileTextOutlined className="text-lg" /> <span>View Publications</span>
          </a>
        </nav>
      </div>

      {/* Logout Section */}
      <footer className="mt-8 border-t pt-6">
        <div
          className="flex items-center space-x-3 cursor-pointer hover:bg-[#053d57] hover:text-white px-4 py-2 rounded transition-colors"
          onClick={openModal}
        >
          <Image src="/icons/logout.svg" width={24} height={24} alt="logout" />
          <span className="text-sm font-semibold">Logout</span>
        </div>

        <Modal
          title="Confirm Logout"
          open={isModalOpen}
          onCancel={closeModal}
          footer={[
            <Button key="cancel" onClick={closeModal}>
              Cancel
            </Button>,
            <Button key="logout" type="primary" onClick={handleLogout}>
              Yes, Logout
            </Button>,
          ]}
        >
          <p>Are you sure you want to logout?</p>
        </Modal>
      </footer>
    </div>
  );
}
