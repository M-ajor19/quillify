"use client"

export default function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "",
      description: "Perfect for trying out Continuum",
      features: ["2-3 Free Credits", "Access to all core features"],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Starter Pack",
      price: "$19",
      period: "One-time payment",
      description: "Ideal for individuals and small teams",
      features: ["10 Credits", "All core features", "Standard support"],
      cta: "Buy Now",
      highlighted: true,
    },
    {
      name: "Pro Pack",
      price: "$49",
      period: "One-time payment",
      description: "For teams and growing businesses",
      features: ["30 Credits", "All core features", "Priority support"],
      cta: "Buy Now",
      highlighted: false,
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-4">Choose Your Plan</h2>
          <p className="text-secondary-foreground text-lg">Start free, scale as you grow</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-lg border transition-all duration-300 hover:scale-105 ${
                plan.highlighted
                  ? "bg-card/50 border-primary purple-glow"
                  : "bg-card/30 border-border hover:border-primary/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-medium">Recommended</span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-medium text-white mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-light text-white">{plan.price}</span>
                  {plan.period && <span className="text-secondary-foreground text-sm ml-2">({plan.period})</span>}
                </div>
                <p className="text-secondary-foreground text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <svg
                      className="w-4 h-4 text-primary mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-secondary-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-primary text-white hover:bg-primary/90 purple-glow-hover"
                    : "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-secondary-foreground text-sm">Secure payments powered by Stripe</p>
        </div>
      </div>
    </section>
  )
}
