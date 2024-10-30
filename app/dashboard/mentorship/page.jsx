"use client";

import { useState } from "react";

export default function Upload() {
    const [title, setTitle] = useState("");
    const [field, setField] = useState("");
    const [abstract, setAbstract] = useState("");
    const [authors, setAuthors] = useState("");
    const [file, setFile] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("field", field);
            formData.append("abstract", abstract);
            formData.append("authors", authors);
            if (file) formData.append("file", file);

            // Document upload request to Django backend
            const uploadResponse = await fetch("http://localhost:8000/api/mentor/upload/", {
                method: "POST",
                body: formData,
            });

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                console.error('Upload error response:', errorData);
                throw new Error(errorData.error || "Failed to upload document");
            }

            const uploadData = await uploadResponse.json();
            // setFeedback({ ...uploadData, recommendations: uploadData.recommendations || {} });
            setFeedback({
              recommendations: uploadData.recommendations || {},
              quality_score: uploadData.quality_score || null,
          });
        } catch (error) {
            console.error("Error during upload:", error);
            setFeedback({ error: "An error occurred during upload. Please try again." });
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Mentorship</h1>
            <form onSubmit={handleUpload} className="space-y-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Document Title"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    value={field}
                    onChange={(e) => setField(e.target.value)}
                    placeholder="Field"
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Abstract"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                    placeholder="Authors"
                    className="w-full p-2 border rounded"
                    required
                />
                <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Upload
                </button>
            </form>

            {feedback && feedback.quality_score !== null && (
                            <div className="mt-4">
                                <h3 className="text-lg font-medium">Quality Score:</h3>
                                <p>{feedback.quality_score}</p>
                            </div>
                        )}

            {feedback && feedback.recommendations && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Recommendations:</h3>
                    <ul>
                        {Object.entries(feedback.recommendations).map(([section, rec], idx) => (
                            <li key={idx}><strong>{section}:</strong> {rec}</li>
                        ))}
                    </ul>
                </div>
            )}

            

            {feedback && feedback.error && (
                <div className="mt-4 text-red-500">
                    <p>{feedback.error}</p>
                </div>
            )}
        </div>
    );
}
