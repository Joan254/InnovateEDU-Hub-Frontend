"use client";

import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const NavBar = () => {
  const researchHubMenuItems = [
    { key: '1', label: <a href="/dashboard/mentorship">Research Mentorship</a> },
    { key: '2', label: <a href="/dashboard/collaboration">Research Collaboration</a> },
    { key: '3', label: <a href="/dashboard/my_publications">Research Repository</a> },
  ];

  const handleSignIn = () => {
    history.push('/login');
  };

  return (
    <nav className="bg-[#053d57] flex justify-between items-center p-4 mb-6 mt-8 px-8">
      <div className="text-white text-2xl font-bold">InnovateEDU</div>
      <ul className="flex space-x-6 text-white">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li>
          <Dropdown menu={{ items: researchHubMenuItems }}>
            <a href="#" className="ant-dropdown-link">
              Research Hub <DownOutlined />
            </a>
          </Dropdown>
        </li>
      </ul>
      <Button href="/login" className="rounded-full bg-gray-300 border-none">
        Sign In
      </Button>
    </nav>
  );
};
