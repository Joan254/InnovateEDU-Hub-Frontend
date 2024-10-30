"use client"; // If using Next.js, to indicate a client-side component

import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Form, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

export default function AllPublicationsPage() {
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false); // Modal for viewing details
  const [isRelatedArticlesVisible, setIsRelatedArticlesVisible] = useState(false); // Modal for related articles
  const [form] = Form.useForm();
  const [publications, setPublications] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]); // State to hold related articles
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null); // Store selected publication

  // Fetch publications from backend
  const fetchPublications = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/publications/");
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

  // Download the publication document
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

  useEffect(() => {
    fetchPublications();
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">All Publications</h1>
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
