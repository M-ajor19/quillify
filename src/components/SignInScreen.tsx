"use client"

import React from 'react';
import { signIn } from 'next-auth/react';
import { QuillifyLogo } from './QuillifyLogo';
import { Github, Chrome, Linkedin } from 'lucide-react';

export function SignInScreen() {
  return (
    <div className="min-h-screen bg-[#101014] text-[#F5F5F7] font-['Inter',sans-serif] flex items-center justify-center">
      <div className="max-w-md w-full mx-6">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <QuillifyLogo className="w-16 h-16" />
          </div>
          <h1 className="text-4xl font-semibold text-[#F5F5F7] mb-4">
            Welcome to Quillify
          </h1>
          <p className="text-lg text-[#A1A1AA]">
            Transform your raw content into polished, professional pieces with the power of digital alchemy.
          </p>
        </div>

        {/* Sign In Options */}
        <div className="space-y-4">
          <button
            onClick={() => signIn('google')}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 py-4 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-3"
          >
            <Chrome className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={() => signIn('linkedin')}
            className="w-full bg-[#0077B5] hover:bg-[#005885] text-white py-4 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-3"
          >
            <Linkedin className="w-5 h-5" />
            <span>Continue with LinkedIn</span>
          </button>

          <button
            onClick={() => signIn('github')}
            className="w-full bg-[#18181B] hover:bg-[#27272A] text-[#F5F5F7] py-4 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-3 border border-[#27272A]"
          >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        {/* Features */}
        <div className="mt-12 space-y-4">
          <div className="flex items-center space-x-3 text-[#A1A1AA]">
            <div className="w-2 h-2 bg-[#A855F7] rounded-full"></div>
            <span className="text-sm">3 free credits to get started</span>
          </div>
          <div className="flex items-center space-x-3 text-[#A1A1AA]">
            <div className="w-2 h-2 bg-[#A855F7] rounded-full"></div>
            <span className="text-sm">No credit card required</span>
          </div>
          <div className="flex items-center space-x-3 text-[#A1A1AA]">
            <div className="w-2 h-2 bg-[#A855F7] rounded-full"></div>
            <span className="text-sm">Cancel anytime</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-[#A1A1AA]">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
