"use server"

import Stripe from "stripe"

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function createPaymentIntent(amount: number, customerEmail: string) {
  try {
    // Validate amount
    if (amount <= 0) {
      throw new Error("Payment amount must be greater than 0")
    }

    // Create a real payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe uses cents, ensure it's an integer
      currency: "usd",
      receipt_email: customerEmail,
      metadata: {
        purpose: "Project development",
      },
    })

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      amount: amount,
    }
  } catch (error) {
    console.error("Error creating payment intent:", error)
    return {
      success: false,
      error: "Failed to create payment intent. Please try again.",
    }
  }
}
