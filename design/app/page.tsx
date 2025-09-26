"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import TestimonialsSection from "@/components/testimonials-section"
import FeaturesSection from "@/components/features-section"
import PricingSection from "@/components/pricing-section"

export default function ShaderShowcase() {
  return (
    <>
      {/* Hero Section with Shader Background */}
      <ShaderBackground>
        <Header />
        <HeroContent />
        <PulsingCircle />
      </ShaderBackground>

      <TestimonialsSection />
      <FeaturesSection />
      <PricingSection />
    </>
  )
}
