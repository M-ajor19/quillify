"use client"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Quillify transformed our content workflow completely. What used to take hours now takes minutes.",
      name: "Sarah Chen",
      title: "Marketing Manager",
    },
    {
      quote:
        "The AI understands context better than any tool I've used. It's like having a professional writer on demand.",
      name: "Marcus Rodriguez",
      title: "Content Director",
    },
    {
      quote: "Finally, a tool that gets it right the first time. Our team productivity has doubled.",
      name: "Emily Watson",
      title: "Creative Lead",
    },
    {
      quote: "The quality is consistently excellent. It's become essential to our daily operations.",
      name: "David Kim",
      title: "Brand Manager",
    },
    {
      quote: "Incredible how it adapts to our brand voice. Feels like it was trained specifically for us.",
      name: "Lisa Thompson",
      title: "Communications Head",
    },
  ]

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-3xl font-light text-center text-white mb-16">Trusted by Professionals</h2>
      </div>

      {/* Moving testimonials marquee */}
      <div className="relative">
        <div className="flex animate-marquee gap-6">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 p-6 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg purple-glow"
            >
              <p className="text-white text-sm mb-4 leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <p className="text-white font-medium text-sm">{testimonial.name}</p>
                <p className="text-secondary-foreground text-xs">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
