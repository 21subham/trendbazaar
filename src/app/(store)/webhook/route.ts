import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers(); //maybe error
  const sig = headersList.get("Stripe-Signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("a Stripe webhook is not set");
    return NextResponse.json(
      { error: "A stripe webhook is not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed", err);
    return NextResponse.json(
      { error: `Webhook error: ${err}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const order = await createOrderInSanity(session);
      console.log("Order created in Sanity: ", order);
    } catch (err) {
      console.error("Error creating order in Sanity", err);
      return NextResponse.json(
        { error: "Error creating order" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
