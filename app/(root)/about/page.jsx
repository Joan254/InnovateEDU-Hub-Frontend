import React from 'react';

export default function AboutPage() {
  return (
    <div className="bg-[#f4f8fc] min-h-screen p-8 md:p-16">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-12">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#053d57]">
          About InnovateEDU Hub
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center leading-relaxed">
          InnovateEDU Hub is a standalone, web-based platform designed to enhance 
          research visibility and collaboration within educational institutions. 
          With a focus on streamlining workflows, the platform fosters knowledge-sharing 
          and teamwork, empowering students, educators, and researchers to make meaningful contributions.
        </p>

        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#053d57] text-white rounded-full flex justify-center items-center text-2xl font-semibold">
              1
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#053d57]">
                Research Repository
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The platform provides a centralized repository where users can 
                upload, view, and download research papers across multiple disciplines, 
                promoting academic visibility and easy access to information.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#053d57] text-white rounded-full flex justify-center items-center text-2xl font-semibold">
              2
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#053d57]">
                Research Mentorship
              </h2>
              <p className="text-gray-600 leading-relaxed">
                InnovateEDU Hub bridges the gap between novice and experienced 
                researchers by offering mentorship tools. Users can post their 
                work, receive feedback, and benefit from quality assessments and 
                automated categorization of research areas.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#053d57] text-white rounded-full flex justify-center items-center text-2xl font-semibold">
              3
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#053d57]">
                Collaboration Tools
              </h2>
              <p className="text-gray-600 leading-relaxed">
                InnovateEDU Hub integrates with popular collaboration tools like 
                Trello and Google Workspace, making teamwork seamless. The platform 
                facilitates project tracking, document sharing, and communication 
                within familiar work environments.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-[#053d57] mb-4">
            Join the InnovateEDU Community
          </h3>
          <p className="text-gray-600">
            Whether you’re a student, educator, or researcher, InnovateEDU Hub 
            provides the tools you need to collaborate, learn, and make an impact. 
            Let’s unlock the potential of research, together.
          </p>
        </div>
      </div>
    </div>
  );
}
