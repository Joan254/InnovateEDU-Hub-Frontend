"use client";

import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const NavBar = () => {
  
  const researchHubMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href="#">Research Mentorship</a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="#">Research Collaboration</a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="#">Research Repository</a>
      </Menu.Item>
    </Menu>
  );

  const handleSignIn = () => {
    history.push('/login');
  };

  return (
    <nav className="bg-[#053d57] flex justify-between items-center p-4 mb-6 mt-8 px-8">
      <div className="text-white text-2xl font-bold">InnovateEDU</div>
      <ul className="flex space-x-6 text-white">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li>
          <Dropdown overlay={researchHubMenu}>
            <a href="#" className="ant-dropdown-link">
              Research Hub <DownOutlined />
            </a>
          </Dropdown>
        </li>
      </ul>
      <Button href="/register" className="rounded-full bg-gray-300 border-none">
    Sign In
    </Button>
    </nav>
  );
};