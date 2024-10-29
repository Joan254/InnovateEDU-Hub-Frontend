"use client"
import React from "react";
import { Button, Card, Col, Row } from "antd";
import { UserOutlined, BookOutlined, TeamOutlined } from "@ant-design/icons";

const HomePage = () => {
  return (
    <div className="bg-[#f5f7fa] min-h-screen p-8">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#053d57]">Welcome to InnovateEDU Hub Portal</h1>
        <p className="text-lg mt-4 text-gray-600">
          Enhance visibility and accessibility of academic research while fostering collaboration among researchers, students, and mentors.
        </p>
      </header>

      {/* Feature Section */}
      <Row gutter={[16, 16]} className="mb-12">
        <Col xs={24} sm={12} md={8}>
          <Card hoverable className="text-center">
            <BookOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            <h3 className="mt-4 font-bold text-xl">Access Research Materials</h3>
            <p className="text-gray-600 mt-2">
              Explore a rich repository of academic papers and resources.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable className="text-center">
            <TeamOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
            <h3 className="mt-4 font-bold text-xl">Collaborate with Experts</h3>
            <p className="text-gray-600 mt-2">
              Work on projects with students, researchers, and mentors.
            </p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable className="text-center">
            <UserOutlined style={{ fontSize: '48px', color: '#faad14' }} />
            <h3 className="mt-4 font-bold text-xl">Get Research Mentorship</h3>
            <p className="text-gray-600 mt-2">
              Connect with experienced mentors to guide your academic journey.
            </p>
          </Card>
        </Col>
      </Row>

      {/* Stats Section */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h2 className="text-2xl font-bold text-center mb-6">Our Impact</h2>
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={12} md={6} className="text-center">
            <h3 className="text-3xl font-bold text-[#053d57]">5K+</h3>
            <p className="text-gray-600">Research Papers</p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <h3 className="text-3xl font-bold text-[#053d57]">1K+</h3>
            <p className="text-gray-600">Mentors & Collaborators</p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <h3 className="text-3xl font-bold text-[#053d57]">500+</h3>
            <p className="text-gray-600">Projects Completed</p>
          </Col>
          <Col xs={12} md={6} className="text-center">
            <h3 className="text-3xl font-bold text-[#053d57]">100+</h3>
            <p className="text-gray-600">Institutions Partnered</p>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
