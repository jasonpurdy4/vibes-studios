"use client"

import type React from "react"

import { useState } from "react"
import { useStripe, useElements, PaymentElement, AddressElement } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface PaymentFormProps {
  clientSecret: string
  amount: number
  serviceName: string
  onSuccess: () => void
  onCancel: () => void
}

export default function PaymentForm({ clientSecret, amount, serviceName, onSuccess, onCancel }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setErrorMessage(undefined)

    // Process the payment with Stripe
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setIsProcessing(false)
    } else {
      // Payment succeeded - this code won't run as the page will redirect
      onSuccess()
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>
          You're paying ${amount.toLocaleString()} for {serviceName}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <PaymentElement />
            <AddressElement options={{ mode: "billing" }} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancel
          </Button>
          <Button type="submit" disabled={!stripe || isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
              </>
            ) : (
              `Pay $${amount.toLocaleString()}`
            )}
          </Button>
        </CardFooter>
        {errorMessage && <p className="text-destructive text-center mt-4">{errorMessage}</p>}
      </form>
    </Card>
  )
}
