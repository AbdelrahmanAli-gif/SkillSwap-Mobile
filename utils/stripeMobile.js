import * as Linking from "expo-linking";

export async function payForTradeMobile({ backendUrl, price = "10.00", tradeId = "", userId = "" }) {
  try {
    // this deep link must match your app.scheme + path
    const successUrl = "skillswap://payment-success"; 

    const res = await fetch(`${backendUrl}/api/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        metadata: { tradeId, userId },
        successUrl, // server will use this
      }),
    });

    const data = await res.json();
    if (!data?.url) throw new Error("No checkout url returned");

    // open Stripe Checkout in the system browser
    await Linking.openURL(data.url);
  } catch (err) {
    console.error("payForTradeMobile error:", err);
    throw err;
  }
}

export async function subscribeToProMobile({ backendUrl, userId, email = null, customerId = null }) {
  try {
    const successUrl = "skillswap://payment-success";
    const res = await fetch(`${backendUrl}/api/create-pro-checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, email, customerId, successUrl }),
    });
    const data = await res.json();
    if (!data?.url) throw new Error("No checkout url returned");
    await Linking.openURL(data.url);
  } catch (err) {
    console.error("subscribeToProMobile error:", err);
    throw err;
  }
}
