"use server"

import Stripe from "stripe"

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function createPaymentIntent(amount: number, customerEmail: string) {
  console.log("Creating payment intent:", { amount, customerEmail })

  try {
    // Validate amount
    if (!amount || amount <= 0) {
      throw new Error("Payment amount must be greater than 0")
    }

    // Create a real payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents, ensure it's an integer
      currency: "usd",
      receipt_email: customerEmail,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        purpose: "Project development",
      },
    })

    console.log("Payment intent created successfully:", paymentIntent.id)

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      amount: amount,
    }
  } catch (error: any) {
    console.error("Error creating payment intent:", error)
    return {
      success: false,
      error: error.message || "Failed to create payment intent. Please try again.",
    }
  }
}
