import { loadStripe } from "@stripe/stripe-js"

// This is the public-facing Stripe key
export const stripePromise = loadStripe(
  "pk_live_51RI0vZGWXWSOCXgw8bP7k06AqwZHVCiNupjxwR3F0sjgPEAjiqGKlr2fDxcJPV1ZDj6CaoCqnY9UiYajA0ZFymo200Qg8VW8fc",
)

// Service pricing tiers
export const PRICING = {
  prototyping: {
    starter: {
      name: "Basic Prototype",
      price: 1500,
      description: "Simple prototype with core functionality",
      features: ["Single-page application", "Basic AI integration", "1 week delivery", "1 round of revisions"],
    },
    standard: {
      name: "Standard Prototype",
      price: 3000,
      description: "Multi-page prototype with advanced features",
      features: [
        "Multi-page application",
        "Advanced AI integration",
        "2 week delivery",
        "2 rounds of revisions",
        "User authentication",
      ],
    },
    premium: {
      name: "Premium Prototype",
      price: 5000,
      description: "Comprehensive prototype with full functionality",
      features: [
        "Full-featured application",
        "Custom AI model integration",
        "3 week delivery",
        "Unlimited revisions",
        "User authentication",
        "Database integration",
      ],
    },
  },
  consulting: {
    hourly: {
      name: "Hourly Consultation",
      price: 200,
      description: "Pay-as-you-go strategic consulting",
      features: ["Expert AI guidance", "Flexible scheduling", "No minimum commitment", "Access to resources"],
    },
    package: {
      name: "Consulting Package",
      price: 2000,
      description: "10-hour consulting package with deliverables",
      features: [
        "10 hours of expert consultation",
        "Written recommendations",
        "Implementation roadmap",
        "Follow-up support",
      ],
    },
  },
  training: {
    workshop: {
      name: "Team Workshop",
      price: 3000,
      description: "Full-day workshop for up to 10 team members",
      features: ["Customized curriculum", "Hands-on exercises", "Take-home materials", "30 days of follow-up support"],
    },
    course: {
      name: "Comprehensive Course",
      price: 8000,
      description: "3-day intensive training for up to 10 team members",
      features: [
        "In-depth curriculum",
        "Project-based learning",
        "Certificate of completion",
        "60 days of follow-up support",
        "Access to exclusive resources",
      ],
    },
  },
}
