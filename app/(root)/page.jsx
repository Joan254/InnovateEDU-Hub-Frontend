"use client"; // Ensures this component is rendered on the client side

import { Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Article1 from '/public/images/pic-article-01.jpg';
import Article2 from '/public/images/pic-article-02.jpg';

export default function MainContent() {
  const [publications, setPublications] = useState([]); // State to hold publications data

  // Sample placeholder publications data
  const placeholderPublications = [
    {
      id: 1,
      title: "Exploring the Future of AI in Education",
      author: "Alice Johnson",
      year: "2024",
      source: "Journal of Education",
      description: "This article discusses the impact of AI technologies on educational methods and student engagement.",
    },
    {
      id: 2,
      title: "Sustainable Practices in Modern Research",
      author: "Bob Smith",
      year: "2023",
      source: "Research & Innovation",
      description: "An overview of sustainable methodologies being adopted in research practices across various fields.",
    },
    {
      id: 3,
      title: "The Role of Data Analytics in Learning Outcomes",
      author: "Charlie Brown",
      year: "2022",
      source: "Educational Technology",
      description: "A study on how data analytics can enhance the learning experience and outcomes for students.",
    },
    {
      id: 4,
      title: "Innovations in Online Learning",
      author: "Diana Green",
      year: "2021",
      source: "E-Learning Journal",
      description: "Exploring new technologies and their role in shaping the future of online education.",
    },
    {
      id: 5,
      title: "Blockchain Technology in Education",
      author: "Ethan White",
      year: "2020",
      source: "Journal of Tech Innovations",
      description: "This paper examines how blockchain can secure student records and enhance learning.",
    },
  ];

  // Filter options for "Sort by Field" dropdown
  const fieldMenu = (
    <Menu>
      <Menu.Item key="1">Technology & Engineering</Menu.Item>
      <Menu.Item key="2">Science & Environment</Menu.Item>
      <Menu.Item key="3">Health & Medicine</Menu.Item>
      <Menu.Item key="4">Data & Analytics</Menu.Item>
      <Menu.Item key="5">Social Sciences & Humanities</Menu.Item>
    </Menu>
  );

  // Filter options for "Any time" dropdown
  const timeMenu = (
    <Menu>
      <Menu.Item key="1">Since 2024</Menu.Item>
      <Menu.Item key="2">Since 2023</Menu.Item>
      <Menu.Item key="3">Since 2020</Menu.Item>
    </Menu>
  );

  return (
    <div className="mt-8 px-4 md:px-8"> {/* Adjusted padding for smaller screens */}
      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Section: Industry Insights */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xl font-bold mb-4">Industry Insights</h3>
          {/* Article structure */}
          <div className="space-y-8">
            <div>
            <Image
                src={Article1}
                alt="Article1 Image"
                className="w-full h-auto"
                width={150}
                height={150}
                priority
            />
              <h4 className="text-lg font-semibold mt-2">Title of Article</h4>
              <p className="text-sm text-gray-500">By John Doe</p>
              <p className="text-sm">
                Introduction to the article... <a href="#" className="text-blue-500">Read more</a>
              </p>
            </div>
            <div>
            <Image
                src={Article2}
                alt="Article2 Image"
                className="w-full h-auto"
                width={150}
                height={150}
                priority
            />
              <h4 className="text-lg font-semibold mt-2">Title of Article2</h4>
              <p className="text-sm text-gray-500">By Joan Otieno</p>
              <p className="text-sm">
                Introduction to the article2... <a href="#" className="text-blue-500">Read more</a>
              </p>
            </div>
            {/* Add more articles as needed */}
          </div>
        </div>

        {/* Center Section: InnovateEDU Hub Title, Punchline, and Publications */}
        <div className="w-full md:w-1/2 bg-[#053d57] text-white p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">InnovateEDU Hub</h1>
          <p className="text-lg mb-8">Driving collaborative innovation for the future of research and learning</p>

          {/* Publications Section */}
          <div className="mb-8">
            <h3 className="text-2xl mb-4">Publications</h3>

            {/* Filtering Options */}
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <Dropdown overlay={fieldMenu}>
                <Button>Sort by Field <DownOutlined /></Button>
              </Dropdown>

              <Dropdown overlay={timeMenu}>
                <Button>Any time <DownOutlined /></Button>
              </Dropdown>

              <Button>Sort by date</Button>
            </div>

            {/* Scrollable Publications List */}
            <div className="overflow-y-auto max-h-64"> {/* Max height for scrolling */}
              {placeholderPublications.slice(0, 3).map(pub => ( // Display only the first 3 publications
                <div key={pub.id} className="bg-white text-black p-4 mb-4 rounded-lg">
                  <h4 className="text-lg font-semibold">{pub.title}</h4>
                  <p>{pub.author} - {pub.year} - {pub.source}</p>
                  <p>{pub.description}</p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-500">Save</a>
                    <a href="#" className="text-blue-500">Download</a>
                    <a href="#" className="text-blue-500">Related articles</a>
                    <a href="#" className="text-blue-500">All versions</a>
                  </div>
                </div>
              ))}
            </div>
            {/* Scrollable notice if there are more publications */}
            {placeholderPublications.length > 3 && (
              <p className="text-white mt-2">Scroll down for more publications...</p>
            )}
          </div>
        </div>

        {/* Right Section: Collaboration */}
        <div className="w-full md:w-1/4">
          <div
            className="bg-cover bg-center h-32 flex items-center justify-center text-white text-lg rounded-lg"
            style={{ backgroundImage: 'url("https://via.placeholder.com/300")' }}
          >
            Collaborate with Other Researchers
          </div>
          <Button className="w-full mt-4 bg-gray-300">Research Mentorship</Button>
          <p className="text-gray-600 mb-4">Find experienced mentors who can guide you through your research journey.</p>
          <Button className="w-full mt-4 bg-gray-300">Research Collaboration</Button>
          <p className="text-gray-600 mb-4">Join a community of researchers and educators working together to improve educational outcomes.</p>
          <Button className="w-full mt-4 bg-gray-300">Research Repository</Button>
          <p className="text-gray-600">Access valuable resources and connect with like-minded individuals in our research hub.</p>
        </div>
      </div>
    </div>
  );
}