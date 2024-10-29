'use client'
import React, { useState } from 'react';
import { Button, Input, Form, Select, message } from 'antd';
import countryList from 'react-select-country-list';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const { Option } = Select;

const Register = () => {
  const [userType, setUserType] = useState('researcher'); // Default user type
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const countries = countryList().getData();
  const router = useRouter();
  


  const handleUserTypeChange = (type) => setUserType(type); // Update user type
  const handleCountryChange = (value) => setCountryCode(value);

  const getFlagUrl = (country) => `https://flagcdn.com/w320/${country.value.toLowerCase()}.png`;

  const onFinish = async (values) => {
    if (values.password !== values.confirm_password) {
        message.error('Passwords do not match');
        return;
    }

    const data = {
        first_name: values.first_name,
        last_name: values.last_name,
        personal_email: values.personal_email,
        work_email: userType !== 'student' ? values.work_email : null,
        country: countryCode,
        phone_number: `${countryCode} ${phoneNumber}`, // Format phone number
        institution: values.institution,
        password: values.password,
        username: values.personal_email.split('@')[0],
        user_type: userType, // Include the selected user type
    };

    console.log(data); // Debugging log

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/accounts/register/', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            message.success(response.data.message);
            // Redirect to login page or perform other actions here
            router.push('/login');  
        } else {
            message.error(response.data.message);
        }
    } catch (error) {
            message.error('An error occurred. Please try again.' + error);
        }
        
};


  return (
    <div className="min-h-screen flex bg-[#053d57] items-center justify-center">
      <div className="w-1/3 flex flex-col items-center justify-center p-8 text-white">
        <div className="mb-6">
          <img src="/path/to/your/logo.png" alt="InnovateEDU Logo" className="w-20 h-20" />
        </div>
        <div className="text-lg mb-2">Welcome</div>
        <div className="text-3xl font-bold mb-4">InnovateEDU Hub</div>
        <p className="text-md mb-8 text-center">
          Driving Collaborative Innovation for the Future of Research and Learning
        </p>
        <Button
          href="/login"
          className="bg-[#dadada] text-black px-16 py-4 rounded-full text-lg hover:bg-gray-300 transition duration-300"
        >
          Sign In
        </Button>
      </div>

      <div className="relative w-2/3 bg-[#dadada] p-6 m-8 rounded-r-lg" style={{ borderTopLeftRadius: '10rem', borderBottomLeftRadius: '10rem' }}>
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

        <Form layout="vertical" onFinish={onFinish}>
          <div className="grid grid-cols-2 gap-1">
            {/* Form fields */}
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
            <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please select your country!' }]} style={{ marginBottom: '10px' }}>
              <Select placeholder="Select your country" options={countries} onChange={handleCountryChange} value={countryCode}>
                {countries.map((country) => (
                  <Option key={country.value} value={country.value}>
                    <div className="flex items-center">
                      <img src={getFlagUrl(country)} alt={`${country.label} flag`} className="w-5 h-5 mr-2" />
                      <span>{country.label}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Phone Number" style={{ marginBottom: '10px' }}>
              <div className="flex items-center">
                <Select value={countryCode} onChange={handleCountryChange} style={{ width: '30%', marginRight: '10px' }} placeholder="Country">
                  {countries.map((country) => (
                    <Option key={country.value} value={country.value}>
                      <div className="flex items-center">
                        <img src={getFlagUrl(country)} alt={`${country.label} flag`} className="w-5 h-5 mr-2" />
                        <span>{country.label}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
                <Input placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ width: '70%' }} />
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

          <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-32 bg-[#053d57] hover:bg-blue-700 rounded-full transition duration-300 px-16 py-4 text-lg"
            style={{ float: 'right' }}
          >
            Register
          </Button>

          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register
