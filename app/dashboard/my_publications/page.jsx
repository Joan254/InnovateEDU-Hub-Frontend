"use client";
import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Form, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import fetchUserDetails from "@/utils/fetchUserDetails";

export default function MyPublications() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false); // Modal for viewing details
  const [isRelatedArticlesVisible, setIsRelatedArticlesVisible] = useState(false); // Modal for related articles
  const [form] = Form.useForm();
  const [publications, setPublications] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]); // State to hold related articles
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null); // Store selected publication
  const [userId, setUserId] = useState(null); // State to hold user ID

  // Show modal for adding new research paper
  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

   // Fetch user details to get user ID
   const getUserDetails = async () => {
    try {
      const userDetails = await fetchUserDetails(); // Assuming this function returns user details
      setUserId(userDetails.id); // Set the user ID from the fetched details
    } catch (error) {
      message.error("Failed to fetch user details.");
      console.error("Error fetching user details:", error);
    }
  };

  // Fetch publications from backend using user ID
  const fetchPublications = async () => {
    // if (!userId) return; // Ensure userId is available
    // setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/publications/`);
      setPublications(response.data);
    } catch (error) {
      message.error("Failed to load publications.");
      console.error("Error fetching publications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open detail modal when a title is clicked
  const handleTitleClick = (publication) => {
    setSelectedPublication(publication);
    setIsDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setSelectedPublication(null);
    setIsDetailModalVisible(false);
  };

  // Fetch related articles
  const fetchRelatedArticles = async (publicationId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/publications/related/${publicationId}/`);
      setRelatedArticles(response.data.related_articles);
      setIsRelatedArticlesVisible(true);
    } catch (error) {
      message.error("Failed to fetch related articles.");
      console.error("Error fetching related articles:", error);
    }
  };

  // Handle form submission
  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("field", values.field);
      formData.append("abstract", values.abstract);
      formData.append("author", values.author);
      formData.append("other_authors", values.other_authors);
      formData.append("file_path", values.file_path[0]?.originFileObj);

      if (values.license_image && values.license_image.length > 0) {
        formData.append("license_image", values.license_image[0]?.originFileObj);
      }
      formData.append("versions", values.versions || 1);

      setSubmitting(true);
      await axios.post("http://127.0.0.1:8000/api/publications/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Research paper added successfully!");
      fetchPublications();
      handleCancel();
    } catch (error) {
      message.error("Failed to add research paper.");
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };

   // Fetch user details and publications on component mount
   useEffect(() => {
    getUserDetails(); // Fetch user details first
  }, []);

  useEffect(() => {
    fetchPublications(); // Fetch publications whenever userId changes
  }, []);

  const downloadDocument = async (id, title) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/publications/download/${id}/`, {
            responseType: 'blob',  // Important to ensure the response is treated as a file
        });

        // Create a link element to download the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        // Use the title for the filename and ensure to format it
        const formattedTitle = title.replace(/[^a-z0-9]/gi, '_').toLowerCase(); // Replace spaces/special chars with underscores
        const filename = `${formattedTitle}.pdf`; // Append .pdf extension

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading the document:', error);
    }
};

  return (
    <div className="p-8 bg-white min-h-screen">
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

      <Spin spinning={loading} tip="Loading publications...">
      <div className="space-y-8">
        {publications.length === 0 ? (
          <p>No publications available.</p>
        ) : (
          publications.map((pub, index) => (
            <div key={index} className="border-b pb-4">
              <h2
                className="text-lg font-semibold text-blue-800 hover:underline cursor-pointer"
                onClick={() => handleTitleClick(pub)}
              >
                {pub.title}
              </h2>
              <p className="text-gray-600 text-sm">{pub.author}</p>
              <p className="text-gray-800 text-sm mb-2">{pub.abstract}</p>
              <div className="flex space-x-4 text-blue-600 text-sm">
                <a href="#" onClick={() => downloadDocument(pub.id, pub.title)}>Download</a>
                <a href="#" onClick={() => fetchRelatedArticles(pub.id)}>Related articles</a>
                <a href="#">All {pub.versions} versions</a>
              </div>
            </div>
          ))
        )}
      </div>
    </Spin>

      {/* Add New Research Paper Modal */}
      <Modal
        title="Add New Research Paper"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={submitting ? "Submitting..." : "Submit"}
        cancelText="Cancel"
        confirmLoading={submitting}
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
              { required: true, message: "Please upload your research paper" },
            ]}
          >
            <Upload beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Research Paper Details Modal */}
      {selectedPublication && (
        <Modal
          title={selectedPublication.title}
          open={isDetailModalVisible}
          onCancel={closeDetailModal}
          footer={null}
        >
          <p><strong>Author:</strong> {selectedPublication.author}</p>
          <p><strong>Abstract:</strong> {selectedPublication.abstract}</p>
          <p><strong>Field:</strong> {selectedPublication.field}</p>
          <a
            href={`http://127.0.0.1:8000${selectedPublication.file_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Document
          </a>
        </Modal>
      )}
      {/* Related Articles Modal */}
      <Modal
        title="Related Articles"
        open={isRelatedArticlesVisible}
        onCancel={() => setIsRelatedArticlesVisible(false)}
        footer={null}
      >
        {relatedArticles.length > 0 ? (
          <ul>
            {relatedArticles.map((article, index) => (
              <li key={index}>
                <a href="#" onClick={() => downloadDocument(article.id, article.title)}>
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No related articles found.</p>
        )}
      </Modal>
    </div>
  );
}
