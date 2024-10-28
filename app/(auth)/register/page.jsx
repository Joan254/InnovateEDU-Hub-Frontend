"use client";
import React, { useState } from 'react';
import { Button, Input, Form, Select, message } from 'antd';
import countryList from 'react-select-country-list';

const { Option } = Select;

const Register = () => {
  const [userType, setUserType] = useState('researcher'); // Default to "researcher"
  const [countryCode, setCountryCode] = useState(''); // State to hold selected country code
  const [phoneNumber, setPhoneNumber] = useState(''); // State to hold phone number
  const countries = countryList().getData(); // List of all countries

  // Handle user type change
  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  // Handle country change
  const handleCountryChange = (value) => {
    setCountryCode(value); // Set the selected country code
  };

  // Function to get the flag URL for a given country code
  const getFlagUrl = (country) => {
    return `https://flagcdn.com/w320/${country.value.toLowerCase()}.png`; // Adjust the URL as necessary
  };

  // Function to handle form submission
  const onFinish = async (values) => {
    try {
      // Prepare data to send to the backend
      const data = {
        first_name: values.first_name,
        last_name: values.last_name,
        personal_email: values.personal_email,
        work_email: userType !== 'student' ? values.work_email : null,
        country: countryCode,
        phone_number: `${countryCode} ${phoneNumber}`, // Combine country code with phone number
        institution: values.institution,
        password: values.password,
      };

      const response = await fetch('http://127.0.0.1:8000/api/accounts/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ /* your registration data here */ }),
    });
    
      // Handle the response from the backend
      if (response.ok) {
        const result = await response.json();
        message.success(result.message); // Display success message
        // Optionally redirect to another page or reset form
      } else {
        const errorResult = await response.json();
        message.error(errorResult.message); // Display error message
      }
    } catch (error) {
      message.error('An error occurred. Please try again.'); // Handle network errors
    }
  };

  return (
    <div className="min-h-screen flex bg-[#053d57] items-center justify-center">
      {/* Left Section */}
      <div className="w-1/3 flex flex-col items-center justify-center p-8 text-white">
        {/* Logo */}
        <div className="mb-6">
          {/* <img src="/path/to/your/logo.png" alt="InnovateEDU Logo" className="w-20 h-20" /> */}
        </div>
        
        {/* Text Structure */}
        <div className="text-lg mb-2">Welcome</div>
        <div className="text-3xl font-bold mb-4">InnovateEDU Hub</div>
        <p className="text-md mb-8 text-center">Driving Collaborative Innovation for the Future of Research and Learning</p>
        
        {/* Bigger Sign In Button */}
        <Button
          href="/login"
          className="bg-[#dadada] text-black px-16 py-4 rounded-full text-lg hover:bg-gray-300 transition duration-300"
        >
          Sign In
        </Button>
      </div>

      {/* Right Section */}
      <div
        className="relative w-2/3 bg-[#dadada] p-6 m-8 rounded-r-lg"
        style={{ borderTopLeftRadius: '10rem', borderBottomLeftRadius: '10rem' }}
      >
        {/* Sign Up Header and User Type Selector */}
        <div className="flex items-center mb-4 ml-4">
          <h2 className="text-3xl font-bold text-[#053d57] mr-4 ml-40">Sign Up</h2>
          <div className="flex space-x-2 bg-[#053d57] p-1 rounded-full ml-auto">
            {['researcher', 'educator', 'student'].map((type) => (
              <button
                key={type}
                onClick={() => handleUserTypeChange(type)}
                className={`px-3 py-1 text-sm rounded-full transition-colors duration-300 ${userType === type ? 'bg-[#dadada] text-black' : 'text-white'}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <Form layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-2 gap-1">
            {/* Shared Fields */}
            <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please enter your first name!' }]} style={{ marginBottom: '10px' }}>
              <Input placeholder="Enter your first name" />
            </Form.Item>
            <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please enter your last name!' }]} style={{ marginBottom: '10px' }}>
              <Input placeholder="Enter your last name" />
            </Form.Item>
            <Form.Item label="Personal Email" name="personal_email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]} style={{ marginBottom: '10px' }}>
              <Input placeholder="Enter your personal email" type="email" />
            </Form.Item>
            {userType !== 'student' && (
              <Form.Item label="Work Email" name="work_email" rules={[{ required: true, type: 'email', message: 'Please enter a valid work email!' }]} style={{ marginBottom: '10px' }}>
                <Input placeholder="Enter your work email" type="email" />
              </Form.Item>
            )}
            {/* Country Selection */}
            <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please select your country!' }]} style={{ marginBottom: '10px' }}>
              <Select
                placeholder="Select your country"
                options={countries}
                onChange={handleCountryChange}
                value={countryCode}
              >
                {countries.map((country) => (
                  <Option key={country.value} value={country.value}>
                    <div className="flex items-center">
                      <img src={getFlagUrl(country)} alt={`${country.label} flag`} className="w-5 h-5 mr-2" />
                      <span>{country.label}</span> {/* Country Name */}
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Phone Number Fields */}
            <Form.Item label="Phone Number" style={{ marginBottom: '10px' }}>
              <div className="flex items-center">
                <Select
                  value={countryCode}
                  onChange={handleCountryChange}
                  style={{ width: '30%', marginRight: '10px' }} // Width of the country code selector
                  placeholder="Country"
                >
                  {countries.map((country) => (
                    <Option key={country.value} value={country.value}>
                      <div className="flex items-center">
                        <img src={getFlagUrl(country)} alt={`${country.label} flag`} className="w-5 h-5 mr-2" />
                        <span>{country.label}</span> {/* Country Name */}
                      </div>
                    </Option>
                  ))}
                </Select>
                <Input
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)} // Handles phone number changes
                  style={{ width: '70%' }} // Width of the phone number input
                />
              </div>
            </Form.Item>

            <Form.Item label="Institution" name="institution" rules={[{ required: true, message: 'Please enter your institution!' }]} style={{ marginBottom: '10px' }}>
              <Input placeholder="Enter your institution" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password!' }]} style={{ marginBottom: '10px' }}>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirm_password" rules={[{ required: true, message: 'Please confirm your password!' }]} style={{ marginBottom: '10px' }}>
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
          </div>

          {/* Register Button */}
          <Form.Item className="text-center">
            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-3/4" 
              style={{ backgroundColor: '#053d57', borderColor: '#053d57' }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
