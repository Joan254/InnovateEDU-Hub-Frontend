"use client";
import { Button, Input, message, Spin } from 'antd';
import React, { useState } from 'react';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);  // Loading state for UX

    // Function to handle sign-in
    const handleSignIn = async () => {
        // Basic client-side validation
        if (!email || !password) {
            message.error('Please provide both email and password.');
            return;
        }

        setLoading(true);  // Activate loading spinner

        try {
            const response = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    personal_email: email,
                    password: password,
                }),
            });

            // Handle response based on status code
            const responseData = await response.json();
            if (response.ok) {
                message.success(responseData.message);
                // Redirect user to dashboard upon successful login
                window.location.href = '/dashboard';
            } else {
                // Error message from server or fallback
                message.error(responseData.message);
            }
        } catch (error) {
            // Network or other unforeseen errors
            message.error('An error occurred. Please try again later:' + error);
        } finally {
            setLoading(false);  // Deactivate loading spinner
        }
    };

    return (
        <div className="flex h-screen bg-[#053D57]">
            <div className="w-1/3 flex flex-col items-center justify-center p-8 text-white">
                <div className="mb-6">
                    <img src="/path/to/your/logo.png" alt="InnovateEDU Logo" className="w-20 h-20" />
                </div>
                <h1 className="text-4xl font-semibold mb-2">Welcome</h1>
                <h2 className="text-2xl font-semibold mb-4">InnovateEDU Hub</h2>
                <p className="mb-4">
                    Don’t have an account? <a href="/register" className="text-[#dadada]"><u>Sign up</u></a>
                </p>
                <Button
                    href="/register"
                    className="bg-[#dadada] text-black px-16 py-4 rounded-full text-lg hover:bg-gray-300 transition duration-300"
                >
                    Sign Up
                </Button>
            </div>
            <div 
                className="relative w-2/3 bg-[#dadada] p-8 m-8 rounded-r-lg shadow-lg" 
                style={{ borderTopLeftRadius: '10rem', borderBottomLeftRadius: '10rem' }}
            >
                <div className="p-8 max-w-md mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-6">Sign In</h1>
                    
                    <div className="mb-5">
                    <label className="block text-lg font-medium mb-2" htmlFor="email">
                        Personal Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    </div>

                    <div className="mb-5">
                    <label className="block text-lg font-medium mb-2" htmlFor="password">
                        Password
                    </label>
                    <Input.Password
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                    </div>

                    <Button 
                    className="w-full bg-[#053d57] hover:bg-blue-700 rounded-full text-white transition duration-300 py-3 text-lg"
                    onClick={handleSignIn} 
                    disabled={loading}
                    >
                    {loading ? <Spin /> : 'Sign In'}
                    </Button>
                </div>
            </div>

        </div>
    );
};

const LoginPage = () => {
    return (
            <SignIn />
    );
};

export default LoginPage;
