"use client"

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { ContinuumLogo } from './ContinuumLogo';
import { Github, Chrome, Linkedin, Mail, Loader } from 'lucide-react';

export function SignInScreen() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/',
      });
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending magic link:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-6">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <ContinuumLogo className="w-16 h-16" />
          </div>
          <h1 className="text-4xl font-semibold text-white mb-4">
            Welcome to Continuum
          </h1>
          <p className="text-lg text-white/70">
            Coherence, Engineered. Intelligent infrastructure for your brand's communication.
          </p>
        </div>

        {!showEmailForm ? (
          <>
            {/* OAuth Sign In Options */}
            <div className="space-y-3">
              <button
                onClick={() => signIn('google')}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 py-4 px-6 rounded-lg font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-3"
              >
                <Chrome className="w-5 h-5" />
                <span>Continue with Google</span>
              </button>

              <button
                onClick={() => signIn('azure-ad')}
                className="w-full bg-white/10 hover:bg-white hover:text-black text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-3 border border-white/20"
              >
                <svg className="w-5 h-5" viewBox="0 0 23 23" fill="currentColor">
                  <path d="M0 0h10.931v10.931H0zm12.069 0H23v10.931H12.069zm-12.069 12.069h10.931V23H0zm12.069 0H23V23H12.069z"/>
                </svg>
                <span>Continue with Microsoft</span>
              </button>

              <button
                onClick={() => signIn('linkedin')}
                className="w-full bg-white/10 hover:bg-white hover:text-black text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-3 border border-white/20"
              >
                <Linkedin className="w-5 h-5" />
                <span>Continue with LinkedIn</span>
              </button>

              <button
                onClick={() => signIn('github')}
                className="w-full bg-white/10 hover:bg-white hover:text-black text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-3 border border-white/20"
              >
                <Github className="w-5 h-5" />
                <span>Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#101014] text-white/70">or</span>
              </div>
            </div>

            {/* Email Option */}
            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full bg-white/10 hover:bg-white hover:text-black text-white py-4 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-3 border border-white/20"
            >
              <Mail className="w-5 h-5" />
              <span>Continue with Email</span>
            </button>
          </>
        ) : (
          <>
            {!emailSent ? (
              <>
                {/* Magic Link Form */}
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300"
                      placeholder="you@example.com"
                    />
                    <p className="text-xs text-white/70 mt-2">
                      We'll send you a magic link to sign in instantly - no password needed!
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white hover:bg-white/90 text-black py-4 px-6 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Sending Magic Link...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Send Link</span>
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="text-sm text-[#A1A1AA] hover:text-[#F5F5F7]"
                    >
                      ← Back to other options
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                {/* Email Sent Success */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#A855F7]/20 rounded-full flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8 text-[#A855F7]" />
                  </div>
                  <h2 className="text-2xl font-semibold text-[#F5F5F7]">Check your email!</h2>
                  <p className="text-[#A1A1AA]">
                    We've sent a magic link to <span className="text-[#F5F5F7] font-medium">{email}</span>
                  </p>
                  <p className="text-[#A1A1AA] text-sm">
                    Click the link in the email to sign in instantly. The link will expire in 24 hours.
                  </p>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setShowEmailForm(false);
                        setEmailSent(false);
                        setEmail('');
                      }}
                      className="text-sm text-[#A855F7] hover:text-[#9333EA]"
                    >
                      ← Back to sign in options
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

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
