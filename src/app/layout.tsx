import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quillify - Transform Feedback into Social Proof",
  description: "Turn customer reviews, testimonials, and feedback into polished, engaging social media content that builds trust and drives conversions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
