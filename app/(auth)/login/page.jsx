"use client";
import { Button, Input, message, Spin } from 'antd';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '/public/icons/innovateedu-logo.png';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Helper function to set cookies
    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=Lax`;
    };

    // Function to handle sign-in
    const handleSignIn = async () => {
        if (!email || !password) {
            message.error('Please provide both email and password.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ personal_email: email, password }),
            });

            const responseData = await response.json();
            console.log('API Response:', responseData);

            if (response.ok) {
                if (responseData.access && responseData.refresh) {
                    // Store tokens in cookies
                    setCookie('access', responseData.access, 7);
                    setCookie('refresh', responseData.refresh, 7);
                    
                    message.success('Login successful!');
                    router.push('/dashboard');
                } else {
                    message.error('Login failed. Please check your credentials.');
                }
            } else {
                message.error(responseData.message || 'An unknown error occurred. Please try again.');
            }
        } catch (error) {
            message.error(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#053D57]">
            <div className="w-1/3 flex flex-col items-center justify-center p-8 text-white">
                <div className="mb-6">
                    <Image
                        src={Logo}
                        alt="Logo"
                        width={150}
                        height={150}
                        style={{ width: 'auto', height: 'auto' }}
                        priority
                    />
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

const LoginPage = () => <SignIn />;

export default LoginPage;
