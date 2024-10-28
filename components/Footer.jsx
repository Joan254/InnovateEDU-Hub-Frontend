import React from 'react';
import { FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

export const Footer = () => {
  return (
    <footer className="bg-[#053d57] text-white text-center py-6 mt-8">
      {/* Footer Links */}
      <ul className="flex justify-center space-x-8 mb-4">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">About</a></li>
        <li><a href="#" className="hover:underline">Research Hub</a></li>
        <li><a href="#" className="hover:underline">Contact Us</a></li>
      </ul>

      {/* Social Media Links */}
      <div className="mb-4 flex justify-center space-x-6">
        <a href="https://www.linkedin.com" className="hover:text-gray-400">
          <LinkedinOutlined style={{ fontSize: '24px' }} />
        </a>
        <a href="https://www.twitter.com" className="hover:text-gray-400">
          <TwitterOutlined style={{ fontSize: '24px' }} />
        </a>
        <a href="https://www.facebook.com" className="hover:text-gray-400">
          <FacebookOutlined style={{ fontSize: '24px' }} />
        </a>
      </div>

      {/* Copyright Information */}
      <p className="text-sm">
        &copy; 2024 InnovateEDU Hub. All rights reserved.
      </p>
    </footer>
  );
};