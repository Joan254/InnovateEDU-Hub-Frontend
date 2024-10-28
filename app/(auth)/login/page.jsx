"use client"
import AppLayout from '@/app/(root)/layout';
import { Button, Input } from 'antd';
import React from 'react';

const SignIn = () => {
    const handleSignIn = () => {
        // Add your sign-in logic here
        console.log("Sign In button clicked");
    };

    return (
        <div className="flex h-screen bg-[#053D57]">
            <div className="flex flex-col justify-center items-start w-1/2 p-10 text-white">
                <img src="/path/to/logo.png" alt="Logo" className="mb-4" />
                <h1 className="text-4xl font-semibold mb-2">Welcome</h1>
                <h2 className="text-2xl font-semibold mb-4">InnovateEDU Hub</h2>
                <p className="mb-4">Don’t have an account? <a href="/signup" className="text-[#dadada]">Sign up</a></p>
                <Button className="bg-[#053d57] text-white">Sign In</Button>
            </div>
            <div className="flex justify-center items-center w-1/2 bg-[#dadada] rounded-l-lg">
                <div className="p-10">
                    <h1 className="text-3xl font-bold mb-4">Sign In</h1>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">Personal Email</label>
                        <Input id="email" placeholder="Enter your email" />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="password">Password</label>
                        <Input.Password id="password" placeholder="Enter your password" />
                    </div>
                    <Button 
                        className="w-full bg-[#dadada] text-black" 
                        onClick={handleSignIn}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    );
};

const LoginPage = () => {
    return (
        <AppLayout>
            <SignIn />
        </AppLayout>
    );
};

export default LoginPage;