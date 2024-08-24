import Stripe from 'stripe'
import { FRONTEND_URL, STRIPE_SECRET_KEY } from '$env/static/private'
import { redirect } from '@sveltejs/kit'
import { goto } from '$app/navigation'

// initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY)

// handle POST /create-payment-intent
export async function POST(event) {
  const data = await event.request.json()
  
  const items: any[] = data.items

  let lineItems: any[] = []
  items.forEach(async item => {
    lineItems.push({price: item.price, quantity: item.quantity})
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'paypal', 'sofort', 'sepa_debit', 'eps'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${FRONTEND_URL}/shop/success`,
    cancel_url: `${FRONTEND_URL}/shop/cancel`,
  })
  
  return new Response(JSON.stringify({ url: session.url }))
}