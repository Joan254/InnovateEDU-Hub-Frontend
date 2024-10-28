"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios"; // For API requests

export default function MyPublications() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Ant Design form instance
  const [publications, setPublications] = useState([]); // Store fetched publications

  // Modal handlers
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    form.resetFields(); // Clear form on cancel
    setIsModalVisible(false);
  };

  // Fetch publications from backend
  const fetchPublications = async () => {
    try {
      const response = await axios.get("/api/publications");
      setPublications(response.data);
    } catch (error) {
      message.error("Failed to load publications.");
      console.error("Error fetching publications:", error);
    }
  };

  // Handle form submission
  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form fields

      // Prepare the payload as JSON
      const payload = {
        ...values,
        file_path: values.file_path[0]?.name, // Store only the file name
        license_image: values.license_image[0]?.name, // Store only the file name
      };

      // Send JSON data to the backend
      await axios.post("/api/publications", payload, {
        headers: { "Content-Type": "application/json" },
      });

      message.success("Research paper added successfully!");

      // Refresh publications list and close modal
      fetchPublications();
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to add research paper.");
      console.error("Error submitting form:", error);
    }
  };

  // Fetch publications on component mount
  useEffect(() => {
    fetchPublications();
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <Button
          type="primary"
          className="bg-[#053d57] hover:bg-blue-600"
          onClick={showModal}
        >
          Add New Research Paper
        </Button>
        <Input.Search
          placeholder="Search"
          allowClear
          className="w-1/3"
          enterButton
        />
      </div>

      {/* Publications List */}
      <div className="space-y-8">
        {publications.map((pub, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-lg font-semibold text-blue-800 hover:underline cursor-pointer">
              {pub.title}
            </h2>
            <p className="text-gray-600 text-sm">{pub.author}</p>
            <p className="text-gray-800 text-sm mb-2">{pub.abstract}</p>
            <div className="flex space-x-4 text-blue-600 text-sm">
              <a href="#">Save</a>
              <a href="#">Download</a>
              <a href="#">Related articles</a>
              <a href="#">All {pub.versions} versions</a>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Research Paper Modal */}
      <Modal
        title="Add New Research Paper"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input maxLength={255} />
          </Form.Item>

          <Form.Item
            label="Field"
            name="field"
            rules={[{ required: true, message: "Please enter the field" }]}
          >
            <Input maxLength={100} />
          </Form.Item>

          <Form.Item
            label="Abstract"
            name="abstract"
            rules={[{ required: true, message: "Please enter the abstract" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please enter the author" }]}
          >
            <Input maxLength={255} />
          </Form.Item>

          <Form.Item label="Other Authors" name="other_authors">
            <Input maxLength={255} />
          </Form.Item>

          <Form.Item
            label="File Upload"
            name="file_path"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              { required: true, message: "Please upload your research paper document" },
            ]}
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="License Image"
            name="license_image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
