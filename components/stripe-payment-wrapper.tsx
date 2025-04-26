"use client"

import { useState, useEffect } from "react"
import { Elements } from "@stripe/react-stripe-js"
import { stripePromise } from "@/lib/stripe"
import PaymentForm from "@/components/payment-form"
import { Loader2 } from "lucide-react"

interface StripePaymentWrapperProps {
  clientSecret: string
  amount: number
  serviceName: string
  onSuccess: () => void
  onCancel: () => void
}

export default function StripePaymentWrapper({
  clientSecret,
  amount,
  serviceName,
  onSuccess,
  onCancel,
}: StripePaymentWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading the Stripe script
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading payment form...</span>
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
          variables: {
            colorPrimary: "#6d28d9",
            colorBackground: "#ffffff",
            colorText: "#1f2937",
          },
        },
      }}
    >
      <PaymentForm
        clientSecret={clientSecret}
        amount={amount}
        serviceName={serviceName}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </Elements>
  )
}
