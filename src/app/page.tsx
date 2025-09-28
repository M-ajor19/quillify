"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import PulsingCircle from "@/components/pulsing-circle"
import ShaderBackground from "@/components/shader-background"
import FeaturesSection from "@/components/features-section"
import PricingSection from "@/components/pricing-section"
import TestimonialsSection from "@/components/testimonials-section"

export default function Home() {
  return (
    <ShaderBackground>
      <Header />
      <HeroContent />
      <PulsingCircle />
      
      {/* Design Sections */}
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
    </ShaderBackground>
  )
}
